import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState({
    name: '',
    city: '',
    menusName: '',
    priceRangeMin: '',
    priceRangeMax: '',
  });

  useEffect(() => {
    axios.get(`/api/pizzas/${id}`)
      .then(response => setPizza(response.data))
      .catch(error => console.log(error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPizza({ ...pizza, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/pizzas/${id}`, pizza)
      .then(() => navigate('/'))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h2>Edit Pizza</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={pizza.name} onChange={handleChange} />
        <input type="text" name="city" value={pizza.city} onChange={handleChange} />
        <input type="text" name="menusName" value={pizza.menusName} onChange={handleChange} />
        <input type="number" name="priceRangeMin" value={pizza.priceRangeMin} onChange={handleChange} />
        <input type="number" name="priceRangeMax" value={pizza.priceRangeMax} onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditPizza;
