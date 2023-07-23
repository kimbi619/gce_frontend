import React, { useLayoutEffect, useState } from 'react'
import './user.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import DeleteModal from './DeleteModal'


const config = {
    headers: {
        "Content-Type": "application/json",
    }
}
const Admin = () => {
    const [requirements, setRequirements] = useState([])
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteItem, setDeleteItem] = useState({})
    const navigate = useNavigate()
    useLayoutEffect(() => {
      getRequirements()
    }, [])
    const getRequirements = async() => {
        const response = await axios.get('http://localhost:8000/api/v1/gce/requirements/', config)
        if( response.status === 200) {
            setRequirements(response.data)
        }
    }
    const deleteAlert = (requirement) => {
        setDeleteModal(true)
        setDeleteItem(requirement)
    }
    const removeDeleteModal = () => {
        setDeleteModal(false)
    }
  return (
    <div className="user_system">
        { deleteModal && <DeleteModal requirement={deleteItem} handleRemoveModal={removeDeleteModal} /> }
        <div className='container'>
            <section className="main">
                <h3>Your Qualifications Set</h3>
                <p className="description-text">
                    <span>You are able to set a minimum requirement for Entrance into your Institution.</span>
                    <span>Please Note that the system will filter and oly return you students who meet those requirements</span>
                </p>
                <ul className="user_list">
                    {
                        requirements.map(requirement => (
                            <li key={requirement?.id}><span className="icon">i</span>{ requirement.purpose } ({ requirement.name })<span onClick={ () => deleteAlert(requirement) } className='delete_requirement'>Delete</span></li>
                            
                            ))
                        }
                        {/* <li><span className="icon">i</span> Faculty of Commerce and Management (HICM) <span className='delete_requirement'>Delete</span></li> */}
                </ul>
                <div className="login-button">
                    <button onClick={() => navigate('/requirement')} className="btn-signup">Add Section</button>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Admin
