import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PizzaList from './PizzaList';
import CreatePizza from './components/CreatePizza';
import EditPizza from './components/EditPizza';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PizzaList />} />
          <Route path="/create" element={<CreatePizza />} />
          <Route path="/edit/:id" element={<EditPizza />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

