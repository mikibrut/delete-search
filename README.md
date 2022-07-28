# Delete & filter exercise 🗑🔎

This project was created with <code>create-react-app</code>, so just run:

```bash
npm install
npm run start
```

## Iteration 1: Print the products 🛍

Inside the file <code>App.jsx</code>, use the .map() method to print the name of each one of the products you have in the **products** state.

- ⚠️ Remember that each element inside the map should have a unique key prop
- Include also a button for each one of the products to delete them from our cart

<details>
<summary>Click only on times of desperation</summary>

```js
import React, { useState } from 'react';
import './App.css';
import productData from './products.json';

function App() {
  const [products, setProducts] = useState(productData);

  return (
    <div className="cart">
      <h1>My shopping cart</h1>
      {products.map(elem => {
        return (
          <div key={elem._id}>
            <p>{elem.name}</p>
            <button>Delete</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;

```
</details>

## Iteration 2: Delete products 🗑

Create a function <code>handleDelete</code> on the App componente. 

- This function should receive a unique id when called
- This function should filter the products array to update the state with those which weren't deleted
- This function should be called from an <code>onClick</code> event on your delete button, which sends the id

<details>
<summary>Click only when your brain is all over the wall</summary>

```js
import React, { useState } from 'react';
import './App.css';
import productData from './products.json';

function App() {
  const [products, setProducts] = useState(productData);

  const handleDelete = (id) => {
    const filtered = products.filter(elem => elem._id !== id);
    setProducts(filtered);
  }

  return (
    <div className="cart">
      <h1>My shopping cart</h1>
      {products.map(elem => {
        return (
          <div key={elem._id}>
            <p>{elem.name}</p>
            <button onClick={() => handleDelete(elem._id)}>Delete</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;

```

</details>

## Iteration 3: Filter the products 🔎

1. Create an input of type="text" underneath the H1 title. Give it a nice placeholder. It should also have an <code>onChange</code> event that, when called, invoques a <code>handleSearch</code> function.
2. The <code>onChange</code> event should send the "e" (event) parameter on to the handleSearch function
3. The <code>handleSearch</code> function should receive the event information, and then filter the elements according to the <code>e.target.value</code>
4. When no parameters are being searched, (when <code>e.target.value === ''</code>), the function should return all the data

<details>
<summary>Click only when seriously questioning life choices</summary>

```js

import React, { useState } from 'react';
import './App.css';
import productData from './products.json';

function App() {
  const [products, setProducts] = useState(productData);

  const handleDelete = (id) => {
    const remaining = products.filter(elem => elem._id !== id);
    setProducts(remaining);
  }

  const handleSearch = (e) => {
    if (e.target.value === '') {
      setProducts(productData);
    } else {
      const filtered = productData.filter(elem => elem.name.toLowerCase().includes((e.target.value).toLowerCase()));
      setProducts(filtered);
    }
  }

  return (
    <div className="cart">
      <h1>My shopping cart</h1>
      <input type="text" placeholder="🔎" onChange={(e) => handleSearch(e)} />
      {products.map(elem => {
        return (
          <div key={elem._id}>
            <p>{elem.name}</p>
            <button onClick={() => handleDelete(elem._id)}>Delete</button>
          </div>
        )
      })}
    </div>
  );
}

export default App;


```

</details>

⛔️ STOP ⛔️ Will be continued after the rest of the lesson

--- 

## Iteration 4: Separation of concerns 🧠 I

### The product card

#### **First: the info**

Create a <code>ProductCard</code> component and move all the information to the component. 

The App.js map should now print one ProductCard for each product and should send it the information of each product by props. 

Change everything you need to and make sure it prints okay before moving on. 

#### **Second: the function handleDelete**

1. This component should receive and destructure a prop called <code>onDelete</code>, which sends the handleDelete function down to the child
2. The component's delete button should call the onDelete function when clicked, sending it the product's id from the children (ProductCard) to the parent (App)

<details>
<summary>Click only when a Walking Dead episode feels like a picnic to you compared to this</summary>

```js
// components/ProductCard.jsx
import React from 'react'

export default function ProductCard(props) {
  const { info: { name, _id }, onDelete } = props;

  return (
     <div>
        <p>{name}</p>
        <button onClick={() => onDelete(_id)}>Delete</button>
      </div>
  )
}

// App.jsx
import React, { useState } from 'react';
import './App.css';
import productData from './products.json';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState(productData);

  const handleDelete = (id) => {
    const remaining = products.filter(elem => elem._id !== id);
    setProducts(remaining);
  }

  const handleSearch = (e) => {
    if (e.target.value === '') {
      setProducts(productData);
    } else {
      const filtered = productData.filter(elem => elem.name.toLowerCase().includes((e.target.value).toLowerCase()));
      setProducts(filtered);
    }
  }

  return (
    <div className="cart">
      <h1>My shopping cart</h1>
      <input type="text" placeholder="🔎" onChange={(e) => handleSearch(e)} />
      {products.map(elem => {
        return (
          <ProductCard key={elem._id} info={elem} onDelete={handleDelete} />
        )
      })}
    </div>
  );
}

export default App;

```
</details>

### The SearchBar 

Now try on your own to separate the input into its own component SearchBar and send the value from the child (SearchBar) to the parent (App).

> 💡 Hint: Remember to send the props onSearch={handleSearch} to the input component AND to use it inside the component

<details>
<summary>Click only when your ears start bleeding from thinking so hard</summary>

```js

// components/SearchBar.jsx

import React from 'react'

export default function SearchBar(props) {
  const { onSearch } = props;
  return (
    <div>
       <input type="text" placeholder="🔎" onChange={(e) => onSearch(e.target.value)} />
    </div>
  )
}

// App.js
import React, { useState } from 'react';
import './App.css';
import productData from './products.json';
import ProductCard from './components/ProductCard';
import SearchBar from './components/SearchBar';

function App() {
  const [products, setProducts] = useState(productData);

  const handleDelete = (id) => {
    const remaining = products.filter(elem => elem._id !== id);
    setProducts(remaining);
  }

  const handleSearch = (searchValue) => {
    if (searchValue === '') {
      setProducts(productData);
    } else {
      const filtered = productData.filter(elem => elem.name.toLowerCase().includes((searchValue).toLowerCase()));
      setProducts(filtered);
    }
  }

  return (
    <div className="cart">
      <h1>My shopping cart</h1>
      <SearchBar onSearch={handleSearch} />
      {products.map(elem => {
        return (
          <ProductCard key={elem._id} info={elem} onDelete={handleDelete} />
        )
      })}
    </div>
  );
}

export default App;


```


</details>

✅ All done!! 



