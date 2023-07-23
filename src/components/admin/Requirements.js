import React, { useState } from 'react'
import RequirementModal from './RequirementModal'
import { BsChevronDown } from 'react-icons/bs'
import axios from 'axios'
import { Link } from 'react-router-dom'
import useLocalStorage from '../../UseLocalStorage'

const Requirements = () => {
    const [subjectModal, setSubjectModal] = useState(false)
    const [levelDropDown, setLevelDropDown] = useState(false)
    const [level, setLevel] = useState('Ordinary')
    const [grade_list, setGrade_list] = useState([])
    const [schoolName, setSchoolName] = useState('')
    const [purpose, setPurpose] = useState('')
    
    const [user, setUser] = useLocalStorage('user')

    const removeSubjectModal = () => {
        setSubjectModal(false)
    }
    const addSubjectList = (e, data) => {
        e.preventDefault()
        setGrade_list(grade_list => [...grade_list, data])
        removeSubjectModal()
    }
    const toggleDropdown = () => {
        setLevelDropDown(!levelDropDown)
    }
    const selectLevel = (level) => {
        setLevel(level)
        toggleDropdown()
    }
    const submitForm = (e) => {
        e.preventDefault()

        sendData()
    }
    const sendData = async() => {
        const data = {
            "name": schoolName,
            "purpose": purpose,
            "level": level,
            "user": user?.user?.id,
            "admission_requirements": grade_list
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        
        try {
            const response = await axios.post('http://localhost:8000/api/v1/gce/requirements/', data, config);
            if(response.status === 201) {
                window.location.reload()
            }
            
            
        } catch(err) {
            console.warn(err)
            return err
        }
    }
  return (
    <section className="main">
            <h3>Set Requirement for your subjects</h3>
            
            <div className="content">
                <form onSubmit={submitForm} className="form">
                    <input type="text" value={schoolName} onChange={e => setSchoolName(e.target.value)} placeholder="Exam School" className="form_input" />
                    <input type="text" value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="Purpose of Requirement e.g entrance" className="form_input" />
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
                    {
                        grade_list.map(subject_grade => (
                        <div key={subject_grade.subject} className="grade_section">
                            <div className="subject_list">
                                <div className="subject">{ subject_grade.subject }</div>
                                <div className="grade">
                                    <span>{level}</span> -
                                    <span>{ subject_grade.grade }</span>
                                    <span className="close">X</span>
                                </div>
                            </div>
                        </div>
                        )
                        )
                    }
                        <div className="addBtn"><div onClick={() => setSubjectModal(true)}>+ Add</div></div>
                    </div>
                    <input type="submit" value="Verify" className="form_input form_input_submit" />
                </form>
            </div>
            <Link to='/'>Back to Homepage</Link>
            { subjectModal && <RequirementModal handleAddSubject={ addSubjectList } selectedLevel={level} removeSubjectModal={removeSubjectModal} /> }
        </section>
  )
}

export default Requirements
