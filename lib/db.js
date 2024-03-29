import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  DATABASE_URL: connectionString,
  NODE_ENV: nodeEnv = 'development',
} = process.env;

// Notum SSL tengingu við gagnagrunn ef við erum *ekki* í development mode, þ.e.a.s. á local vél
const ssl = nodeEnv !== 'development' ? { rejectUnauthorized: false } : false;

const pool = new pg.Pool({ connectionString, ssl });

pool.on('error', (err) => {
  console.error('Villa í tengingu við gagnagrunn, forrit hættir', err);
  process.exit(-1);
});

export async function query(_query, values = []) {
  const client = await pool.connect();

  try {
    const result = await client.query(_query, values);
    return result;
  } finally {
    client.release();
  }
}

/**
 * Insert a single registration into the registration table.
 *
 * @param {string} entry.name – Name of registrant
 * @param {string} entry.nationalId – National ID of registrant
 * @param {string} entry.comment – Comment, if any from registrant
 * @param {boolean} entry.anonymous – If the registrants name should be displayed or not
 * @returns {Promise<boolean>} Promise, resolved as true if inserted, otherwise false
 */
export async function insert({
  name, nationalId, comment, anonymous,
} = {}) {
  let success = true;

  const q = `
    INSERT INTO signatures
      (name, nationalId, comment, anonymous)
    VALUES
      ($1, $2, $3, $4);
  `;
  const values = [name, nationalId, comment, anonymous === 'on'];

  try {
    await query(q, values);
  } catch (e) {
    console.error('Error inserting signature', e);
    success = false;
  }

  return success;
}

export async function listApp(_query, _values) {
	let result = []; 
	try {
		const queryResult = await query(_query, _values);

		if (queryResult && queryResult.rows) {
			result = queryResult.rows;
		}
	} catch(e) {
		console.error('-Error list -', e); 
	}
	return result; 
}

export async function insertApp(_query, _values){
	let success = true; 

	try {
		 await query(_query, _values);
	}
	catch(e){
		console.error('-Error inserting -', e);
		success = false;
	}
	return success; 
}

export async function updateApp(_query, _values){
	let success = true; 

	try {
		 await query(_query, _values);
	}
	catch(e){
		console.error('-Error updating -', e);
		success = false;
	}
	return success; 
}

/**
 * List all registrations from the registration table.
 *
 * @returns {Promise<Array<list>>} Promise, resolved to array of all registrations.
 */
export async function list(offset = 0, limit = 10, search = '') {
  const values = [offset, limit];

  let searchPart = '';
  if (search) {
    searchPart = `
      WHERE
      to_tsvector('english', name) @@ plainto_tsquery('english', $3)
      OR
      to_tsvector('english', comment) @@ plainto_tsquery('english', $3)
    `;
    values.push(search);
  }

  let result = [];

  try {
    const q = `
      SELECT
        id, name, nationalId, comment, anonymous, signed
      FROM
        signatures
      ${searchPart}
      ORDER BY signed DESC
      OFFSET $1 LIMIT $2
    `;

    const queryResult = await query(q, values);

    if (queryResult && queryResult.rows) {
      result = queryResult.rows;
    }
  } catch (e) {
    console.error('Error selecting signatures', e);
  }

  return result;
}

export async function total(search) {
  let searchPart = '';
  if (search) {
    searchPart = `
      WHERE
      to_tsvector('english', name) @@ plainto_tsquery('english', $3)
      OR
      to_tsvector('english', comment) @@ plainto_tsquery('english', $3)
    `;
  }

  try {
    const result = await query(
      `SELECT COUNT(*) AS count FROM signatures ${searchPart}`,
      search ? [search] : [],
    );
    return (result.rows && result.rows[0] && result.rows[0].count) || 0;
  } catch (e) {
    console.error('Error counting signatures', e);
  }

  return 0;
}

export async function deleteRow(id) {
  let result = [];
  try {
    const queryResult = await query(
      'DELETE FROM signatures WHERE id = $1',
      [id],
    );

    if (queryResult && queryResult.rows) {
      result = queryResult.rows;
    }
  } catch (e) {
    console.error('Error selecting signatures', e);
  }

  return result;
}

// Helper to remove pg from the event loop
export async function end() {
  await pool.end();
}

// TODO refactor
export async function conditionalUpdate(table, id, fields, values) {
  const filteredFields = fields.filter((i) => typeof i === 'string');
  const filteredValues = values
    .filter((i) => typeof i === 'string'
      || typeof i === 'number'
      || i instanceof Date);

  if (filteredFields.length === 0) {
    return false;
  }

  if (filteredFields.length !== filteredValues.length) {
    throw new Error('fields and values must be of equal length');
  }

  // id is field = 1
  const updates = filteredFields.map((field, i) => `${field} = $${i + 2}`);

  const q = `
    UPDATE ${table}
      SET ${updates.join(', ')}
    WHERE
      id = $1
    RETURNING *
    `;

  const queryValues = [id].concat(filteredValues);

  console.info('Conditional update', q, queryValues);

  const result = await query(q, queryValues);

  return result;
}