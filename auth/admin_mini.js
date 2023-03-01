import express from 'express';
import passport, { requireAuthentication } from './login.js';
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
/   Login - indexAdmin - GET
*/
async function indexAdmin(req, res) {
  //console.log(req); req.user
  console.log("indexAdmin - send til þín");
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
  req.redirect('/');
}

/* GET */
router.get('/', requireAuthentication, indexAdmin);
router.get('/logout', utskra) ;

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