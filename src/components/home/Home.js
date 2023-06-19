import React, { useState } from 'react'
import SubjectModal from '../app/SubjectModal'
import { BsChevronDown } from 'react-icons/bs'

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
    const [level, setLevel] = useState('Level')
    const [levelDropDown, setLevelDropDown] = useState(false)
   
    const addSubjectList = () => {
        removeSubjectModal()
    }
    const removeSubjectModal = () => {
        console.log("removing modal", subjectModal);
        setSubjectModal(false)
    }
    const toggleDropdown = () => {
        setLevelDropDown(!levelDropDown)
    }
    const selectLevel = (level) => {
        setLevel(level)
        toggleDropdown()
    }
    return (
        <form className="form">
                    <h3 className="form_title">Input Student Results</h3>
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

                    <div type="text" className="form_input">
                        <div className="grade_section">
                            <div className="subject_list">
                                <div className="subject">Physics</div>
                                <div className="grade">A</div>
                            </div>
                            <div className="subject_list">
                                <div className="subject">Mathematics</div>
                                <div className="grade">
                                    <span>C</span>
                                    <span className="close">X</span>
                                </div>
                            </div>
                        </div>
                        <div className="addBtn"><div onClick={() => setSubjectModal(true)}>+ Add</div></div>
                    </div>
                    { subjectModal ? <SubjectModal handleAddSubject={ addSubjectList } removeSubjectModal={removeSubjectModal} /> : '' }
                    <input type="submit" value="Verify" className="form_input form_input_submit" />
                </form>
    )
}

const Cert = () => {
    return (
        <form class="form">
            <h3 class="form_title">Import a GCE certificate</h3>
            
            <div type="text" class="form_input form_media_input">
                <div class="image_preview">
                    CERT
                    {/* <img src="./img.png" class="image_preview_img" alt="testing 123">  */}
                </div>
                <input type="file" id="certificate_image" />
            </div> 
            <div class="dropdown-list">
            </div>
            
            
            <input type="submit" value="Scan & Authenticate" class="form_input form_input_submit" />
        </form>
    )
}

const Results = () => {
    return (
        <form class="form">
            <h3 class="form_title">View results of STUDENT</h3>
            <input type="text" name="student_name" placeholder="Student Name" className="form_input" />
            
            <input type="submit" value="Scan & Authenticate" class="form_input form_input_submit" />
        </form>
    )
}