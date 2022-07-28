import React, { useState } from 'react';
import './App.css';
import productData from './products.json';

function App() {
  const [products, setProducts] = useState(productData);

  return (
    <div className="cart">
      <h1>My shopping cart</h1>

      {/* Your code goes here */}

    </div>
  );
}

export default App;
