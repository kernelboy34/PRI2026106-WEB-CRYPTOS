import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:2400/api/pizzas')
      .then(response => {
        setPizzas(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the pizzas!", error);
      });
  }, []);

  const deletePizza = (id) => {
    axios.delete(`http://localhost:2400/api/pizzas/${id}`)
      .then(() => {
        setPizzas(pizzas.filter(pizza => pizza._id !== id));
      })
      .catch(error => {
        console.error("There was an error deleting the pizza!", error);
      });
  };

  return (
    <div>
      <h2>Pizza List</h2>
      <ul>
        {pizzas.length > 0 ? (
          pizzas.map(pizza => (
            <li key={pizza._id}>
              {pizza.name} - {pizza.city}
              <button onClick={() => deletePizza(pizza._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No pizzas found</p>
        )}
      </ul>
    </div>
  );
};

export default PizzaList;
