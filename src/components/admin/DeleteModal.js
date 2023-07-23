import axios from 'axios'
import React from 'react'

const config = {
    headers: {
        "Content-Type": "application/json",
    }
}

const DeleteModal = ({ requirement, handleRemoveModal }) => {
    const deleteRequirement = async() => {
        try{
            const response = await axios.delete(`http://localhost:8000/api/v1/gce/admission-requirements/${requirement?.id}`, config)
            if( response.status === 204) {
                window.location.reload()
            }

        }
        catch(err){
            console.warn(err)
        }
    }
  return (
    <div className='modal deleteModal'>
        <div onClick={handleRemoveModal} className='shadow' />
        <div className='delete_container'>
            Are you sure you want to delete the requirement for {requirement?.name}?
            <div className='deleteWrapper_btn'>
                <div onClick={deleteRequirement} className='delete_requirement'>Delete</div>
                <div onClick={ handleRemoveModal } className='delete_requirement'>cancel</div>
            </div>
        </div>
    </div>
  )
}

export default DeleteModal
