const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 2300;

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('Could not connect to MongoDB...', err));

// Rutas
const pizzaRoutes = require('../backend/routes/pizza');
app.use('/api/pizzas', pizzaRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
