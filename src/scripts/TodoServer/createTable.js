const { Client } = require('pg');
const { hostDB, portDB, userDB, passwordDB, databaseDB } = require('./constsDB');

const client = new Client({
  host: hostDB,
  user: userDB,
  password: passwordDB,
  database: databaseDB,
  port: portDB
});

const table = `
    CREATE TABLE "todo" (
        "id" SERIAL PRIMARY KEY,
        "text" VARCHAR(255) not null,
        "checked" BOOLEAN not null
    );
`;

const createDB = async (query) => {
  try {
    await client.connect();
    await client.query(query);
  } catch (err) {
    return;
  } finally {
    await client.end();
  }
};

createDB(table).then((res) => {
  console.log('Table was created!');
});
