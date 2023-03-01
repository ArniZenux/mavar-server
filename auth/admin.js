import express from 'express';
import passport, { ensureLoggedIn } from './login.js';
import { listApp } from '../lib/db.js';
import jwt from 'jsonwebtoken';

//import { getToken, verifyUser } from './authenticate.js';
//import { catchErrors } from '../lib/utils.js';

export const router = express.Router();

//_____________________________________________________________________________
function getToken(user){
  //const payload = { id: user.id};
  //const tokenOptions = { expireIn: tokenLifetime };
  //return jwt.sign(payload, process.env.JWT_SECRET, tokenOptions);
  //return jwt.sign(user, process.env.SESSION_SECRET);
  return jwt.sign(user, process.env.jwtSecret);
}

/*
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: zjwt,
};*/

function requireAuthentication(req, res, next) {
  //return passport.authenticate('jwt', { session: false })(req, res, next);
  
  return passport.authenticate(
    'jwt',
    { session: false },
    (err, user, info) => {
      if (err) {
        return next(err);
      }
      
      if (!user) {
        const error = info.name === 'TokenExpiredError'
          ? 'expired token' : 'invalid token';

        return res.status(401).json({ error });
      }
      
      // Látum notanda vera aðgengilegan í rest af middlewares
      req.user = user;
      return next();
    },
  )(req, res, next);
}
//_____________________________________________________________________________

/*
/   Login - indexAdmin - GET
*/
async function indexAdmin(req, res) {
  
  console.log(req); 

  if(req.isAuthenticated()){
    res.send( { data: req.user });
  }
  return res.send({ data: 'top sercet' });
}

/*
/   Info about Admin - GET 
*/
async function infoAdmin(req, res) {
  console.log(req.user); 
  res.json({ data: 'top secret' });
  /*console.log('Herna er console - Nav- call you');
  if(req.isAuthenticated()){
    console.log(req.user);
  } else { 
    console.log('Ekki user - bara drasl');
    console.log(req); 
  }
  res.send({ hello: 'Arni'});*/
}

/*
/   Login - GET 
*/
async function login(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/admin/login');
  }

  let message = '';

  if (req.session.messages && req.session.messages.length > 0) {
    message = req.session.messages.join(', ');
    req.session.messages = [];
  }

  return res.send(`
    <p>Login - innskraning</p>
    <p>${message}</p>
  `);
}

async function utskra(req, res) {
  req.logout();
  req.redirect('/');
}

/*
/   List of one interpreter  ????????
*/
async function oneAdmin(req, res) {
  const { id } = req.params;
  
  console.log('hello oneAdmin'); 

  const sql = `
    SELECT 
      *
    FROM 
      tblUsers
    WHERE 
      tblUsers.id = $1; 
  `;
  
  const events = await listApp(sql, [id]);
  
  return res.json(events); 
}

/* GET */
router.get('/', requireAuthentication, indexAdmin);
router.get('/login', login); 
router.get('/me', infoAdmin);
router.get('/:id', oneAdmin);
router.get('/logout', utskra) ;

/* POST */
router.post('/login', 
  // Þetta notar strat að ofan til að skrá notanda inn
  passport.authenticate('local', {
    failureMessage: 'Notandanafn eða lykilorð vitlaust.',
    failureRedirect: '/admin/login',
  }),

  // Ef við komumst hingað var notandi skráður inn, senda á /admin
  (req, res) => {

    console.log(req.isAuthenticated());
    console.log(req.user); 
    const token = getToken(req.user); //"#$asdfasdf"; //getToken(); 
    //const token = req.user.id; 
    res.send({ token });
    //res.redirect('/admin');
    //console.log('hello admin');
  },
);


