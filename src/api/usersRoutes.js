const express = require('express');
const { dbClient } = require('../config');

const usersRoutes = express.Router();

const dbName = 'node7';
const collectionName = 'users1';

// ROUTES

usersRoutes.get('/users', async (req, res) => {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksma
    console.log('connected');
  } catch (error) {
    console.log('error in get users ===', error);
    res.status(500).json('something is wrong');
  } finally {
    // uzdaryti prisijungima
    console.log('closed');
    await dbClient.close();
  }
});

module.exports = usersRoutes;
