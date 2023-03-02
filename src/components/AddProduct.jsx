import React, { useState } from 'react'

export default function AddProductForm() {
  const initialState = {
    name: '',
    image: '',
    price: 0
  }
  const [newProduct, setNewProduct] = useState(initialState);

  const handleChange = (e) => {
    // ITERATION 4
    // Update the state according to the corresponding input
    console.log('Name of the input: ', e.target.name);
    console.log('Name of the value: ', e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // ITERATION 4
    // Send the course info to the parent
    // Restart the newProduct state to its initial value
  }

  return (
    <div className="form_container">
      <form onSubmit={handleSubmit}>
        <label>Product name</label>
        <input type="text" name="name" value={newProduct.name} onChange={handleChange} required />
        <label>Product image</label>
        <input type="text" name="image" required value={newProduct.image} onChange={handleChange} />
        <label>Product price</label>
        <input type="number" name="price" required value={newProduct.price} onChange={handleChange} />
        <button type="submit" className="btn">Create</button>
      </form>
    </div>
  )
}
