import {useState} from 'react'
import './App.css';

function App() {
  let [data, setData] = useState('')
  const getData = () => {
    fetch('/api')
    .then(res => res.json())
    .then(json => setData(json.message))
  } 

  return (
    <div className="App">
      <header className="App-header">
        <p>{data}</p>
        <button onClick={getData}>get backend data</button>
      </header>
    </div>
  );
}

export default App;
