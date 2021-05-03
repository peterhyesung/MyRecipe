const { Pool } = require('pg');

const PG_URI =
  'postgres://esrdasbi:U2-YcIVcZ6aS0CspEGnv2yF0-uvoRm2w@queenie.db.elephantsql.com:5432/esrdasbi';

const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
