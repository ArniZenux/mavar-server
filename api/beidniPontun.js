import express from 'express';
import { requireAuthentication } from '../auth/login.js';
import { listApp, insertApp, updateApp } from '../lib/db.js';
import { catchErrors } from '../lib/utils.js';

export const router = express.Router();

/*
/   All beidni - Listi by order DESC - Pöntunarsíða
*/
async function projectBeidniOne(req, res) {

  const zid = req.user.id; 

  const sql_verkefni = `
    SELECT 
      *
    FROM 
      tblBeidni,
      tblAsk,
      tblCustom
    WHERE
      tblBeidni.zidbeidni = tblAsk.idbeidni
    AND
      tblAsk.idcustom = tblCustom.zidcustom
    AND
      tblCustom.zidcustom = $1
    ORDER BY 
      zidbeidni 
    DESC;
  `;

  const events = await listApp(sql_verkefni,[zid]);

  return res.json(events); 
}

/*
/   Add new ask side by tblAsk  
*/
async function postAsk(zid){
  
  const sql_ask = `
    INSERT INTO
      tblAsk(idcustom)
    VALUES($1);
  `;

  let success_work = true; 

  try {
    success_work = await insertApp(sql_ask, [zid]);
  }
  catch(e){
      console.error(e);
  }

  if(success_work){
    return success_work;
  }
}

/*
/   Check interpreter avilable 
*/
async function checkBeidni(req, res){
  const checkDate = req.body; 
  //console.log(checkDate);
  //console.log('Hello hello');
  
  let zcheckDate = checkDate.pop();
  //let newcheckDate = zcheckDate.replaceAll('/','.');
  console.log(zcheckDate);
  
  const sql_verkefni = `
  SELECT  
    zname, start_time, last_time
  FROM 
    tblInterpreter,
    tblWorks,
    tblProject
  WHERE
    tblInterpreter.id = tblWorks.id
  AND
    tblWorks.id = tblProject.id 
  AND 
    tblProject.zday = $1;
  `;

  /*const sql_day = `
  SELECT 
    *
  FROM 
    tblProject; 
  `;
  */
  const events = await listApp(sql_verkefni, [zcheckDate]);
  //console.log(events); 

  return res.json(events); 
  
}

/*
/   Add new beidni - Pöntunarsíða  
*/
async function newBeidni(req, res){
  const newOrder = req.body;
  let success_beidni = true; 
  let success_ask = true; 
    
  const zid = req.user.id; 
  
  //console.log(zid); 

  const sql_beidni = `
    INSERT INTO 
      tblBeidni(
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
           $9
           );
  `;

  try {
      success_beidni = await insertApp(sql_beidni, newOrder);
  }
  catch(e) {
    console.error(e);
  }

  if(success_beidni){
    success_ask = postAsk(zid);
  }

  if(success_ask){
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
      tblBeidni.zidbeidni = $1;
  `;

  try{
    success = await updateApp(sql, data)
    console.log(success);
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
      tblBeidni.zidbeidni = $1;
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
router.get('/byBeidniOne/', requireAuthentication, catchErrors(projectBeidniOne));

/* POST */
router.post('/checkBeidni', requireAuthentication, catchErrors(checkBeidni));
router.post('/sendaBeidni', requireAuthentication, catchErrors(newBeidni));     
router.post('/afbokaBeidni', requireAuthentication, catchErrors(afbokaBeidniFall));
router.post('/updateBeidni', requireAuthentication, catchErrors(updateBeidniFall));