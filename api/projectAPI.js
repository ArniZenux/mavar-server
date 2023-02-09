import express from 'express';
import { listApp, insertApp, updateApp } from '../lib/db.js';
import { catchErrors } from '../lib/utils.js';

export const router = express.Router();


///////////////
//  Project  //
///////////////

/*
/   All projects  
*/
async function getProject(req, res) {

  const tblVerkefni = `
    SELECT 
      *
    FROM 
      tblProject;
  `;
  
  const events = await listApp(tblVerkefni);
  
  return res.json(events); 
}

/*
/   All projects - customs and interpreters 
*/
async function getProjectCustomInterpreter(req, res) {

  const tblVerkefni = `
    SELECT 
      *
    FROM  
      tblInterpreter,
      tblWorks,
      tblProject,
      tblOrder,
      tblCustom
    WHERE
      tblInterpreter.id=tblWorks.idinterpreter
    AND 
      tblWorks.idproject=tblProject.id
    AND
      tblCustom.id=tblOrder.idcustom
    AND 
      tblOrder.idproject=tblProject.id
    ORDER BY 
      tblProject.id 
    DESC;
  `;
  
  const events = await listApp(tblVerkefni);
  
  return res.json(events); 
}
/*
/   Project by user  
*/
async function getProjectByTulkur(req, res) {

  const sql = `
    SELECT 
      *
    FROM 
      tblInterpreter,
      tblWorks, 
      tblProject 
    WHERE 
      tblInterpreter.id=tblWorks.idinterpreter 
    AND 
      tblWorks.idproject=tblProject.id;
  `;
      
  const events = await listApp(sql);
  
  return res.json(events); 
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
    success_work = await insertApp(sql_work, [zwork]);
  }
  catch(e){
      console.error(e);
  }

  if(success_work){
    return success_work
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
  success_order = await insertApp(sql_order, [zorder]);
}
catch(e){
    console.error(e);
}

if(success_order){
  return success_order;
}
}

/*
/   Add new project  
*/
async function postProject(req, res){
  let xproject = [];
  let zproject = req.body;
  
  console.log(zproject);

  xproject.push(zproject[0]);
  xproject.push(zproject[2]);
  xproject.push(zproject[5]);
  xproject.push(zproject[6]);
  xproject.push(zproject[7]);
  xproject.push(zproject[3]);
  
  //let start_dagur = new Date(zproject[5]);
  //console.log();

  xproject.push('Mars 22, 2023 20:00:00');
  xproject.push('Mars 22, 2023 21:00:00');
  xproject.push(true);

  let zwho_order = zproject[1];
  let zwho_work = zproject[4];  
  
  console.log(xproject); 

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
    success_project = await insertApp(sql_project, xproject);
  }
  catch(e){
    console.error(e);
  }

  if(success_project){
    success_order_res = postWork(zwho_work);
    success_work_res =  postOrder(zwho_order);
  }

  if(success_order_res && success_work_res){
    return res.redirect('/');
  }
}

/*
/   Update project  
*/
async function projectUpdate(req, res){
  //const { id } = req.params;
  const zproject = [
    req.body.id,
    req.body.title, 
    req.body.place, 
    req.body.day, 
    req.body.start_time, 
    req.body.last_time, 
    req.body.scene,
    req.body.start_event, 
    req.body.last_event, 
    req.body.allday    
  ];

  let success = true; 

  const sql = `
    UPDATE 
      tblProject
    SET 
      title = $2, 
      place = $3, 
      zday = $4,
      start_time = $5,
      last_time = $6,
      scene = $7,
      start_event = $8,
      last_event = $9,
      allDay = $10 
    WHERE 
      tblProject.id = $1;
  `;
  
  try{
    success = await updateApp(sql, zproject)
  }
  catch(e){
    console.error(e); 
  }

  if(success){
    return res.redirect('/');
  }
}

/*
/   Update tblWorks - change user - skipta um túlk.  
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
    tblInterpreter
  WHERE
    tblInterpreter.zname = $1;
  `;

  const sql = `
    UPDATE 
      tblWorks 
    SET 
      idinterpreter = $1 
    WHERE 
      tblWorks.idproject = $2;
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
      tblProject
    WHERE 
      tblProject.id = $1;
    `;
  
  const deleteVinnaSql = `
    DELETE FROM
      tblWorks 
    WHERE
      tblWorks.idproject = $1;
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

///////////////////////////
//  Project in Calander  //
///////////////////////////

/*
/   All projects  - FullCalander - Table
*/
async function CountEvents(id) {

  const tblEvents = `
    SELECT 
      COUNT(tblEventVinna.idproject)
    FROM 
      tblInterpreter,
      tblEventVinna,
      tblEventTable
    WHERE 
      tblInterpreter.id=tblEventVinna.idinterpreter
    AND
      tblEventVinna.idproject=tblEventTable.id
    AND
      tblInterpreter.id=$1;
    `;
  
  let events = await listApp(tblEvents, [id] );
  return events;
  //console.log(events);
  //return res.json(events);  
  //return events; 
}

/*
/   All projects  - FullCalander - Table
*/
async function getProjectEvents(req, res) {
  const { id } = req.params;
  
  let group = []; 

  const tblEventsCounter = `
  SELECT 
    COUNT(tblEventVinna.idproject)
  FROM 
    tblInterpreter,
    tblEventVinna,
    tblEventTable
  WHERE 
    tblInterpreter.id=tblEventVinna.idinterpreter
  AND
    tblEventVinna.idproject=tblEventTable.id
  AND
    tblInterpreter.id=$1;
  `;

  const tblEvents = `
    SELECT
      tblEventVinna.idproject,
      tblEventTable.title, 
      tblEventTable.start_event, 
      tblEventTable.end_event, 
      tblEventTable.allday
    FROM 
      tblInterpreter
      INNER JOIN tblEventVinna ON tblInterpreter.id=tblEventVinna.idinterpreter
      INNER JOIN tblEventTable ON tblEventVinna.idproject=tblEventTable.id
    WHERE 
      tblInterpreter.id=$1;
    `;
  
 
  let events = await listApp(tblEvents, [id] );
  
  return res.json(events); 
  //return strengur; 
}

async function addEvent(req, res){
  const info = [req.body.title, req.body.dag_byrja, req.body.dag_endir, req.body.satt];
  const idTulkur = [req.body.id];

  console.log(info); 
  console.log(idTulkur); 

  let success = true; 
  let success2 = true; 

  const sqlNewEvent = `
    INSERT INTO 
      tblEventTable(title, start_event, end_event, allDay)
    VALUES($1, $2, $3, $4);
  `;

  const sqlNewEventVinna = `
    INSERT INTO 
      tblEventVinna(idinterpreter)
    VALUES($1);
  `;
  
  try {
    success = await insertApp(sqlNewEvent, info); 
    success2 = await insertApp(sqlNewEventVinna, idTulkur); 
  }
  catch(e){
    console.error(e);
  }
  
  if(success){
    return res.redirect('/');
  }
  
  //console.log('hello hello');
  //res.send('hello res');
}

/*
/   All projects - DEAF  
*//*
async function projectDeaf(req, res) {

  const tblVerkefni4 = `
    SELECT 
      *
    FROM 
      tblList;
  `;
  
  const events4 = await listApp(tblVerkefni4);
  
  return res.json(events4); 
}*/




/* GET */
router.get('/', catchErrors(getProject));
router.get('/events/:id', catchErrors(getProjectEvents));
router.get('/byTulkur', catchErrors(getProjectByTulkur));
router.get('/allProject', catchErrors(getProjectCustomInterpreter));

/* POST */
router.post('/add_project', catchErrors(postProject)); 
router.post('/add_work_project', catchErrors(postWork)); 
router.post('/add_order_project', catchErrors(postOrder)); 

router.post('/addnewevent', catchErrors(addEvent)); 

/* PUT */
router.put('/updateproject/:id', catchErrors(projectUpdate));
router.put('/updatevinna/:id', catchErrors(VinnaUpdate));

/* DELETE */ 
router.delete('/delverkefniprofa', catchErrors(projectDelete));