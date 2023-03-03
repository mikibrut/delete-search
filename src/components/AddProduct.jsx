import React, { useState } from 'react'

export default function AddProductForm({handleNewProduct}) {
  const initialState = {
    name: "",
    image: "",
    price: 0
  }
  const [newProduct, setNewProduct] = useState(initialState);

  const handleChange = (e) => {
    setNewProduct(prev => {
      return{
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewProduct(newProduct);
    setNewProduct(initialState);
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
