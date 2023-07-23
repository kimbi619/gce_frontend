import React, { useContext, useState } from 'react'
import './auth.css'
import { auth } from '../../Request'
import useLocalStorage from '../../UseLocalStorage'
import { UserContext } from '../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'


const Login = ({ handleLogin, handleAuthToggle }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
	const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const formSubmit = (e) => {
    e.preventDefault()

    submitRequest()

  }
  const data = {
    "email": email,
    "password": password
  }
  const submitRequest = async() => {
    const res = await auth(data, 'login')
    console.log(res);
    res.status === 200 && setUser(res?.data)
    if(res.status === 200){
      window.location.reload()
    }
  }

  return (
    <div className="auth-form">
        <div onClick={ handleLogin } className="shadow"></div>
        <form onSubmit={formSubmit} className="form">
            <h2 className="form_title">Login</h2>
            <input type="text" value={email}onChange={e => setEmail(e.target.value)} placeholder="Email" className="form_input" />
            <input type="password" value={password}onChange={e => setPassword(e.target.value)} placeholder="Password" className="form_input" />
            <p><Link to='/forgot-password' className='auth_link'>forgot password?</Link></p>
            <input type="submit" value="Submit" className="form_input form_input_submit" />
            <div className='form_auth_method'>
              <p>You don't have an account? <Link onClick={ handleAuthToggle } className='auth_link'>signup now</Link></p>
            </div>
        </form>
    </div>
  )
}

export default Login
