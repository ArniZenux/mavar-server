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

//async function projectAdd(req, res){}
//async function projectUpdate(req, res){}
//async function projectDelete(req, res){}


router.get('/', catchErrors(projectAll));
router.get('/byTulkur', catchErrors(projectByTulkur));

//router.get('/:id', catchErrors(userSelect));
//router.get('/user_pickup/:id', catchErrors(userSelectByWork));
//router.post('/', catchErrors(userPostNewEvent));
//router.patch('/:id', getVidburdur);
//router.delete(d)
//router.post('/:id/register', catchErrors(userPostEvent));
