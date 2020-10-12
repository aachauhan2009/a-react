import React,  { useState, useEffect } from './react';
import './App.css';

const Child = props => {
  return <div>{props.name}</div>
}

const names = ['abc', 'xyz', '112'];

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  useEffect(() => {
    console.log('Amit', count);
    return () => {
      console.log('Amit', 'cleanup', count);
    }
  }, [count]);
  
  useEffect(() => {
    console.log(count, name);
  }, [name])
  return (
    <div className="App">
      <h2>{count}</h2>
      <button onclick={() => setCount(count + 1)}>
        {" "}
        <h3> + </h3>{" "}
      </button>
      <input value={name} onchange={e => setName(e.target.value)} />
      <div>{name}</div>
      {names.map(name => <Child name={name} />)}
    </div>
  );
}

export default App;
