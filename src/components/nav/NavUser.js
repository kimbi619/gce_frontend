import React from 'react'

const NavUser = ({ handleLogout}) => {
  return (
    <nav className="navigation">
        <div className="logo">
            <h2 className="logo-desktop">GCE Validator</h2>
            <h2 className="logo-mobile">GCE VS</h2>
        </div>
        <div className="login-button">
            <button onClick={handleLogout} className="btn-signup">Log Out</button>
        </div>
    </nav>
  )
}

export default NavUser
