import React, { useState } from 'react';
import axios from 'axios';

const CreatePizza = () => {
  const [pizza, setPizza] = useState({
    name: '',
    city: '',
    menusName: '',
    priceRangeMin: '',
    priceRangeMax: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPizza({ ...pizza, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/pizzas', pizza)
      .then(() => console.log('Pizza Created'))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Create Pizza</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} />
        <input type="text" name="city" placeholder="City" onChange={handleChange} />
        <input type="text" name="menusName" placeholder="Menu Name" onChange={handleChange} />
        <input type="number" name="priceRangeMin" placeholder="Price Min" onChange={handleChange} />
        <input type="number" name="priceRangeMax" placeholder="Price Max" onChange={handleChange} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePizza;
