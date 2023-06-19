import React, { useState } from 'react'
import Nav from '../nav/Nav'
import Home from '../home/Home'
import Signup from '../auth/Signup'
import Login from '../auth/Login'
import { Route, Routes } from 'react-router-dom'

const AppN = () => {
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [showSignupForm, setShowSignupForm] = useState(false)


    const login = () => {
      console.log('toggle login...', showLoginForm);
      setShowLoginForm(!showLoginForm)
    }

    const signup = () => {
      setShowSignupForm(!showSignupForm)
    }

  return (
    <div>
        <Nav handleLogin = {login} handleSignup={signup} />
        <Routes>
            <Route path='/?' element={ <Home /> } />
        </Routes>
        { showSignupForm &&  <Signup handleSignup={signup} />}
        { showLoginForm && <Login handleLogin={login} /> }
    </div>
  )
}

export default AppN
