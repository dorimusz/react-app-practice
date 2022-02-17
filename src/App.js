import './App.css';
import http from 'axios'
import { useEffect, useState } from 'react'

function App() {
  const [nameValue, setNameValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [todo, setTodo] = useState('');
  const [authUser, setAuthUser] = useState('')
  const [authPass, setAuthPass] = useState('')

  const [sectionToAppear, setSectionToAppear] = useState('registration')

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

  const addTodo = async () => {
    try {
      await http.post('http://localhost:4000/api/todo', {
        todo: todo
      }, {
        headers: {
          authorization: authUser + ':::' + authPass
        }
      })
      alert("Todo added")
      setTodo('')
    } catch (err) {
      alert('Ooops... something went wrong')
    }
  }

  const login = async () => {
    try {
      await http.post('http://localhost:4000/api/login', {
      }, {
        headers: {
          authorization: authUser + ':::' + authPass
        }
      })
      setSectionToAppear('todos')
      localStorage.setItem('user', authUser)
      localStorage.setItem('password', authPass)

    } catch (err) {
      alert('Wrong username or password')
    }
  }

  const signOut = () => {
    localStorage.removeItem('user', authUser)
    localStorage.removeItem('password', authPass)

    setAuthUser('')
    setAuthPass('')
    setSectionToAppear('login')
  }

  useEffect(() => {
    const user = localStorage.getItem('user');
    const password = localStorage.getItem('password');
    setAuthUser(user);
    setAuthPass(password)
    setSectionToAppear('todos')
  }, [])

  return (
    <main className='App'>
      {sectionToAppear === 'registration' && <section >
        <h1>Registration</h1>
        <input type='text' placeholder='username' value={nameValue} onChange={(e) => setNameValue(e.target.value)}></input>
        <input type='password' placeholder='password' value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)}></input>
        <button onClick={signUp}>Sign up</button>
        <button onClick={() => setSectionToAppear('login')}>I already have an account</button>
      </section>}

      {sectionToAppear === 'login' && <section className='login'>
        <h1>Log in</h1>
        <input type='text' placeholder='authUsername' value={authUser} onChange={e => setAuthUser(e.target.value)} />
        <input type='password' placeholder='authPassword' value={authPass} onChange={e => setAuthPass(e.target.value)} />
        <button onClick={() => setSectionToAppear('registration')}>To register</button>
        <button onClick={login}>Log in</button>
      </section>}

      {sectionToAppear === 'todos' && <section>
        <h1>Add todos</h1>
        <input type='text' placeholder='todo' value={todo} onChange={e => setTodo(e.target.value)} />
        <button onClick={addTodo} disabled={!todo}>Add todo</button>
        <button onClick={signOut}>Sign out</button>
      </section>}
    </main>
  );
}

export default App;

//Autentikáció: 