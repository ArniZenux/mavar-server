import express from 'express';
import passport, { ensureLoggedIn } from './login.js';
import { catchErrors } from '../lib/utils.js';

export const router = express.Router();

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

  return res.send(`Login <p>${message}</p>`);
}

router.get('/', indexAdmin);
router.get('/login', login); 
router.get('/info', ensureLoggedIn, infoAdmin);

router.post('/login', 
  passport.authenticate('local', {
    failureMessage: 'Notandi eða password vitlaust.',
    failureRedirect: '/admin/login',
  }),
    
  (req, res) => {
    res.redirect('/admin');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  req.redirect('/');
});
