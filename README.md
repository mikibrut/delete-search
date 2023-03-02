# Delete & filter exercise 🗑🔎

This project was created with <code>create-react-app</code>, so just run:

```bash
npm install
npm run start
```

💡 You will see a bunch of warnings but that's okay, they will get fixed along the way.

---

## Iteration 1: Print the products 🛍

Inside the file <code>App.jsx</code>, use the .map() method to print a `ProductCard` of each one of the products you have in the **products** state.

- ⚠️ Remember that each element inside the map should have a unique key prop
- Check the `ProductCard` component to see how it's expecting the props

<details>
<summary>Click only on times of desperation</summary>

```js
import React, { useState } from 'react';
import './App.css';
import productData from './products.json';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState(productData);

  return (
    <div className="cart">
      <h1>My shopping cart</h1>

      {/* ITERATION 1 */}
      {products.map(elem => {
        return <ProductCard product={elem} key={elem._id} />
      })}

    </div>
  );
}

export default App;
```
</details>

---

## Iteration 2: Delete products 🗑

Create a function <code>handleDelete</code> on the App component. 

- This function should receive a unique id when called
- This function should filter the products array to update the state with those which weren't deleted
- Send this function to the `ProductCard` child via props
- This function should be called from an <code>onClick</code> event on your delete button. The function will send the id from the children to the parent and the `App.jsx` file is in charge of filtering it out

<details>
<summary>Click only when your brain is all over the wall</summary>

```js
// App.jsx
import React, { useState } from 'react';
import './App.css';
import productData from './products.json';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState(productData);

  // ITERATION 2
  const handleDelete = (id) => {
    const cleanProducts = [...products].filter(elem => elem._id !== id)
    setProducts(cleanProducts)
  }

  return (
    <>
      <h1>My shopping cart</h1>
      <div className="cart">
        {/* ITERATION 1 */}
        {products.map(elem => {
          return <ProductCard product={elem} key={elem._id} handleDelete={handleDelete} />
        })}
      </div>
    </>
  );
}

export default App;


// ProductCard.jsx
import React from 'react'

export default function ProductCard({ product, handleDelete }) {

  const { name, price, image, _id } = product;

  const handleProductDelete = () => {
    // ITERATION 2
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

```

</details>

---
## Iteration 3: Search the products 🔎

1. Create a <code>SearchInput</code> component
2. This component should display an <code>input</code> 
3. Import this component in the `App.jsx` file and display it
4. Create a `searchValue` state in the `App.jsx` file
5. In the `App.jsx` file, create a function called `handleSearch` that will recieve a value (any string) as a parameter and will update the `searchValue` state with said value
6. Change the code in `App.jsx` so that the ProductCards displayed are only the ones that include the searchValue in their `name` (might want to do something before that map...)
7. Send this `handleSearch` function from the parent to the child (SearchInput component) so that the component can use it
8. Everytime the input inside the `SearchInput` component changes, it should call the handleSearch function of the parent and send it the `e.target.value`

<details>
<summary>Click only when seriously questioning life choices</summary>

```js
// SearchInput.jsx
import React from 'react'

export default function SearchInput({ handleSearch }) {

  return (
    <div>
      <input type="text" placeholder="What are you looking for?" onChange={e => handleSearch(e.target.value)} />
    </div>
  )
}

// App.jsx
import React, { useState } from 'react';
import './App.css';
import productData from './products.json';
import ProductCard from './components/ProductCard';
import SearchInput from './components/SearchBar';

function App() {
  const [products, setProducts] = useState(productData);
  const [searchValue, setSearchValue] = useState('');

  // ITERATION 2
  const handleDelete = (id) => {
    const cleanProducts = [...products].filter(elem => elem._id !== id)
    setProducts(cleanProducts)
  }

  // ITERATION 3
  const handleSearch = (value) => {
    setSearchValue(value)
  }

  return (
    <>
      <h1>My shopping cart</h1>
      <SearchInput handleSearch={handleSearch} />
      <div className="cart">
        {/* ITERATION 1 */}
        {products
          .filter(elem => elem.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
          .map(elem => {
            return <ProductCard product={elem} key={elem._id} handleDelete={handleDelete} />
          })}
      </div>
    </>
  );
}

export default App;
```

</details>

---
## Iteration 4: Add new product

1. Import the `AddProductForm` in the `App.jsx` file and display it
2. In the `App.jsx` file, create a function called `handleNewProduct` that will recieve an object containing the new product information, and will add an id to it, and will update the products state with this new addition
3. Send this function to the child, `AddProductForm`
4. In the `AddProductForm`, recieve this function as a prop and use it when submitting the form, to send the information of the `newProduct` from the child to the parent

<details>
<summary>Click only when thinking you shouldn't REALLY be a developer</summary>

```js
// AddProduct.jsx
import React, { useState } from 'react'

export default function AddProductForm({ handleNewProduct }) {
  const initialState = {
    name: '',
    image: '',
    price: 0
  }
  const [newProduct, setNewProduct] = useState(initialState);

  const handleChange = (e) => {
    // ITERATION 4
    // Update the state according to the corresponding input
    setNewProduct(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // ITERATION 4
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

// App.jsx
import React, { useState } from 'react';
import './App.css';
import productData from './products.json';
import ProductCard from './components/ProductCard';
import SearchInput from './components/SearchBar';
import AddProductForm from './components/AddProduct';

function App() {
  const [products, setProducts] = useState(productData);
  const [searchValue, setSearchValue] = useState('');

  // ITERATION 2
  const handleDelete = (id) => {
    const cleanProducts = [...products].filter(elem => elem._id !== id)
    setProducts(cleanProducts)
  }

  // ITERATION 3
  const handleSearch = (value) => {
    setSearchValue(value)
  }

  // ITERATION 4
  const handleNewProduct = (prod) => {
    const productWithId = { ...prod, _id: products.length + 1 };
    setProducts([...products, productWithId]);
  }

  return (
    <>
      <h1>My shopping cart</h1>
      <SearchInput handleSearch={handleSearch} />
      <div className="cart">
        {/* ITERATION 1 */}
        {products
          .filter(elem => elem.name.toLowerCase().includes(searchValue.toLocaleLowerCase()))
          .map(elem => {
            return <ProductCard product={elem} key={elem._id} handleDelete={handleDelete} />
          })}
      </div>
      <AddProductForm handleNewProduct={handleNewProduct} />
    </>
  );
}

export default App;


```
</details>

✅ All done!! 💪🏼




