const express = require('express');
const Pizza = require('../models/pizza');
const router = express.Router();

// GET: Obtener todas las pizzas
router.get('/', async (req, res) => {
  try {
    const pizzas = await Pizza.find();
    res.json(pizzas);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST: Crear una nueva pizza
router.post('/', async (req, res) => {
  const pizza = new Pizza(req.body);
  try {
    const newPizza = await pizza.save();
    res.status(201).json(newPizza);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET: Obtener una pizza por ID
router.get('/:id', async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    if (pizza == null) {
      return res.status(404).json({ message: 'Pizza not found' });
    }
    res.json(pizza);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Actualizar una pizza
router.put('/:id', async (req, res) => {
  try {
    const updatedPizza = await Pizza.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPizza);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Eliminar una pizza
router.delete('/:id', async (req, res) => {
  try {
    await Pizza.findByIdAndDelete(req.params.id);
    res.json({ message: 'Pizza deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
