import express from 'express';

import { listApp, insertApp } from '../lib/db.js';
import { catchErrors } from '../lib/utils.js';

export const router = express.Router();

async function projectAll(req, res) {
  const tblVerkefni = `
    SELECT 
      *
    FROM 
      tblVerkefni;
  `;
  
  const events = await listApp(tblVerkefni);
  
  return res.json(events); 
}

async function projectByTulkur(req, res) {
   const sql = `
    SELECT 
      *
    FROM 
      tblTulkur,
      tblVinna, 
      tblVerkefni 
    WHERE 
      tblTulkur.id=tblVinna.idtulkur 
    AND 
      tblVinna.idverkefni=tblVerkefni.id;
  `;
      
  const events = await listApp(sql);
  
  return res.json(events); 
}

async function projectAdd(req, res){
  const verkefni = [
      req.body.nameproject, 
      req.body.place, 
      req.body.day, 
      req.body.start, 
      req.body.last, 
      req.body.vettvangur
    ];

  const verkefni_body = req.body; 
  const nafn_tulkur = verkefni_body.tulkur;

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
  
  let success = true; 
  let success1 = true; 

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
  }
  catch(e){
      console.error(e);
  }

  if(success && success1){
      return res.redirect('/');
  }
}

//async function projectUpdate(req, res){}
//async function projectDelete(req, res){}

router.get('/', catchErrors(projectAll));
router.get('/byTulkur', catchErrors(projectByTulkur));

router.post('/addproject', catchErrors(projectAdd));

//router.patch('/:id', getVidburdur);
//router.delete(d)
//router.post('/:id/register', catchErrors(userPostEvent));
