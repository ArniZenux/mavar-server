import express from 'express';

import { listApp, insertApp, updateApp } from '../lib/db.js';
import { catchErrors } from '../lib/utils.js';

export const router = express.Router();

/*
/   Túlkur  
*/
async function user(req, res) {

  const sql = `
    SELECT 
      *
    FROM 
      tblTulkur;
  `;
  
  const events = await listApp(sql);
  
  return res.json(events); 
}


/*
/   Túlkur by name. 
*/
async function userbyname(req, res) {

  const sql = `
    SELECT 
      id, nafn
    FROM 
      tblTulkur;
  `;
  
  const events = await listApp(sql);
  
  return res.json(events); 
}


/*
/   List of one user  
*/
async function userSelect(req, res) {
  const { id } = req.params;
  
  console.log(id); 

  const sql = `
    SELECT 
      *
    FROM 
      tblTulkur
    WHERE 
      tblTulkur.id = $1; 
  `;
  
  const events = await listApp(sql, [id]);
  
  return res.json(events); 
}

/*
/   List of project's user  
*/
async function userSelectByWork(req, res) {
  const { id } = req.params;

  const sql = `
    SELECT 
      *
    FROM 
      tblTulkur,
      tblVinna,
      tblVerkefni
    WHERE 
      tblTulkur.id = tblVinna.idtulkur
    AND
      tblVinna.idverkefni = tblVerkefni.id
    AND
      tblTulkur.id = $1;
  `;
  
  const events = await listApp(sql, [id]);
  
  return res.json(events); 
}

/*
/   Insert new user  
*/
async function userNew(req, res) {
  const info = [req.body.firstname, req.body.phonenr, req.body.email];
  let success = true; 

  const sql = `
    INSERT INTO 
      tblTulkur(nafn, simi, netfang)
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
/   Update user  
*/
async function userUpdate(req, res) {
  const { id } = req.params;
  const info = [req.body.firstname, req.body.phonenr, req.body.email, req.body.id];
  
  let success = true; 

  const sql = `
    UPDATE 
      tblTulkur 
    SET 
      nafn = $1, 
      simi = $2, 
      netfang = $3 
    WHERE 
      tblTulkur.id = $4;
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

async function userChange(req, res) {
  const nafn = [req.body.nafn];

  let success = true; 

  const sql = `
    UPDATE 
      tblVinna 
    SET 
      id = $1 
    WHERE 
      nr = $2;
  `;
  
  //const kennt = await list(sql_select_kt, nafn); 
  const obj = JSON.stringify(kennt);
  const obj_s = obj.split(":");
  const kt_ = obj_s[1];
  const kt = kt_.slice(1,11);        
  const change = [req.params.nr];

}

router.get('/', user);
router.get('/byname', userbyname);
router.get('/:id', catchErrors(userSelect));
router.get('/tulkurskoda/:id', catchErrors(userSelectByWork));

router.post('/adduser', catchErrors(userNew));
router.put('/updateuser/:id', catchErrors(userUpdate));
//router.delete(d)
