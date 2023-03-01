import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { comparePasswords, findByEmail, findById } from './users.js';

export function requireAuthentication(req, res, next) {
  return passport.authenticate('jwt', { session: false })(req, res, next);
  /*return passport.authenticate(
    'jwt',
    { session: false },
    (err, user, info) => {
      if (err) {
        console.log('errrroor');
        return next(err);
      }
      
      if (!user) {
        console.log('not notnaotnat');
        const error = info.name === 'TokenExpiredError'
          ? 'expired token' : 'invalid token';

        return res.status(401).json({ error });
      }
      
      // Látum notanda vera aðgengilegan í rest af middlewares
      req.user = user;
      return next();
    },
  )(req, res, next);*/
}

async function stratID(data, next) {
  const user = await findById(data.id);
  
  console.log("stratID - findById"); 
  console.log(user); 
 
  if (user) {
    //console.log('fundið');
    //return next(); 
    //return done(null, user); 
    next(null, user);
  } 
  else {
    //console.log('Ekki fundið');
    //return done(null, false); 
    next(null, false);
  }
}

async function strat(email, password, done) {
  try {
    const user = await findByEmail(email); 
    
    console.log("strat - findByEmail");

    if (!user) {
      console.log('Ekki til');
      return done(null, false);
    }
    else{
      console.log('yes found');
    }

    const result = await comparePasswords(password, user);
    return done(null, result ? user : false);
  } catch (err) {
    console.error(err);
    return done(err);
  }
}

passport.use(new LocalStrategy (strat));
passport.use(new LocalStrategy ({ usernameField: 'email' }, strat));

passport.serializeUser((user, done) => {
  console.log("serializeUser - skilgreining");
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserializeUser - skilgreining");
  try {
    const user = await findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(new JwtStrategy(jwtOpts, stratID));

export default passport;