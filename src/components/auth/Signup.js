import React, { useState } from 'react'

const Signup = ({ handleSignup }) => {
    const [userName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [school, setSchool] = useState('')
    const [password, setPassword] = useState('')
    const [c_pass, setC_pass] = useState('')

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
