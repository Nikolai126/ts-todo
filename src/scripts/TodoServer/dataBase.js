const Pool = require('pg').Pool;
const { userDB, passwordDB, hostDB, portDB, databaseDB } = require('./constsDB');

module.exports = new Pool({
  user: userDB,
  password: passwordDB,
  host: hostDB,
  port: portDB,
  database: databaseDB
});
