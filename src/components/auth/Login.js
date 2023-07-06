import React, { useContext, useState } from 'react'
import './auth.css'
import { auth } from '../../Request'
import useLocalStorage from '../../UseLocalStorage'
import { UserContext } from '../context/UserContext'


const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
	const [user, setUser] = useContext(UserContext);

  const formSubmit = (e) => {
    e.preventDefault()

    submitRequest()
    // .then(
    //   () => {
    //     clearForm()
    //     window.location.reload()
    //   }
    // )

  }
  const data = {
    "email": email,
    "password": password
  }
  const submitRequest = async() => {
    const res = await auth(data, 'login')
    setUser(res?.data)
  }

  
  const clearForm = () => {
    setEmail('')
    setPassword('')
  }
  return (
    <div className="auth-form">
        <div onClick={ handleLogin } className="shadow"></div>
        <form onSubmit={formSubmit} className="form">
            <h2 className="form_title">Login</h2>
            <input type="text" value={email}onChange={e => setEmail(e.target.value)} placeholder="Email" className="form_input" />
            <input type="text" value={password}onChange={e => setPassword(e.target.value)} placeholder="Password" className="form_input" />
            <input type="submit" value="Submit" className="form_input form_input_submit" />
        </form>
    </div>
  )
}

export default Login
