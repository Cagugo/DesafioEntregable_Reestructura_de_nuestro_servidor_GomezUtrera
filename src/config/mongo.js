const mongoose = require('mongoose');
const { db } = require('./index');

mongoose.set('debug', false);
mongoose.set('strictQuery', false);

let connection;

mongoose.connect(db.mongo_atlas, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: db.dbName,
});

connection = mongoose.connection;

connection.on('connected', () => {
  console.log('Successful connection to the database');
});

connection.on('error', (error) => {
  console.error('Database connection error:', error);
});
module.exports = { connection };
