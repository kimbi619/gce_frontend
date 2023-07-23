import React, { useLayoutEffect, useState } from 'react'
import { BsChevronDown } from 'react-icons/bs'

const SubjectModal = ({ handleAddSubject, removeSubjectModal, selectedLevel, subjectServer }) => {
    const [subjectName, setSubjectName] = useState('')
    const [level, setLevel] = useState('')
    const [grade, setGrade] = useState('')
    const [selectedSubject, setSelectedSubject] = useState('')
    const [subjects, setSubjects] = useState(subjectServer)
    const [subjectsCopy, setSubjectsCopy] = useState([])
    const [levelDropDown, setLevelDropDown] = useState(false)

    const data = {
        "subject": subjectName,
        "grade": grade
    }

    useLayoutEffect(() => {
      setSubjectsCopy(subjects)
      if(selectedLevel === 'Level') {
        alert('Select level to proceed')
        removeSubjectModal()
      }
    }, [])

    const selectSubject = (subject) => {
      setSubjectName(subject.title)
      setLevelDropDown(false)
    }
    const searchList = (e) => {
      setSubjectName(e.target.value)
      let remainder = subjectsCopy.filter(subject => subject.title.toLowerCase().startsWith(e.target.value.toLowerCase()))
      setSubjects(remainder)
    }
    
  return (
    <div className="modal">
        <div onClick={ removeSubjectModal } className="shadow"></div>
        <div className="subject_modal">
          <div className='dropdownWrapper'>
              <div onClick={() => setLevelDropDown(!levelDropDown)} type="text" className="form_input subject_input_dropdown dropdown">
                  <input type="text" name="student_name" autoComplete='off' value={subjectName} onChange={e => searchList(e)} placeholder="Subject Name" className="form_input subject_form_input" />
                  <span className="dropdown_indicator subject_dropdown_indicator"><BsChevronDown /></span>
              </div>
              <div className={`dropdown-list dropdown-subjects ${levelDropDown ? 'showlevelDropDown': ''}`}>
                  <div type="text" className="form_input dropdown dropdown_content">
                      <ul>
                          {
                            subjects.map(subject => (
                              <li key={subject?.code} onClick={() => selectSubject(subject)}>{ subject?.title }</li>
                              
                            ))
                          }
                          {/* <li onClick={() => selectSubject('Advanced')}>Advanced level</li> */}
                      </ul>
                  </div> 
              </div>
          </div>
            <div className="flex_subject_modal">
                <div className="modal_subject_level">
                    <input type="text" name="student_name" value={level} onChange={e => setLevel(e.target.value)} disabled={true} placeholder={selectedLevel + " Level"} className="form_input" />
                </div>
                <div className="modal_subject_grade">
                    <input type="text" name="student_name" autoComplete='off' value={ grade } onChange={e => setGrade(e.target.value) } placeholder="Grade" className="form_input" />
                </div>
            </div>
            
            <div className='subject_modal_buttons'>
                <input type="button" onClick={ (e) => handleAddSubject(e, data) } value="Save" className="form_input form_input_submit submit_main" />
                <input type="button" onClick={ removeSubjectModal } value="Cancel" className="form_input form_input_submit submit_danger" />
            </div>
        </div>
    </div>
  )
}

export default SubjectModal
