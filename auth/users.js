import bcrypt from 'bcrypt';
import xss from 'xss';
import { conditionalUpdate, query } from '../lib/db.js';

export async function comparePasswords(password, user) {
  const ok = await bcrypt.compare(password, user.password);

  if (ok) {
    return user;
  }
  
  return false;
}

export async function findByUsername(username) {
  const q = `
    SELECT 
      * 
    FROM 
      tblUsers 
    WHERE 
      username = $1;
  `;
  console.log('FindByUsername');
  console.log(username);
    
  try {
    const result = await query(q, [username]);
    if (result.rowCount === 1) {
      console.log(result.rows[0]);
      return result.rows[0];
    }
  } catch (e) {
    console.error('Gat ekki fundið notanda eftir notendnafni');
    return null;
  }

  return false;
}

export async function findByEmail(email) {
  const q = `
    SELECT 
      * 
    FROM 
      tblUsers 
    WHERE 
      email = $1;
  `;
  console.log("FindByEmail - console");

  try {
    const result = await query(q, [email]);
    console.log("FindByEmail - Found - console");

    if (result.rowCount === 1) {
      return result.rows[0];
    }
  } catch (e) {
    console.error('Gat ekki fundið notanda eftir notendnafni');
    return null;
  }

  return false;
}

export async function findById(id) {
  const q = `
    SELECT 
      * 
    FROM 
      tblUsers 
    WHERE 
      id = $1;
  `;

  try {
    const result = await query(q, [id]);

    if (result.rowCount === 1) {
      return result.rows[0];
    }
  } catch (e) {
    console.error('Gat ekki fundið notanda eftir id');
  }

  return null;
}

export async function createUser(username, email, password) {
  // Geymum hashað password!
  const hashedPassword = await bcrypt.hash(password, 11);
  let admin_false = false; 

  const q = `
    INSERT INTO
      tblUsers (username, email, password, admin)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  try {
    const result = await query(q, [username, email, hashedPassword, admin_false]);
    return result.rows[0];
  } catch (e) {
    console.error('Gat ekki búið til notanda');
  }

  return null;
}

function isInt(i) {
  return i !== '' && Number.isInteger(Number(i));
}

function isString(s) {
  return typeof s === 'string';
}

export async function updateUser(id, password, email){
  if(!isInt(id)){
    return null; 
  }

  const fields = [ 
    isString(password) ? 'password' : null,
    isString(email) ? 'email' : null,
  ];

  let hashedPassword = null;

  if(password){
    hashedPassword = await bcrypt.hash(password, parseInt(bcryptRounds, 11));
  }

  const values = [
    hashedPassword,
    isString(email) ? xss(email) : null,
  ];

  fields.push('updated');
  values.push(new Date());

  const result = await conditionalUpdate('users', id, fields, values);

  if(!result){
    return null;
  }

  const updateUser = result.rows[0];
  delete updateUser.password;

  return updateUser;
}