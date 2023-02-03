import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import bodyParse from 'body-parser';
import cors from 'cors'; 
import passport from './auth/login.js';
//import jsonwebtoken from 'jsonwebtoken'; 
//const jwt = require('jsonwebtoken');
//import { router as adminRoute } from './auth/auth.js';
import { router as tulkurRoute } from './api/tulkur.js';
import { router as projectRoute } from './api/project.js';
//import { router as beidniRoute } from './api/beidni.js';
import { router as beidniPontunRoute } from './api/beidniPontun.js';

//import { findById } from './auth/users.js';

dotenv.config();

const {
  PORT: port,
  SESSION_SECRET: sessionSecret,
  DATABASE_URL: connectionString,
} = process.env;

if ( !connectionString || !sessionSecret )  {
  console.error('Vantar ConnectionString eða SessionSecret í env - app');
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));

app.use(express.urlencoded({ extended: true }));

app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
    maxAge: 20 * 1000, // 20 sek
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    // getum núna notað user í viewum
    res.locals.user = req.user;
  }

  next();
});

function generateAccessToken(username){
  return jwt.sign(username, process.env.SESSION_SECRET, { expiresIn: '1800s' });
}

//-------------------//
//   Main server     //
//-------------------//
app.get('/' , (req, res) => {
  res.send('Hello server-mavar');
});

app.post('/loginHello', (req,res) => {
  res.send('hello login');
});

app.post(
  '/login',
  
  // Þetta notar strat að ofan til að skrá notanda inn
  passport.authenticate('local', {
    failureMessage: 'Email eða lykilorð vitlaust.',
    failureRedirect: '/login',
  }),
  
  // Ef við komumst hingað var notandi skráður inn, senda á /admin
  (req, res) => {
    const token = "asdfasdf"; //generateAccessToken(user); //getToken(); 
    //const user = findById(username);
    res.send({ success : true, token });
    //res.redirect('/admin');
    //console.log('hello admin');
    //res.send('asdfdsaf');
  },
);

app.get('/logout', (req, res) => {
  // logout hendir session cookie og session
  req.logout();
  res.redirect('/');
});

/*
/   Route - server.
*/
//app.use('/admin', adminRoute ); 
app.use('/tulkur', tulkurRoute );
app.use('/project', projectRoute); 
app.use('/beidni', beidniPontunRoute); 

function notFoundHandler(req, res, next) {
  const title = 'Sida fannst ekki';
  res.status(404).json({ error: title });
}

function errorHandler(err, req, res, next) {
  console.error(err);
  const title = 'Villa kom upp';
  res.status(500).json( { error : title });
}

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});
