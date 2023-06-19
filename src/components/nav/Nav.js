import React from 'react'

const Nav = ({ handleLogin, handleSignup}) => {
  return (
    <nav className="navigation">
        <div className="logo">
            <h2 className="logo-desktop">GCE Validator</h2>
            <h2 className="logo-mobile">GCE VS</h2>
        </div>
        <div className="login-button">
            <button onClick={handleSignup} className="btn-signup">Sign Up</button>
            <button onClick={handleLogin} className="btn-login">login</button>
        </div>
    </nav>
  )
}

export default Nav
