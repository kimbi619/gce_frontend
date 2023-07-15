import React, { useContext } from 'react'
import NavUser from '../nav/NavUser'
import { UserContext } from '../context/UserContext';
import ConfirmEmail from '../home/ConfirmEmail';
import { Route, Routes } from 'react-router-dom';

const AppUser = () => {
	const [user, setUser] = useContext(UserContext);

  const handleLogout = () => {
    setUser('')
    window.location.reload();
  }
  return (
    <div>
      <NavUser handleLogout = {handleLogout} />
      <Routes>
        <Route path="/confirm-email" element={<ConfirmEmail />} />
      </Routes>
      
    </div>
  )
}

export default AppUser
