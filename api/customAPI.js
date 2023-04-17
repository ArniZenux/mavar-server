import express from 'express';
import { requireAuthentication } from '../auth/login.js';
import { listApp, insertApp, updateApp } from '../lib/db.js';
import { catchErrors } from '../lib/utils.js';

export const router = express.Router();

/*
/   All customs  
*/
async function getCustom(req, res) {

  const sql = `
    SELECT 
      *
    FROM 
      tblCustom;
    `;
  
  const events = await listApp(sql);
  
  return res.json(events); 
}

/*
/   Get name's custom and id  
*/
async function getNameCustom(req, res) {

  const sql = `
    SELECT 
      zidcustom, znamec
    FROM 
      tblCustom
    ORDER BY 
      zidcustom 
    DESC;
  `;
  
  const events = await listApp(sql);
  
  return res.json(events); 
}
/*
/   Insert new custom  
*/
async function postCustom(req, res) {
  const info = [
      req.body.znamec, 
      req.body.phonenr, 
      req.body.email
  ];
  
  let success = true; 
  
  const sql = `
    INSERT INTO 
      tblCustom(znamec, phonenr, email)
    VALUES($1, $2, $3);
  `;
  
  try {
    success = await insertApp(sql, info); 
  }
  catch(e){
    console.error(e);
  }
  
  if(success){
    return res.redirect('/');
  }
}

/*
/   Update custom  
*/
async function updateCustom(req, res) {
  const info = [
      req.body.zidcustom, 
      req.body.znamec, 
      req.body.phonenr, 
      req.body.email
  ];
  
  console.log(info); 

  let success = true; 

  const sql = `
    UPDATE 
      tblCustom 
    SET 
      znamec = $2, 
      phonenr = $3, 
      email = $4 
    WHERE 
      tblCustom.zidcustom = $1;
  `;
  
  try{
    success = await updateApp(sql, info)
  }
  catch(e){
    console.error(e); 
  }

  if(success){
    return res.redirect('/');
  }
}

/*
/   List of custom by project  
*//*
async function getCustomListByProject(req, res) {
  const { id } = req.params;

  const sql = `
    SELECT 
      *
    FROM 
      tblCustom,
      tblOrder,
      tblVerkefni
    WHERE 
      tblCustom.id = tblOrder.idcustom
    AND
      tblOrder.idverkefni = tblVerkefni.id;
  `;
  
  const events = await listApp(sql, [id]);
  
  return res.json(events); 
}
*/

/* GET */
router.get('/', requireAuthentication, getCustom);
router.get('/getNameCustom', requireAuthentication, getNameCustom);

/* POST */
router.post('/addcustom', requireAuthentication, catchErrors(postCustom));
router.post('/updatecustom/:id', requireAuthentication, catchErrors(updateCustom));
