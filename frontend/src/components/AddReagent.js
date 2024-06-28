// components/AddReagent.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddReagent() {
  const [reagent, setReagent] = useState({
    name: '',
    quantity: 0,
    quantity_measure:'',
    source: '',
    expiry: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setReagent({ ...reagent, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/reagents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reagent),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h1>Add New Reagent</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required />
        <input type="text" name="quantity_measure" placeholder="Quantity_Measure" onChange={handleChange} required />
        <input type="text" name="source" placeholder="Source" onChange={handleChange} required />
        <input type="date" name="expiry" placeholder="Expiry Date" onChange={handleChange} required />
        <button type="submit">Add Reagent</button>
      </form>
    </div>
  );
}

export default AddReagent;