import React, { useState } from 'react'
import SubjectModal from '../app/SubjectModal'
import { BsChevronDown } from 'react-icons/bs'
import axios from 'axios'
import { MdOutlineClose } from 'react-icons/md'
import { uploadCertificate, validateData } from '../../Request'

const Home = () => {
    const [subjectModal, setSubjectModal] = useState(false)
    const [requestType, setRequestType] = useState('validate')
    
   
    const addSubjectList = () => {
        removeSubjectModal()
    }
    const removeSubjectModal = () => {
        console.log("removing modal", subjectModal);
        setSubjectModal(false)
    }

  return (
    <div>
      <section className="main">
            <div className="toggle_headers">
                <div onClick={() => setRequestType('validate')} className={`request_type ${ requestType === 'validate' ? 'active': '' }`}>Validate Request</div>
                <div onClick={() => setRequestType('view_results')} className={`request_type ${ requestType === 'view_results' ? 'active': '' }`}>View Result</div>
                <div onClick={() => setRequestType('certificate')} className={`request_type ${ requestType === 'certificate' ? 'active': '' }`}>Certificate</div>
            </div>

            <div className="content">
                {
                    requestType === 'validate'
                    ?
                    <Validate />
                    :
                    requestType === 'certificate'
                    ?
                    <Cert />
                    :
                    requestType === 'view_results'
                    ?
                    <Results />
                    : ''
                }
                
            </div>
        </section>
    </div>
  )
}

export default Home


const Validate = () => {
    const [subjectModal, setSubjectModal] = useState(false)
    const [requestType, setRequestType] = useState('')
    const [studName, setStudName] = useState('')
    const [level, setLevel] = useState('Level')
    const [levelDropDown, setLevelDropDown] = useState(false)
    const [grade_list, setGrade_list] = useState([])
   
    const serverRequest = {
        "name": studName,
        "level": level,
        "subjects": grade_list
    }
    const addSubjectList = (e, data) => {
        e.preventDefault()
        setGrade_list(grade_list => [...grade_list, data])
        removeSubjectModal()
    }
    const removeSubjectModal = () => {
        setSubjectModal(false)
    }
    const toggleDropdown = () => {
        setLevelDropDown(!levelDropDown)
    }
    const selectLevel = (level) => {
        setLevel(level)
        toggleDropdown()
    }
    const handleRemoveItem = (line) => {
        let list = grade_list.filter(item => item.subjectName !== line.subjectName)
        setGrade_list(list)

    }
    
    const submitForm = (e) => {
        e.preventDefault()

        validateData(serverRequest, 'validate')

    }
    return (
        <form onSubmit={ submitForm } className="form">
                    <h3 className="form_title">Input Student Results</h3>
                    <input type="text" value={studName} onChange={e => setStudName(e.target.value)} placeholder="Student Name" className="form_input" />

                    <div className='dropdownWrapper'>
                        <div onClick={() => setLevelDropDown(!levelDropDown)} type="text" className="form_input dropdown">
                            <span id='level_placeholder'>{ level }</span>
                            <span className="dropdown_indicator"><BsChevronDown /></span>
                        </div>
                        <div className={`dropdown-list ${levelDropDown ? 'showlevelDropDown': ''}`}>
                            <div type="text" className="form_input dropdown dropdown_content">
                                <ul>
                                    <li onClick={() => selectLevel('Ordinary')}>Ordinary level</li>
                                    <li onClick={() => selectLevel('Advanced')}>Advanced level</li>
                                </ul>
                            </div> 
                        </div>
                    </div>

                    <div type="text" className="form_input">
                        <div className="grade_section">
                            <div className="subject_list">
                                <div className="subject">Subject</div>
                                <div className="grade">Grade</div>
                            </div>
                            {
                                grade_list.map(subject_grade => (
                                    <div key={subject_grade.subject} className="subject_list">
                                        <div className="subject">{ subject_grade.subject }</div>
                                        <div className="grade">
                                            <span>{ subject_grade.grade }</span>
                                            <span onClick={() => handleRemoveItem(subject_grade) } className="close"><MdOutlineClose /> </span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <div className="addBtn"><div onClick={() => setSubjectModal(true)}>+ Add</div></div>
                    </div>
                    { subjectModal ? <SubjectModal handleAddSubject={ addSubjectList } selectedLevel={level} removeSubjectModal={removeSubjectModal} /> : '' }
                    <input type="submit" value="Verify" className="form_input form_input_submit" />
                </form>
    )
}

const Cert = () => {
    const [certificate, setCertificate] = useState('')
    const importImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setCertificate(reader.result)
        }
        reader.readAsDataURL(file);
        
    }
    const data = {
        "certificate": certificate
    }
    const submitCertificate = (e) => {
        e.preventDefault();
        sendData()
        // .then(
        //         clearForm()
        // )
    }

    const clearForm = () => {
        setCertificate('')
    }
    const sendData = async() => {
        try {
            const response = uploadCertificate(data)
            console.log(response);
        } catch (error) {
            console.error('Error uploading image', error);
        }
    }
    return (
        <form onSubmit={submitCertificate} className="form">
            <h3 className="form_title">Import a GCE certificate</h3>
            
            <div type="text" className="form_input form_media_input">
                <div className="image_preview">
                    { certificate ? <img src={certificate} className="image_preview_img" alt="certificate" /> : 'CERT'}
                </div>
                <input type="file" onChange={importImage} accept=".jpg,.png,.webp" id="certificate_image" />
            </div> 
            <div className="dropdown-list">
            </div>
            
            
            <input type="submit" value="Scan & Authenticate" className="form_input form_input_submit" />
        </form>
    )
}

const Results = () => {
    const [level, setLevel] = useState('Level')
    const [levelDropDown, setLevelDropDown] = useState(false)

    const toggleDropdown = () => {
        setLevelDropDown(!levelDropDown)
    }
    const selectLevel = (level) => {
        setLevel(level)
        toggleDropdown()
    }
    return (
        <form className="form">
            <h3 className="form_title">View results of STUDENT</h3>
            <input type="text" name="student_name" placeholder="Student Name" className="form_input" />
            <div className='dropdownWrapper'>
                <div onClick={() => setLevelDropDown(!levelDropDown)} type="text" className="form_input dropdown">
                    <span id='level_placeholder'>{ level }</span>
                    <span className="dropdown_indicator"><BsChevronDown /></span>
                </div>
                <div className={`dropdown-list ${levelDropDown ? 'showlevelDropDown': ''}`}>
                    <div type="text" className="form_input dropdown dropdown_content">
                        <ul>
                            <li onClick={() => selectLevel('Ordinary')}>Ordinary level</li>
                            <li onClick={() => selectLevel('Advanced')}>Advanced level</li>
                        </ul>
                    </div> 
                </div>
            </div>
            <input type="submit" value="Scan & Authenticate" className="form_input form_input_submit" />
        </form>
    )
}