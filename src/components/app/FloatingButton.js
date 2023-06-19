import React from 'react'
import './Plugin.css'
import { useNavigate } from 'react-router-dom'

const FloatingButton = () => {
  const navigate = useNavigate()


  const goToAbout = () => {
    navigate('/about')
  }
  
  return (
    <div onClick={goToAbout} className="floatingButton">
        <span className="icon">?</span>
    </div>
  )
}

export default FloatingButton
