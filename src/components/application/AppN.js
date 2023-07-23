import React, { useState } from 'react'
import Nav from '../nav/Nav'
import Home from '../home/Home'
import Signup from '../auth/Signup'
import Login from '../auth/Login'
import { Route, Routes } from 'react-router-dom'
import ConfirmEmail from '../home/ConfirmEmail'

const AppN = () => {
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [showSignupForm, setShowSignupForm] = useState(false)


    const login = () => {
      setShowLoginForm(!showLoginForm)
    }

    const signup = () => {
      setShowSignupForm(!showSignupForm)
    }

    const toggleAuth = () => {
      signup()
      login()
    }
  return (
    <div>
        <Nav handleLogin = {login} handleSignup={signup} />
        <Routes>
            <Route path='/?' element={ <Home /> } />
            <Route path='/confirm-email' element={ <ConfirmEmail /> } />
        </Routes>
        { showSignupForm &&  <Signup handleAuthToggle={ toggleAuth } handleSignup={signup} />}
        { showLoginForm && <Login handleAuthToggle={ toggleAuth } handleLogin={login} /> }
    </div>
  )
}

export default AppN
