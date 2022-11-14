import express from 'express';
import { listApp, insertApp, updateApp } from '../lib/db.js';
import { catchErrors } from '../lib/utils.js';

export const router = express.Router();

/*
/   All beidni - projects  
*/
async function projectBeidni(req, res) {

  const tblVerkefni = `
    SELECT 
      *
    FROM 
      tblBeidni
    WHERE 
      tblBeidni.off = 1
  `;
  
  const events = await listApp(tblVerkefni);
  
  return res.json(events); 
}

/*
/   By one (id) beidni - projects  
*/
/*
async function projectIdBeidni(req, res){
  const { id } = req.params;

  const sql = `
    SELECT 
      *
    FROM 
     tblBeidni
    WHERE 
      tblBeidni.id = $1;
  `;
  
  const events = await listApp(sql, [id]);
  
  return res.json(events); 
}*/

/*
/   Add new beidni - project
/   CMS - VIWER  
*/
async function addBeidni(req, res){

  const { id } = req.params;
  const verkefni = [
      req.body.lysing, 
      req.body.stadur, 
      req.body.dagur, 
      req.body.byrja_timi, 
      req.body.endir_timi, 
      req.body.vettvangur
    ];
  
  const verkefni_body = req.body; 
  const nafn_tulkur = verkefni_body.tulkur;

  console.log(verkefni_body);
  
  console.log(verkefni_body.id);

  console.log(nafn_tulkur); 
  
  const sql_verkefni = `
    INSERT INTO 
      tblVerkefni(
          heiti, 
          stadur, 
          dagur, 
          byrja_timi, 
          endir_timi, 
          vettvangur) 
    VALUES($1, 
           $2, 
           $3, 
           $4, 
           $5, 
           $6);
  `;
  
  const sql_lastverkefni = `
    SELECT 
      id, heiti
    FROM
      tblVerkefni
    ORDER BY
      id
    DESC LIMIT 1
  `;
  
  const sql_oneTulkur = `
    SELECT 
      id
    FROM
      tblTulkur
    WHERE
      tblTulkur.nafn = $1;
  `;
  
  const sql_tulkurvinna = `
    INSERT INTO 
      tblVinna(idtulkur, idverkefni)
    VALUES(
      $1, 
      $2);
  `;
  
  const sql_updateBeidni = `
    UPDATE  
      tblBeidni 
    SET 
      off = 0 
    WHERE 
      tblBeidni.id = $1;
  `;

  let success = true; 
  let success1 = true; 
  let success2 = true; 

  try {
      success = await insertApp(sql_verkefni, verkefni);
      const last = await listApp(sql_lastverkefni); 
      const obj = JSON.stringify(last);
      const obj_s = obj.split(":");
      const id_v = obj_s[1];
      const idv = id_v.slice(0,1);

      const res = await listApp(sql_oneTulkur, [nafn_tulkur]); 
      const obj2 = JSON.stringify(res);
      const obj_st = obj2.split(":");
      const id_t = obj_st[1];
      const idt = id_t.slice(0,1);

      success1 = await insertApp(sql_tulkurvinna,[idt, idv]);
      success2 = await updateApp(sql_updateBeidni, [verkefni_body.id])
  }
  catch(e){
      console.error(e);
  }

  if(success && success1){
      return res.redirect('/');
  }
  
  
}

/*
/   Add new beidni
/   DEAF VIEWER  
*/
async function addDeafBeidni(req, res){
  const newBeidni = [
    req.body.nameproject, 
    req.body.place, 
    req.body.day, 
    req.body.start, 
    req.body.nameuser,
    1
  ]; 

  const sql_beidni = `
    INSERT INTO 
      tblBeidni(
          lysing, 
          stadur, 
          dagur, 
          byrja_timi, 
          nameuser,
          off) 
    VALUES($1, 
           $2, 
           $3, 
           $4, 
           $5,
           $6 
           );
  `;

  let success = true; 

  try {
      success = await insertApp(sql_beidni, newBeidni);
  }
  catch(e) {
    console.error(e);
  }

  if(success){
    return res.redirect('/');
  }
}

router.get('/byBeidni', catchErrors(projectBeidni));
//router.get('/byIdBeidni/:id', catchErrors(projectIdBeidni));

router.post('/addBeidniProject/:id', catchErrors(addBeidni));  // CMS
router.post('/sendaBeidni', catchErrors(addDeafBeidni));        // Deaf viewer

