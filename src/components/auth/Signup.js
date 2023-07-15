import React, { useState } from 'react'
import { auth } from '../../Request'
import { useNavigate } from 'react-router-dom'

const Signup = ({ handleSignup }) => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [school, setSchool] = useState('')
    const [password, setPassword] = useState('')
    const [c_pass, setC_pass] = useState('')

    const navigate = useNavigate()

    const data = {
      "username": userName,
      "email": email,
      "school": school,
      "password": password,
      "confirm_password": c_pass
    }
    const formSubmit = (e) => {
        e.preventDefault()
    
        submitRequest()
        .then(
          () => {
            clearForm()
          }
        )
    
      }
      
      const submitRequest = async() => {
        const res = await auth(data, 'register')

        if(res.status === 201) {
          navigate('/confirm-email')
          window.location.reload()
        }
        else {
          alert("Unable to process your request. Try again")
        }
      }
    
      
      const clearForm = () => {
        setUserName('')
        setSchool('')
        setEmail('')
        setPassword('')
        setC_pass('')
      }

  return (
    <div className="auth-form">
        <div onClick={handleSignup} className="shadow"></div>
        <form onSubmit={formSubmit} className="form">
            <h2 className="form_title">Signup</h2>
            <input type="text" value={userName} onChange={e => setUserName(e.target.value)} placeholder="User Name" className="form_input" />
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="form_input" />
            <input type="text" value={school} onChange={e => setSchool(e.target.value)} placeholder="School" className="form_input" />
            <input type="text" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="form_input" />
            <input type="text" value={c_pass} onChange={e => setC_pass(e.target.value)} placeholder="Confirm Password" className="form_input" />
            <input type="submit" value="Submit" className="form_input form_input_submit" />
        </form>
    </div>
  )
}

export default Signup
