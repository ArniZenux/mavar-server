import express from 'express';
import { requireAuthentication } from '../auth/login.js';
import { listApp, insertApp, updateApp } from '../lib/db.js';
import { catchErrors } from '../lib/utils.js';

export const router = express.Router();

/*
/   All interpreters  
*/
async function getInterpreter(req, res) {
  const sql = `
    SELECT 
      *
    FROM 
      tblInterpreter  
    ORDER BY 
      i_id 
    DESC;
  `;
    
  const events = await listApp(sql);
    
  return res.json(events);
} 

/*
/   Insert new interpreter  
*/
async function postInterprter(req, res) {
  const info = [
      req.body.zname, 
      req.body.phonenr, 
      req.body.email,
      req.body.zstatus
  ];
  
  let success = true; 

  const sql = `
    INSERT INTO 
      tblInterpreter(zname, phonenr, email, zstatus)
    VALUES($1, $2, $3, $4);
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
/   Update interpreter
*/
async function updateInterpreter(req, res) {
  const info = [
    req.body.id, 
    req.body.zname, 
    req.body.phonenr, 
    req.body.email, 
    req.body.zstatus
  ];
  
  let success = true; 

  const sql = `
    UPDATE 
      tblInterpreter 
    SET 
      zname = $2, 
      phonenr = $3, 
      email = $4, 
      zstatus = $5
    WHERE 
      tblInterpreter.i_id = $1;
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
/   Túlkur by name. 
*/
async function getNameInterpreter(req, res) {

  const sql = `
    SELECT 
      i_id, zname
    FROM 
      tblInterpreter
    WHERE
      tblInterpreter.zstatus = 'Virkur';
  `;
  
  const events = await listApp(sql);
  
  return res.json(events); 
}

/*
/   List of one interpreter  ????????
*/
async function oneInterpreter(req, res) {
  const { id } = req.params;
  
  console.log(id); 

  const sql = `
    SELECT 
      *
    FROM 
      tblInterpreter
    WHERE 
      tblInterpreter.i_id = $1; 
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
      tblInterpreter,
      tblWorks,
      tblProject
    WHERE 
      tblInterpreter.i_id = tblWorks.idtulkur
    AND
      tblWorks.idverkefni = tblProject.p_id
    AND
      tblInterpreter.i_id = $1;
  `;
  
  const events = await listApp(sql, [id]);
  
  return res.json(events); 
}

/*async function checkInterpreter(req, res) {
  //let info  = [ req.body.dag ];
  const info = [req.body.day, req.body.start, req.body.last];
  //const dagur = [req.body.day];
  const dagur = '16 júni';

  const dagur1 = req.body.day;
  const timi1 = req.body.start;
  let teljari = 0; 

  console.log(dagur); 
  console.log(dagur1);
  console.log(timi1);

  const sqlTulkur = `
  SELECT 
    count(*)
  FROM 
    tblTulkur
  `;

  const sql = `
  SELECT 
    count(*)
  FROM 
    tblVerkefni
  WHERE
    tblVerkefni.dagur = $1
  AND 
    tblVerkefni.byrja_timi = $2
  `;

  let interpreter = ''; 

  const events = await listApp(sql, [dagur1, timi1]);
  //const many = await listApp(sqlTulkur);
  const obj = JSON.stringify(events);
  const obj_s = obj.split(":");
  const id_v = obj_s[1];
  const idv = id_v.slice(1,2);

  const many = await listApp(sqlTulkur);
  const obj2 = JSON.stringify(many);
  const obj_s2 = obj2.split(":");
  const id_v2 = obj_s2[1];
  const idv2 = id_v2.slice(1,2);

  if( idv < idv2){
    teljari = idv2 - idv;
    interpreter = 'Það er ' + teljari + ' túlkur sé laus á þessu tíma, endalega að panta túlk'; 
  }
  else {
    interpreter = 'Enginn túlkur sé laus'; 
  }
  
  console.log(idv); 
  console.log(idv2); 

  return res.json(interpreter);
}*/

/*
/   Change user  
*/
/*async function userChange(req, res) {
  const nafn = [req.body.nafn];

  let success = true; 

  const sql = `
    UPDATE 
      tblWorks 
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
}*/

/* GET */
router.get('/',requireAuthentication, getInterpreter);
router.get('/getName', requireAuthentication, getNameInterpreter);
router.get('/:id', catchErrors(oneInterpreter));
router.get('/tulkurskoda/:id', catchErrors(userSelectByWork));

/* POST */
router.post('/addinterpreter', requireAuthentication, catchErrors(postInterprter));
router.post('/updateinterpreter/:id', requireAuthentication, catchErrors(updateInterpreter));