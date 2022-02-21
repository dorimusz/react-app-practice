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
          authorization: localStorage.getItem("sessionId")
        }
      })
      alert("Todo added")
      setTodo('')
    } catch (err) {
      if (err.response.status === 401) {
        alert("Session ended");
        return setSectionToAppear('login')
      }
      return alert('Ooops... something went wrong');
    }
  };

  const login = async () => {
    try {
      const response = await http.post('http://localhost:4000/api/login', {
      }, {
        headers: {
          authorization: authUser + ':::' + authPass
        }
      })
      setSectionToAppear('todos')
      localStorage.setItem('sessionId', response.data)

    } catch (err) {
      alert('Wrong username or password')
    }
  }

  const signOut = async () => {
    try {
      const response = await http.delete("http://localhost:4000/api/logout", {
        headers: {
          authorization: localStorage.getItem('sessionId')
        }
      }, {});
      console.log(response)
    } catch (err) {
      console.log(err.response)
    } finally {
      localStorage.removeItem('sessionId')
      setAuthUser('')
      setAuthPass('')
      setSectionToAppear('login')
    };
  }

  useEffect(() => {
    const sessionId = localStorage.getItem('sessionId');
    if (!sessionId) return;
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