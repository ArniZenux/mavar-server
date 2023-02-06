import express from 'express';
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
      tblCustom
    ORDER BY 
      id 
    DESC;
  `;
  
  const events = await listApp(sql);
  
  return res.json(events); 
}

/*
/   Insert new custom  
*/
async function addCustom(req, res) {
  const info = [
      req.body.zname, 
      req.body.phonenr, 
      req.body.email
  ];
  
  let success = true; 
  
  console.log(info);

  const sql = `
    INSERT INTO 
      tblCustom(zname, phonenr, email)
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
      req.body.id, 
      req.body.zname, 
      req.body.phonenr, 
      req.body.email
  ];
  
  console.log(info); 

  let success = true; 

  const sql = `
    UPDATE 
      tblCustom 
    SET 
      zname = $2, 
      phonenr = $3, 
      email = $4 
    WHERE 
      tblCustom.id = $1;
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
router.get('/', getCustom);

/* POST */
router.post('/addcustom', catchErrors(addCustom));
router.post('/updatecustom/:id', catchErrors(updateCustom));
