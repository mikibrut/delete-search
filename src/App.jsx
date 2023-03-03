import React, { useState } from 'react';
import './App.css';
import productData from './products.json';
import ProductCard from './components/ProductCard';
import SearchImput from './components/SearchImput';
import AddProductForm from './components/AddProduct';

function App() {
  const [products, setProducts] = useState(productData);
  const [searchValue, setSearchValue] = useState('');
  const [showForm, setShowForm ]= useState(false);

  const handleDelete = (id) => {
    const deletedProduct = [...products].filter(elem => elem._id !== id)
    setProducts(deletedProduct)
  }

  const handleSearch = (value) => {
    setSearchValue(value)
  }

  const handleNewProduct = (newProductData) =>{
    const newProductId = {...newProductData, _id: products.length + 1}
    setProducts([...products, newProductId]);
  }

  const handleShowForm = () => {
    setShowForm(prev => !prev)
  }
  

  return (
    <>
      <h1>My shopping cart</h1>
      <div>
        <SearchImput handleSearchValue={handleSearch}/>
      </div>
      <div>
        <button onClick={handleShowForm}>{showForm ? "hide" : "show"}</button>
        {showForm && <AddProductForm handleNewProduct = {handleNewProduct}/> }
      </div>
      <div className="cart">
        {products
        .filter(elem => elem.name.toLowerCase().includes(searchValue.toLowerCase()))
        .map((elem) => {
          return(
          <ProductCard key={elem._id} product = {elem} handleDelete = {handleDelete}/>
          )})}

      </div>
    </>
  );
}

export default App;
