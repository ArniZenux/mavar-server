import express from 'express';
import passport, { requireAuthentication } from './login.js';
import { findByEmail, createUser, createCustom } from './users.js';
import jwt from 'jsonwebtoken';

export const router = express.Router();

function getToken(user){
  //const payload = { id: user.id};
  //const tokenOptions = { expireIn: tokenLifetime };
  //return jwt.sign(payload, process.env.JWT_SECRET, tokenOptions);
  //return jwt.sign(user, process.env.SESSION_SECRET);
  return jwt.sign(user, process.env.JWT_SECRET);
}

/*
function getRefreshToken(){
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}
*/

/*
/   Login - indexAdmin - GET
*/
async function indexAdmin(req, res) {
  //console.log(req); req.user
  //console.log("indexAdmin - send til þín");
  if(req.isAuthenticated()){
    return res.send({ data: req.user });
  }
  return res.send({ data: 'top sercet' });
}

/*  
/   Sign out - GET
*/
async function utskra(req, res) {
  req.logout();
  res.clearCookie('token');
  req.redirect('/');
}

/*async function validateUser(name){
  console.log(name);
  const user = await findByUsername(name);
  console.log(user);
  if(user){
    return true; 
  } else {
    return false; 
  }
}*/

async function validateEmail(email){
  const user = await findByEmail(email);
  //console.log(user); 

  if(user){
    return true; 
  } else {
    return false; 
  }
}

async function register(req, res, next){
  const {name, email, phonenr, password} = req.body; 
  const validateMessage = await validateEmail(email); 
  
  //console.log('Create new user in database');
  //console.log(validateMessage); 

  if(validateMessage){
    console.log('Þú hefur skráð þig.');
  } else {
    await createUser(name,email, password);
    await createCustom(name, email, phonenr);
  }

  return next(); 
}

/* GET */
router.get('/', requireAuthentication, indexAdmin);
router.get('/logout', requireAuthentication, utskra);

/* POST */
router.post('/login', 
  passport.authenticate('local', {
    failureMessage: 'Notandanafn eða lykilorð vitlaust.',
    failureRedirect: '/admin/login',
  }),

  (req, res) => {
    //console.log(req.isAuthenticated());
    //console.log(req.user); 
    const token = getToken(req.user); 
    res.send({ token });
  },
);

//router.post('/register', register);

router.post('/register', 
  register,
  passport.authenticate('local', {
    failureMessage: 'Notandanafn eða lykilorð vitlaust.',
    failureRedirect: '/admin/login',
  }),
  
  (req, res) => {
    const token = getToken(req.user);
    res.send({ token });
    if(res.headersSent !== true){
      //console.log('Hello header');
    }
    else {
      //console.log('virkar');
    }
  }
);