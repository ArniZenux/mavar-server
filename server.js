import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import bodyParse from 'body-parser';
import cors from 'cors'; 
import passport from './auth/login.js';

import { router as adminRoute } from './auth/admin_mini.js';
import { router as interpreterRoute } from './api/interpreterAPI.js';
import { router as projectRoute } from './api/projectAPI.js';
import { router as customRoute } from './api/customAPI.js';
import { router as beidniBokunRoute } from './api/beidniBokun.js';
import { router as beidniPontunRoute } from './api/beidniPontun.js';
import { router as calenderRoute } from './api/calanderAPI.js';

dotenv.config();

const {
  PORT: port,
  JWT_SECRET : jwtSecret,
  SESSION_SECRET: sessionSecret,
  DATABASE_URL: connectionString,
} = process.env;

if (!jwtSecret || !connectionString || !sessionSecret )  {
  console.error('Vantar .env');
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

//-------------------//
//   Main server     //
//-------------------//
app.get('/' , (req, res) => {
  res.send('Hello server-mavar');
});

/*
/   Routes - server.
*/

// - Innskráningukerfi - //
app.use('/admin', adminRoute ); 

// - Pöntunarkerfi - //
app.use('/custom', customRoute); 
app.use('/beidni', beidniPontunRoute);   // change beidni to request

// - Bókunarkerfi - //
app.use('/tulkur', interpreterRoute );  //change tulkur to interpreter
app.use('/project', projectRoute); 
app.use('/beidnibokun', beidniBokunRoute);   // change beidni to request
app.use('/calander', calenderRoute);   // change beidni to request

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
