import express from 'express';
import { listApp, insertApp, updateApp } from '../lib/db.js';
import { catchErrors } from '../lib/utils.js';

export const router = express.Router();

function checkTulkur(req, res){
  console.log("hello tulkur - console");
  return res.json('hello Check tulkur');
}

/*
/   Allir túlkur  
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
  const info = [req.body.nafn, req.body.simi, req.body.netfang];
  let success = true; 

  const sql = `
    INSERT INTO 
      tblTulkur(nafn, simi, netfang, stada)
    VALUES($1, $2, $3, $4rs
      );
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
  //const { id } = req.params;
  const info = [req.body.id, req.body.nafn, req.body.simi, req.body.netfang, req.body.stada];
  
  console.log(info); 

  let success = true; 

  const sql = `
    UPDATE 
      tblTulkur 
    SET 
      id = $1,
      nafn = $2, 
      simi = $3, 
      netfang = $4, 
      stada = $5
    WHERE 
      tblTulkur.id = $1;
  `;
  
  try{
    success = await updateApp(sql, info)
    //console.log('ello');
  }
  catch(e){
    console.error(e); 
  }

  if(success){
    return res.redirect('/');
  }
}

async function checkInterpreter(req, res) {
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
}


/*
/   Change user  
*/
/*async function userChange(req, res) {
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
}*/

router.get('/', user);
router.get('/byname', userbyname);
router.get('/athuga', checkTulkur);
router.get('/:id', catchErrors(userSelect));
router.get('/tulkurskoda/:id', catchErrors(userSelectByWork));

router.post('/adduser', catchErrors(userNew));
router.put('/updateuser', catchErrors(userUpdate));

router.post('/athugapost', catchErrors(checkInterpreter));
