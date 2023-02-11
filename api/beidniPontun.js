import express from 'express';
import { listApp, insertApp, updateApp } from '../lib/db.js';
import { catchErrors } from '../lib/utils.js';

export const router = express.Router();

/*
/   All beidni - Listi by order DESC - Pöntunarsíða
*/
async function projectBeidni(req, res) {

  const tblVerkefni = `
    SELECT 
      *
    FROM 
      tblBeidni
    ORDER BY 
      id 
    DESC;
  `;

  const events = await listApp(tblVerkefni);
  
  return res.json(events); 
}

/*
/   Add new beidni - Pöntunarsíða  
*/
async function newBeidni(req, res){
  const newOrder = req.body;
  let success = true; 

  const sql_beidni = `
    INSERT INTO 
      tblBeidni(
          znamec,
          place, 
          zdesc,
          zday, 
          start_time, 
          last_time,
          zstatus,
          zchecked,
          explanation,
          interpreter
          )

    VALUES($1, 
           $2, 
           $3, 
           $4, 
           $5,
           $6, 
           $7,
           $8,
           $9,
           $10
           );
  `;
  
  try {
      success = await insertApp(sql_beidni, newOrder);
  }
  catch(e) {
    console.error(e);
  }

  if(success){
    return res.redirect('/');
  }
}

/*
/   Breyta beiðni - Pöntunarsíða
*/
async function updateBeidniFall(req, res){
  const data = req.body; 
  let success = true; 

  const sql = `
    UPDATE 
      tblBeidni 
    SET 
      place = $2, 
      zdesc = $3,
      zday = $4, 
      start_time = $5, 
      last_time = $6
    WHERE 
      tblBeidni.id = $1;
  `;

  try{
    success = await updateApp(sql, data)
  }
  catch(e){
    console.error(e); 
  }

  if(success){
    return res.redirect('/');
  }
}

/*
/   Afbókun beiðni - Pöntunarsíða
*/
async function afbokaBeidniFall(req, res) {
  const id = req.body;
  let success = true; 

  const sql = `
    UPDATE 
      tblBeidni 
    SET 
      explanation = 'Afbókun',
      interpreter = 'Afbókun',
      zstatus = 3
    WHERE 
      tblBeidni.id = $1;
  `;
  
  try{
    success = await updateApp(sql, id)
  }
  catch(e){
    console.error(e); 
  }

  if(success){
    return res.redirect('/');
  }
}

/* GET */
router.get('/byBeidni', catchErrors(projectBeidni));

/* POST */
router.post('/sendaBeidni', catchErrors(newBeidni));     
router.post('/afbokaBeidni', catchErrors(afbokaBeidniFall));
router.post('/updateBeidni', catchErrors(updateBeidniFall));