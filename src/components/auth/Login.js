import React, { useState } from 'react'
import './auth.css'


const Login = ({ handleLogin }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const formSubmit = (e) => {
    e.preventDefault()

    submitRequest()
    .then(
      () => {
        clearForm()
      }
    )

  }

  const submitRequest = () => {

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
