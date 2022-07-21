import express from 'express';

import passport, { ensureLoggedIn } from './login.js';
import { catchErrors } from '../lib/utils.js';

export const router = express.Router();

/*
/   Login - index  
*/
async function indez(req, res) {
  res.send('Hello admin server - Mavar');
}

function login(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/admin');
  }

  let message = '';

  if (req.session.messages && req.session.messages.length > 0) {
    message = req.session.messages.join(', ');
    req.session.messages = [];
  }

  return res.render('login', { message, title: 'Innskráning' });
}

router.get('/', catchErrors(indez));
router.get('/login', login); 

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
