import './App.css';
import http from 'axios'
import { useState } from 'react'

function App() {
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const signUp = async () => {
    try {
      await http.post('http://localhost:4000/api/signup', {
        name: nameValue,
        password: passwordValue
      })
      alert("Successful sign up")
      setNameValue('')
      setPasswordValue('')

    } catch (err) {
      if (!err.response) {
        alert('Ooops... something went wrong')
      }
      if (err.response.status === 409) {
        alert('user already exists')
      }
      if (err.response.status === 400) {
        alert('Missing credentials')
      }
      // console.log(err.response)
    }
  }

  return (
    <div className='App'>
      <h1>Registration</h1>
      <input type='text' placeholder='username' value={nameValue} onChange={(e) => setNameValue(e.target.value)}></input>
      <input type='password' placeholder='password' value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)}></input>
      <button onClick={signUp}>Sign up</button>
    </div>
  );
}

export default App;

//Autentikáció: 