import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import express from 'express';
import dotenv from 'dotenv';
import bodyParse from 'body-parser';
import cors from 'cors'; 

import { router as tulkurRoute } from './api/tulkur.js';
import { router as projectRoute } from './api/project.js';

dotenv.config();

export function catchErrors(fn) {
  return (req, res, next) => fn(req, res, next).catch(next);
}

const {
  PORT: port,
  DATABASE_URL: connectionString,
} = process.env;

if (!connectionString )  {
  console.error('Vantar ConnectionString í env - app');
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
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
/   use for dump data.
*/
app.get('/' , (req, res) => {
  res.send('Hello server-mavar');
});

app.post('/hello', (req, res) => {
  const myname = 'Arni';
  const title = [ req.body.firstname, req.body.phonenr, req.body.email ]; 
  const body = req.body; 
  console.log(myname);
  console.log(title); 
  console.log(body); 
  res.send("res-posts say hello to you ");
})

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
