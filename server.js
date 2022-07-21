import { dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import bodyParse from 'body-parser';
import cors from 'cors'; 

//import passport from './auth/login.js'
//import { router as adminRoute } from './auth/auth.js';

import { router as tulkurRoute } from './api/tulkur.js';
import { router as projectRoute } from './api/project.js';

dotenv.config();

const sessionSecret = 'leyndarmál';

const {
  PORT: port,
  //SESSION_SECRET: sessionSecret,
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

/*app.use(session({
    sercet: sessionSecret,
    resave: false,
    saveUninitialized: false,
    maxAge: 20 * 1000, // 20 sek   
}));*/

//app.use(passport.initialize());
//app.use(passport.session());

const path = dirname(fileURLToPath(import.meta.url));

/**
 * Hjálparfall til að athuga hvort reitur sé gildur eða ekki.
 *
 * @param {string} field Middleware sem grípa á villur fyrir
 * @param {array} errors Fylki af villum frá express-validator pakkanum
 * @returns {boolean} `true` ef `field` er í `errors`, `false` annars
 */
function isInvalid(field, errors = []) {
  // Boolean skilar `true` ef gildi er truthy (eitthvað fannst)
  // eða `false` ef gildi er falsy (ekkert fannst: null)
  return Boolean(errors.find((i) => i && i.param === field));
}

app.locals.isInvalid = isInvalid;

app.locals.formatDate = (str) => {
  let date = '';

  try {
    date = format(str || '', 'dd.MM.yyyy');
  } catch {
    return '';
  }

  return date;
};

/*
/   Main server.
*/
app.get('/' , (req, res) => {
  res.send('Hello server-mavar');
});

/*
/   Route - server.
*/
//app.use('/', adminRoute ); 
app.use('/tulkur', tulkurRoute );
app.use('/project', projectRoute); 

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
