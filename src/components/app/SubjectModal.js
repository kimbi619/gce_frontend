import React, { useLayoutEffect, useState } from 'react'

const SubjectModal = ({ handleAddSubject, removeSubjectModal, selectedLevel }) => {
    const [subjectName, setSubjectName] = useState('')
    const [level, setLevel] = useState('')
    const [grade, setGrade] = useState('')

    const data = {
        "subject": subjectName,
        "level": level,
        "grade": grade
    }

    useLayoutEffect(() => {
      if(selectedLevel === 'Level') {
        alert('Select level to proceed')
        removeSubjectModal()
      }
    }, [])
    
  return (
    <div className="modal">
        <div onClick={ removeSubjectModal } className="shadow"></div>
        <div className="subject_modal">
            <input type="text" name="student_name" value={subjectName} onChange={e => setSubjectName(e.target.value)} placeholder="Subject Name" className="form_input" />
            <div className="flex_subject_modal">
                <div className="modal_subject_level">
                    <input type="text" name="student_name" value={level} onChange={e => setLevel(e.target.value)} disabled={true} placeholder={selectedLevel + " Level"} className="form_input" />
                </div>
                <div className="modal_subject_grade">
                    <input type="text" name="student_name" value={ grade } onChange={e => setGrade(e.target.value) } placeholder="Grade" className="form_input" />
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
