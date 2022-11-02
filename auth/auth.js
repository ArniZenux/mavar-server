import express from 'express';
import jwt from 'jsonwebtoken';
//import passport, { ensureLoggedIn } from './login.js';
import { catchErrors } from '../lib/utils.js';

export const router = express.Router();


//*****************************/
//   route                    //
//*****************************/
export function ensureLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/admin/login');
}

/*
/   Login - indexAdmin  
*/
async function indexAdmin(req, res) {
  if(req.isAuthenticated()){
    res.send(
     `<p> Hello ${req.user ? 'admin.' : 'ekki admin.'} í mavar-server </p>      
    `);
  }

  return res.send(
    `<p> Innskraning admin-bord - admin/login</p>
  `);
}

/*
/   Info about Admin  
*/
async function infoAdmin(req, res) {
  res.send(`
    Herna upplysing um thig !!  
  `);
}

/*
/   Login  
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

router.get('/', indexAdmin);
router.get('/login', login); 
router.get('/info', ensureLoggedIn, infoAdmin);

router.post('/login', 
  // Þetta notar strat að ofan til að skrá notanda inn
  passport.authenticate('local', {
    failureMessage: 'Notandanafn eða lykilorð vitlaust.',
    failureRedirect: '/login',
  }),

  // Ef við komumst hingað var notandi skráður inn, senda á /admin
  (req, res) => {
    const token = "#$asdfasdf"; //getToken(); 
    res.send({ success : true, token });
    //res.redirect('/admin');
    //console.log('hello admin');
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  req.redirect('/');
});
