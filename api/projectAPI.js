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
/   All projects - customs and interpreters by ID
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
/   Project by interpreter  
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
/   Update tblWorks 
/   Change interpreter.  
*/
async function updateWork(zworks){
  
  console.log(zworks); 

  let success = true; 
  
  const sql_updateWork = `
    UPDATE 
      tblWorks 
    SET 
      idinterpreter = $2 
    WHERE 
      tblWorks.idproject = $1;
  `;

  try{
    success = await updateApp(sql_updateWork, zworks);
  }
  catch(e){
    console.error(e); 
  }

  if(success){
    return res.redirect('/');
  }
}

/*
/   Update project and change interpreter 
*/
async function projectUpdate(req, res){
  let xproject = [];
  let zwho_work = [];
  let zproject = req.body;
  
  console.log(zproject);

  xproject.push(zproject[0]);
  xproject.push(zproject[1]);
  xproject.push(zproject[2]);
  xproject.push(zproject[3]);
  xproject.push(zproject[4]);
  xproject.push(zproject[5]);
  xproject.push(zproject[6]);
  
  console.log(xproject); 

  const sql_updateProject = `
    UPDATE 
      tblProject
    SET 
      title = $2, 
      place = $3, 
      zday = $4,
      start_time = $5,
      last_time = $6,
      scene = $7
    WHERE 
      tblProject.id = $1;
  `;

  zwho_work.push(zproject[0]);
  zwho_work.push(zproject[7]);

  let success_upddate_project = true; 
  let success_work_res;

  try {
    success_upddate_project = await updateApp(sql_updateProject, xproject);
  }
  catch(e){
    console.error(e);
  }

  if(success_upddate_project){
    success_work_res = updateWork(zwho_work);
  }

  if(success_work_res){
    return res.redirect('/');
  }
}

/*
/   Delete project  
*//*
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
    success_order_res = postWork(zwho_work);


  if(success && success2){
    return res.redirect('/');
  }
}*/


/* GET */
router.get('/', catchErrors(getProject));
router.get('/byTulkur', catchErrors(getProjectByTulkur));
router.get('/allProject', catchErrors(getProjectCustomInterpreter));

/* POST */
router.post('/add_project', catchErrors(postProject)); 
router.post('/add_work_project', catchErrors(postWork)); 
router.post('/add_order_project', catchErrors(postOrder)); 

/* PUT */
router.post('/updateproject', catchErrors(projectUpdate));
//router.post('/updateworks', catchErrors(worksUpdate));

/* DELETE */ 
//router.delete('/delverkefniprofa', catchErrors(projectDelete));