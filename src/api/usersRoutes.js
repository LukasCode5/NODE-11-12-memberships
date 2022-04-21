const express = require('express');
const { ObjectId } = require('mongodb');
const { dbClient } = require('../config');

const usersRoutes = express.Router();

const dbName = 'memberships11';
const collectionName = 'users';

// ROUTES

usersRoutes.get('/users', async (req, res) => {
  try {
    await dbClient.connect();
    const collection = dbClient.db(dbName).collection(collectionName);
    const usersArr = await collection.find().toArray();
    res.json(usersArr);
  } catch (error) {
    console.log('error === in getting users', error);
    res.status(500).json('Something went wrong');
  } finally {
    await dbClient.close();
  }
});

usersRoutes.get('/users/:order', async (req, res) => {
  try {
    const { order } = req.params;
    const orderDirection = order === 'ASC' ? 1 : -1;
    await dbClient.connect();
    const collection = dbClient.db(dbName).collection(collectionName);
    const usersInOrderArr = await collection.find().sort({ name: orderDirection }).toArray();
    res.json(usersInOrderArr);
  } catch (error) {
    console.log('error === in getting users/:order', error);
    res.status(500).json('Something went wrong');
  } finally {
    await dbClient.close;
  }
});

usersRoutes.post('/users', async (req, res) => {
  try {
    const { name, surname, email, service_id } = req.body;
    const serviceObjId = ObjectId(service_id);
    const newUser = {
      name,
      surname,
      email,
      service_id: serviceObjId,
    };
    await dbClient.connect();
    const collection = dbClient.db(dbName).collection(collectionName);
    const newPosrUser = await collection.insertOne(newUser);
    res.json(newPosrUser);
  } catch (error) {
    console.log('error === in posting users', error);
    res.status(500).json('Something went wrong');
  } finally {
    await dbClient.close();
  }
});

usersRoutes.delete('/users/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const userObjId = ObjectId(userId);
    await dbClient.connect();
    const collection = dbClient.db(dbName).collection(collectionName);
    const deleteUser = await collection.deleteOne({ _id: userObjId });
    res.json(deleteUser);
  } catch (error) {
    console.log('error === in deleting users', error);
    res.status(500).json('Something went wrong');
  } finally {
    await dbClient.close();
  }
});

module.exports = usersRoutes;
