import express from 'express';
import { listApp, insertApp, updateApp } from '../lib/db.js';
import { catchErrors } from '../lib/utils.js';

export const router = express.Router();

/*
/   All beidni - Listi by order DESC.   
*/
async function projectBeidni(req, res) {

  const tblVerkefni = `
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
    ORDER BY 
      zidbeidni 
    DESC;
  `;

  const events = await listApp(tblVerkefni);
  
  return res.json(events); 
}

/*
/   opin beiðni
*/
async function opinBeidni(req, res){
  const data = req.body; 
  let success = true; 
  
  const sql = `
    UPDATE 
      tblBeidni 
    SET 
      zchecked = $2 
    WHERE 
      tblBeidni.zidbeidni = $1;
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
/   Afbókun beiðni  
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

/*
/   Hafna beiðni  
*/
async function hafnaBeidniFall(req, res) {
  const id = req.body;
  let success = true; 

  const sql = `
    UPDATE 
      tblBeidni 
    SET 
      explanation = 'Enginn laus',
      interpreter = 'Enginn laus',
      zstatus = 0
    WHERE 
      tblBeidni.zidbeidni = $1;
  `;
  
  try{
    success = await updateApp(sql, id);
  }
  catch(e){
    console.error(e); 
  }

  if(success){
    return res.redirect('/');
  }
}

/*
/   add new Work side by project  
*/
async function postWork(zwork){
  console.log(zwork);
  
  const sql_work = `
    INSERT INTO 
      tblWorks(idinterpreter)
    VALUES(
      $1);
  `;

  let success_work = true; 

  try {
    success_work = await insertApp(sql_work, zwork);
  }
  catch(e){
      console.error(e);
  }

  if(success_work){
    return success_work;
  }
}

/*
/   add new Order side by project   
*/
async function postOrder(zorder){
  console.log(zorder);

  const sql_order = `
    INSERT INTO 
      tblOrder(idcustom)
    VALUES(
      $1);
  `;

  let success_order = true; 

  try {
    success_order = await insertApp(sql_order, zorder);
  }
  catch(e){
    console.error(e);
  }

  if(success_order){
    return success_order;
  }
}

async function postProject(z_project, z_work, z_order){
  console.log('post on disord'); 
  console.log(z_project); 
  
  const sql_project = `
  INSERT INTO 
    tblProject(
        title, 
        place, 
        zday, 
        start_time, 
        last_time,
        scene,
        start_event,
        last_event,
        allday) 
  VALUES($1, 
         $2, 
         $3, 
         $4, 
         $5, 
         $6,
         $7,
         $8,
         $9 );
  `;

  let success_project = true; 
  let success_order_res; 
  let success_work_res;

  try {
    success_project = await insertApp(sql_project, z_project);
  }
  catch(e){
    console.error(e);
  }

  if(success_project){
    success_order_res = postWork(z_work);
    success_work_res =  postOrder(z_order);
  }

  if(success_order_res && success_work_res){
    return true;
  }
}

/*
/   Samþykkt beiðni  
*/
async function samtykktBeidniFall(req, res) {
  let x_beidni = [];
  let x_project = [];
  let x_work = [];
  let x_order = [];

  const id = req.body;
  //console.log(id); 
  
  x_beidni.push(id[0]);   //id_Z
  x_beidni.push(id[12]);  //id_name
  console.log(x_beidni); 

  x_project.push(id[2]);
  x_project.push(id[3]);
  x_project.push(id[4]);
  x_project.push(id[5]);
  x_project.push(id[6]);
  x_project.push(id[7]);
  x_project.push('Mars 22, 2023 20:00:00');
  x_project.push('Mars 22, 2023 21:00:00');
  x_project.push(id[10]);
  //console.log(x_project); 

  x_work.push(id[11]);
  //console.log(x_work);

  x_order.push(id[1]);
  //console.log(x_order);

  let success_beidni = true; 
  let success_project;
  
  const sqlBeidni = `
    UPDATE 
      tblBeidni 
    SET 
      explanation = 'Túlkur kemur',
      interpreter = $2,
      zstatus = 1
    WHERE 
      tblBeidni.zidbeidni = $1;
  `;
    
  try{
    success_beidni = await updateApp(sqlBeidni, x_beidni);
  }
  catch(e){
    console.error(e); 
  }

  if(success_beidni){
    success_project = postProject(x_project, x_work, x_order);
  }

  if(success_project){
    return res.redirect('/');
  }
  
}

/*
/   By one (id) beidni - projects  
*/
async function projectIdBeidni(req, res){
  const { id } = req.params;

  const sql = `
    SELECT 
      *
    FROM 
     tblBeidni
    WHERE 
      tblBeidni.zidbeidni = $1;
  `;
  
  const events = await listApp(sql, [id]);
  
  return res.json(events); 
}

/*
/   Add request with custom and interpreter 
/   in tblproject, tblorder, tblworks
/   Bókunarsíða  
*/
/*
async function addBeidni(req, res){

  const { id } = req.params;
  const project = [
      req.body.id-viðskiptavinur
      req.body.title, 
      req.body.place, 
      req.body.dagur, 
      req.body.byrja_timi, 
      req.body.endir_timi, 
      req.body.vettvangur,
      req.body.nameuser
      req.body.idTulkur
    ];
  
  const verkefni_body = req.body; 
  const idInterpreter = verkefni_body.tulkur;

  console.log(verkefni_body);
  
  console.log(verkefni_body.id);

  console.log(nafn_tulkur); 
  
  const sqlProject = `
    INSERT INTO 
      tblProject(
          title, 
          place, 
          zday, 
          start_time, 
          last_time, 
          scene,
          start_event,
          last_event,
          allDay) 
    VALUES($1, 
           $2, 
           $3, 
           $4, 
           $5, 
           $6,
           $7,
           $8,
           $9);
  `;
  
  const sqlWorks = `
    INSERT INTO
      tblWorks(
            idinterpreter, 
            idproject)
      VALUES($1,
            $2);
  `;
  
  const sqlOrder = `
    INSERT INTO
      tblOrder(
            idcustom, 
            idproject)
      VALUES($1,
             $2);
  `;
  
  const sqlUpdateBeidni = `
    UPDATE 
      tblBeidni 
    SET 
      explanation = 'Túlkur kemur',
      interpreter = $2,
      zstatus = 1
    WHERE 
      tblBeidni.zidbeidni = $1;
  `;

  let success_project =   true; 
  let success_works   =   true; 
  let success_order   =   true; 
  let success_beidni  =   true;

  try{
    success_project = await listApp(sqlProject, project);
  }
  catch(e){
    console.error(e);
  }
  
  try{
    success_works = await listApp(sqlWorks, [idinterpreter, idproject] );
  }
  catch(e){
    console.error(e);
  }
  
  try{
    success_project = await listApp(sqlOrder, [idcustom, idproject]);
  }
  catch(e){
    console.error(e);
  }
  
  try{
    success_project = await listApp(sqlUpdateBeidni, zidbeidni);
  }
  catch(e){
    console.error(e);
  }
  
  /*
  try {
      success = await insertApp(sqlProject, project);
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

  if(success_project && success_works && success_order && success_beidni){
      return res.redirect('/');
  }  
}*/

/*
/   Add new beidni
/   Pöntunarsíða  
*/
/*
async function newBeidni(req, res){
  const newOrder = req.body;
  let success = true; 

  const sql_beidni = `
    INSERT INTO 
      tblBeidni(
          zname,
          place, 
          zdesc,
          zday, 
          start_time, 
          last_time,
          zstatus,
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
      success = await insertApp(sql_beidni, newOrder);
  }
  catch(e) {
    console.error(e);
  }

  if(success){
    return res.redirect('/');
  }
}
*/

/* GET */
router.get('/byBeidni/',  catchErrors(projectBeidni));
//router.get('/byIdBeidni/:id', catchErrors(projectIdBeidni));
router.get('/idBeidni/:id', catchErrors(projectIdBeidni));

/* POST */
router.post('/afbokaBeidni', catchErrors(afbokaBeidniFall));
router.post('/hafnaBeidni', catchErrors(hafnaBeidniFall));
router.post('/samtykktBeidni', catchErrors(samtykktBeidniFall));
router.post('/opinBeidni', catchErrors(opinBeidni));     

//router.post('/sendaBeidni', catchErrors(newBeidni));              // Pöntunarsíða 