import React from 'react'

export default function ProductCard({ product, handleDelete }) {

  const { name, price, image, _id } = product;

  const handleProductDelete = () => {
    handleDelete(_id)
  }

  return (
    <div className="product_card">
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p>Price: {price}$</p>
      <button className="btn_delete" onClick={handleProductDelete}>Delete</button>
    </div>
  )
}