import bcrypt from 'bcrypt';
import { query } from '../lib/db.js';

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

  try {
    const result = await query(q, [username]);
    
    if (result.rowCount === 1) {
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
  console.log("helo");

  try {
    const result = await query(q, [email]);
    console.log("hello - Email soul");

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

export async function createUser(username, password) {
  // Geymum hashað password!
  const hashedPassword = await bcrypt.hash(password, 11);

  const q = `
    INSERT INTO
      tblUsers (username, password)
    VALUES ($1, $2)
    RETURNING *
  `;

  try {
    const result = await query(q, [username, hashedPassword]);
    return result.rows[0];
  } catch (e) {
    console.error('Gat ekki búið til notanda');
  }

  return null;
}