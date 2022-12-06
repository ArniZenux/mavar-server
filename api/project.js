import express from 'express';
import { listApp, insertApp, updateApp } from '../lib/db.js';
import { catchErrors } from '../lib/utils.js';

export const router = express.Router();

/*
/   All projects  
*/
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

/*
/   All projects - DEAF  
*/
async function projectDeaf(req, res) {

  const tblVerkefni4 = `
    SELECT 
      *
    FROM 
      tblList;
  `;
  
  const events4 = await listApp(tblVerkefni4);
  
  return res.json(events4); 
}


/*
/   Project by user  
*/
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

/*
/   Add new project  
*/
async function projectAdd(req, res){

  const verkefni = [
      req.body.nameproject, 
      req.body.place, 
      req.body.day, 
      req.body.start, 
      req.body.last, 
      req.body.vettvangur,
      req.body.nameuser
    ];

  const verkefni_body = req.body; 
  const nafn_tulkur = verkefni_body.tulkur;

  console.log(verkefni_body);
  console.log(nafn_tulkur); 

  const sql_verkefni = `
    INSERT INTO 
      tblVerkefni(
          heiti, 
          stadur, 
          dagur, 
          byrja_timi, 
          endir_timi, 
          vettvangur,
          nameuser) 
    VALUES($1, 
           $2, 
           $3, 
           $4, 
           $5, 
           $6,
           $7);
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

/*
/   Update project  
*/
async function projectUpdate(req, res){
  
  const { id } = req.params;
  const verkefni = [
    req.body.heiti, 
    req.body.stadur, 
    req.body.dagur, 
    req.body.byrja_timi, 
    req.body.endir_timi, 
    req.body.vettvangur,
    req.body.idverkefni
  ];
  
  let success = true; 

  const sql = `
    UPDATE 
      tblVerkefni 
    SET 
      heiti = $1, 
      stadur = $2, 
      dagur = $3,
      byrja_timi = $4,
      endir_timi = $5,
      vettvangur = $6 
    WHERE 
      tblVerkefni.id = $7;
  `;
  
  try{
    success = await updateApp(sql, verkefni)
  }
  catch(e){
    console.error(e); 
  }

  if(success){
    return res.redirect('/');
  }
}

/*
/   Update tblvinna - change user - skipta um túlk.  
*/
async function VinnaUpdate(req, res){
  
  const data = req.body

  const tulkur = data.tulkur; 
  const idverkefni = data.idverkefni; 
  
  console.log(tulkur);
  console.log(idverkefni);  

  let success = true; 
  
  const sql_oneTulkur = `
  SELECT 
    id
  FROM
    tblTulkur
  WHERE
    tblTulkur.nafn = $1;
  `;

  const sql = `
    UPDATE 
      tblVinna 
    SET 
      idtulkur = $1 
    WHERE 
      tblVinna.idverkefni = $2;
  `;
  
  const ress = await listApp(sql_oneTulkur, [tulkur]); 
  const obj2 = JSON.stringify(ress);
  const obj_st = obj2.split(":");
  const id_t = obj_st[1];
  const idt = id_t.slice(0,1);
  
  try{
    success = await updateApp(sql, [idt, idverkefni]);
  }
  catch(e){
    console.error(e); 
  }

  if(success){
    return res.redirect('/');
  }
}

/*
/   Delete project  
*/
async function projectDelete(req, res){
  
  const info = req.body;
  const id_verkefni = req.body.idverkefni;

  let success = true; 
  let success2 = true; 

  const deleteVerkefniSql = `
    DELETE FROM 
      tblVerkefni
    WHERE 
      tblVerkefni.id = $1;
    `;
  
  const deleteVinnaSql = `
    DELETE FROM
      tblVinna 
    WHERE
      tblVinna.idverkefni = $1;
  `; 

  try {
    success2 = await updateApp(deleteVinnaSql, [id_verkefni]);
  }
  catch(e){
    console.log(e); 
  }

  try {
    success = await updateApp(deleteVerkefniSql, [id_verkefni]);
  }
  catch(e){
    console.log(e); 
  }

  if(success && success2){
    return res.redirect('/');
  }
}

router.get('/', catchErrors(projectAll));

router.get('/all', catchErrors(projectDeaf));

router.get('/byTulkur', catchErrors(projectByTulkur));

router.post('/addproject', catchErrors(projectAdd)); 

router.put('/updateproject/:id', catchErrors(projectUpdate));
router.put('/updatevinna/:id', catchErrors(VinnaUpdate));

router.delete('/delverkefniprofa', catchErrors(projectDelete));
