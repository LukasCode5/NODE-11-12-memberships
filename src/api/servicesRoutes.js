const express = require('express');
const { ObjectId } = require('mongodb');
const { dbClient } = require('../config');

const servicesRoutes = express.Router();

const dbName = 'memberships11';
const collectionName = 'services';

// ROUTES

// GET /api/services
servicesRoutes.get('/services', async (req, res) => {
  try {
    await dbClient.connect();
    const collection = dbClient.db(dbName).collection(collectionName);
    const agg = [
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: 'service_id',
          as: 'usersArr',
        },
      },
    ];
    const servicesArr = await collection.aggregate(agg).toArray();
    const servicesWithUserCount = servicesArr.map((sObj) => {
      const rez = {
        ...sObj,
        userCount: sObj.usersArr.length,
      };
      delete rez.usersArr;
      return rez;
    });
    res.json(servicesWithUserCount);
  } catch (error) {
    console.log('error === in get services', error);
    res.status(500).json('something went wrong');
  } finally {
    await dbClient.close();
  }
});
// POST /api/services
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
    if (newPostService.insertedId) {
      console.log('inserst ok');
      // jei siunciam tik status tai sendStatus();
      res.sendStatus(201);
      return;
    }
    throw new Error('newPostService.insertedId false');
  } catch (error) {
    console.log('error === in posting services', error);
    res.status(500).json('Something went wrong');
  } finally {
    await dbClient.close();
  }
});
// DELETE /api/services/:serviceId
servicesRoutes.delete('/services/:serviceId', async (req, res) => {
  try {
    const { serviceId } = req.params;
    await dbClient.connect();
    const collection = dbClient.db(dbName).collection(collectionName);
    const deleteService = await collection.deleteOne({ _id: ObjectId(serviceId) });
    // isitikinti kad istikro buvo istrinta
    if (deleteService.deletedCount === 1) {
      res.status(200).json({ success: true });
      return;
    }
    if (deleteService.deletedCount === 0) {
      res.status(400).json({ err: 'nothing was deleted' });
      return;
    }
    res.status(500).json('something is wrong');
  } catch (error) {
    console.log('error === in deleting services', error);
    res.status(500).json('Something went wrong');
  } finally {
    await dbClient.close();
  }
});
module.exports = servicesRoutes;
