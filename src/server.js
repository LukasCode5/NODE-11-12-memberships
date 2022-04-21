const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const { PORT } = require('./config');
const servicesRoutes = require('./api/servicesRoutes');
const usersRoutes = require('./api/usersRoutes');

const app = express();

// Global Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes

app.use('/api', servicesRoutes);
app.use('/api', usersRoutes);

app.get('/', (request, response) => {
  response.json('Home sweet home');
});

// 404 route
app.use(async (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});
app.all('*', async (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => console.log('Server works on port', +PORT));
