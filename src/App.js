import './App.css';
import { useState } from 'react'

function App() {
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');



  return (
    <div className='App'>
      <h1>Registration</h1>
      <input type='text' placeholder='username' value={nameValue} onChange={(e) => setNameValue(e.target.value)}></input>
      <input type='password' placeholder='password' value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)}></input>
      <button>Sign up</button>
    </div>
  );
}

export default App;

//Autentikáció: 