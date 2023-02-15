import express from 'express';
import { listApp, insertApp, updateApp } from '../lib/db.js';
import { catchErrors } from '../lib/utils.js';

export const router = express.Router();

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
router.get('/events/:id', catchErrors(getProjectEvents));

/* POST */
router.post('/addnewevent', catchErrors(addEvent)); 
