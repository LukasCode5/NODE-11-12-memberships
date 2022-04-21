const express = require('express');
const { ObjectId } = require('mongodb');
const { dbClient } = require('../config');

const servicesRoutes = express.Router();

const dbName = 'memberships11';
const collectionName = 'services';

// ROUTES

servicesRoutes.get('/services', async (req, res) => {
  try {
    await dbClient.connect();
    const collection = dbClient.db(dbName).collection(collectionName);
    const servicesArr = await collection.find().toArray();
    res.json(servicesArr);
  } catch (error) {
    console.log('error === in get services', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
  }
});

servicesRoutes.post('/services', async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const newService = {
      name,
      price,
      description,
    };
    await dbClient.connect();
    const collection = dbClient.db(dbName).collection(collectionName);
    const newPostService = await collection.insertOne(newService);
    res.json(newPostService);
  } catch (error) {
    console.log('error === in posting services', error);
    res.status(500).json('Something went wrong');
  } finally {
    await dbClient.close();
  }
});

servicesRoutes.delete('/services/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    await dbClient.connect();
    const collection = dbClient.db(dbName).collection(collectionName);
    const deleteService = await collection.deleteOne({ _id: ObjectId(serviceId) });
    res.json(deleteService);
  } catch (error) {
    console.log('error === in deleting services', error);
    res.status(500).json('Something went wrong');
  } finally {
    await dbClient.close();
  }
});
module.exports = servicesRoutes;
