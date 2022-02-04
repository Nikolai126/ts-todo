const { Client } = require('pg');
const { hostDB, portDB, userDB, passwordDB } = require('./constsDB');

const client = new Client({
  host: hostDB,
  port: portDB,
  user: userDB,
  password: passwordDB
});

const createDB = async () => {
  try {
    await client.connect();
    await client.query('CREATE DATABASE todolist');
  } catch (err) {
    console.log(err);
    return;
  } finally {
    await client.end();
  }
};

createDB().then((res) => {
  console.log('Success! DB was created');
});
