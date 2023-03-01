import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import bodyParse from 'body-parser';
import cors from 'cors'; 
import passport from './auth/login.js';

//import { router as adminRoute } from './auth/admin.js';
import { router as adminRoute } from './auth/admin_mini.js';
import { router as interpreterRoute } from './api/interpreterAPI.js';

//import { findById } from './auth/users.js';

dotenv.config();

const {
  PORT: port = 8080,
  JWT_SECRET : jwtSecret,
  SESSION_SECRET: sessionSecret,
  DATABASE_URL: connectionString,
} = process.env;

if (!jwtSecret || !connectionString) {
  console.error('Vantar .env gildi');
  process.exit(1);
}

/*if ( !connectionString || !sessionSecret)  {
  console.error('Vantar ConnectionString , SessionSecret eða jwtSecret í env - app');
  process.exit(1);
}*/

const app = express();

const whitelist = ['http://localhost:8080'];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}

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

/*
app.use((req, res, next) => {
  if (req.isAuthenticated()) {
    // getum núna notað user í viewum
    res.locals.user = req.user;
  }
  next();
});*/

//-------------------//
//   Main server     //
//-------------------//
app.get('/' , (req, res) => {
  res.send('Hello server-mavar');
});

/*
/   Routes - server.
*/
app.use('/admin', adminRoute ); 
app.use('/tulkur', interpreterRoute );  //chnage tulkur to interpreter

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
