import React, { useContext } from 'react'
import NavUser from '../nav/NavUser'
import { UserContext } from '../context/UserContext';

const AppUser = () => {
	const [user, setUser] = useContext(UserContext);

  const handleLogout = () => {
    setUser('')
    window.location.reload();
  }
  return (
    <div>
      <NavUser handleLogout = {handleLogout} />
      
    </div>
  )
}

export default AppUser
