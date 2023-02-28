import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

import { comparePasswords, findByEmail, findById } from './users.js';

//const zjwt = process.env.jwtSecret;

/**
 * Athugar hvort username og password sé til í notandakerfi.
 * Callback tekur við villu sem fyrsta argument, annað argument er
 * - `false` ef notandi ekki til eða lykilorð vitlaust
 * - Notandahlutur ef rétt
 *
 * @param {string} username Notandanafn til að athuga
 * @param {string} password Lykilorð til að athuga
 * @param {function} done Fall sem kallað er í með niðurstöðu
 */
async function strat(email, password, done) {
  try {
    //const user = await findByUsername(email);  // Username
    const user = await findByEmail(email);       // Email
    
    console.log("strat - findByEmail");

    if (!user) {
      console.log('Ekki til');
      return done(null, false);
    }
    else{
      console.log('yes found');
    }

    // Verður annað hvort notanda hlutur ef lykilorð rétt, eða false
    const result = await comparePasswords(password, user);
    return done(null, result ? user : false);
  } catch (err) {
    console.error(err);
    return done(err);
  }
}



// Notum local strategy með „strattinu“ okkar til að leita að notanda
passport.use(new LocalStrategy (strat));
passport.use(new LocalStrategy ({ usernameField: 'email' }, strat));
// getum stillt með því að senda options hlut með
// Geymum id á notanda í session, það er nóg til að vita hvaða notandi þetta er
passport.serializeUser((user, done) => {
  //console.log('user  - serializeUser :>> ', user); 
  done(null, user.id);
});

// Sækir notanda út frá id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await findById(id);
    //console.log('user :>> ', user); 
    done(null, user);
  } catch (err) {
    done(err);
  }
});


async function stratID(data, next) {
  // fáum id gegnum data sem geymt er í token
  const user = await findById(data.id);

  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
}

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(jwtOpts, stratID));

// Hjálpar middleware sem athugar hvort notandi sé innskráður og hleypir okkur
// þá áfram, annars sendir á /login
export function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/admin/login');
}

export function isAdmin(req, res, next){
  if (req.isAuthenticated()){
    const u = req.user;
    console.log('user.admin --> ' + u.admin);
    if(u.admin) {
      return next(); 
    }
  }
  return res.send('Ekki admin\nSkradu thig inn a /admin/login\n');
}

export default passport;