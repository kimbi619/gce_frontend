import React, { useState } from 'react'

const SubjectModal = ({ handleAddSubject, removeSubjectModal }) => {
    const [subjectName, setSubjectName] = useState('')
    const [level, setLevel] = useState('')
    const [grade, setGrade] = useState('')

    
  return (
    <div className="modal">
        <div onClick={ removeSubjectModal } className="shadow"></div>
        <div className="subject_modal">
            <input type="text" name="student_name" placeholder="Subject Name" className="form_input" />
            <div className="flex_subject_modal">
                <div className="modal_subject_level">
                    <input type="text" name="student_name" disabled placeholder="Advanced Level" className="form_input" />
                </div>
                <div className="modal_subject_grade">
                    <input type="text" name="student_name" placeholder="Grade" className="form_input" />
                </div>
            </div>
            <input type="button" onClick={ handleAddSubject } value="Save" className="form_input form_input_submit" />
        </div>
    </div>
  )
}

export default SubjectModal
