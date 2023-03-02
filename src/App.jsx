import React, { useState } from 'react';
import './App.css';
import productData from './products.json';

function App() {
  const [products, setProducts] = useState(productData);

  return (
    <>
      <h1>My shopping cart</h1>
      <div className="cart">
        {/* ITERATION 1 */}

      </div>
    </>
  );
}

export default App;
