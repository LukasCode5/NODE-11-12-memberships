const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const usersRoutes = require('./api/usersRoutes');
const { PORT } = require('./config');

const app = express();

// Global Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes

app.use('/api/', usersRoutes);

app.get('/', (request, response) => {
  response.json('Home sweet home');
});

// 404

app.use((request, response) => {
  response.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => console.log('Server works on port', +PORT));
