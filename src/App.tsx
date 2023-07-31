import logo from './logo.svg';
import './App.css';

import { ProductSearchBar } from './components/product/ProductSearchBar';
import { useEffect, useState } from 'react';

function App() {

  const [count, setCount] = useState<number>(0);
  const [innerText, setInnerText] = useState<string>("");

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/'+count)
      .then(response => response.json())
      .then(json => setInnerText(json.title))
  }, [count, setInnerText]);

  const increment = () => setCount(count +1)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <ProductSearchBar text={innerText}/>
        <input type='number'
          value={count}
          onChange={e => setCount(!Number.isNaN(e.target.value) ? Number.parseInt(e.target.value) : 0)}
        />
        <button onClick={increment}>Click hear {count}</button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
