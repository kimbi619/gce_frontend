import React, { useLayoutEffect, useState } from 'react'
import SubjectModal from '../app/SubjectModal'
import { BsChevronDown } from 'react-icons/bs'
import axios from 'axios'
import { MdOutlineClose } from 'react-icons/md'
import { FiRefreshCw } from 'react-icons/fi'
import { uploadCertificate, validateData, validateDataReq } from '../../Request'


import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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

const config = {
    headers: {
        "Content-Type": "application/json",
    }
}

const Validate = () => {
    const [subjectModal, setSubjectModal] = useState(false)
    const [requestType, setRequestType] = useState('')
    const [studName, setStudName] = useState('')
    const [level, setLevel] = useState('Level')
    const [levelDropDown, setLevelDropDown] = useState(false)
    const [grade_list, setGrade_list] = useState([])
    const [reference, setReference] = useState(false)
    const [selectedRequirement, seTselectedRequirement] = useState('Select Requirement')
    const [requirementDropdown, setRequirementDropdown] = useState(false)
    const [subjectList, setSubjectList] = useState([])
    const [requirementList, setRequirementList] = useState([])
    const [year, setYear] = useState('')
    const [serverResponse, setServerResponse] = useState(null)
    const [re, setRe] = useState(null)
    
    useLayoutEffect(() => {
      getSubjects()
    }, [])

    const getSubjects = async() => {
        const promises = [
            axios.get('http://localhost:8000/api/v1/gce/subjects/'),
            axios.get('http://localhost:8000/api/v1/gce/requirements/')
        ]
        try {
            const response = await Promise.all(promises)    
            
            setSubjectList(response[0].data)
            setRequirementList(response[1].data)
            
        }
        catch(err) {
            console.warn(err);
        }
    }

    const serverRequest = {
        "name": studName,
        "level": level.toLowerCase(),
        "year": year,
        "education": "general",
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

    const selectRequirement = (requirement) => {
        seTselectedRequirement(`${requirement?.purpose} (${requirement?.name})`)
        setRequirementDropdown(false)
        setRe(requirement)

    }
    
    const submitForm = (e) => {
        e.preventDefault()
        console.log(reference);
        if( reference) {
            validateWithRef()
        } else {
            validate()
        }
    }
    const validate = async() => {
        console.log(serverRequest);
        const res = await validateData(serverRequest, 'validate')
        res.status === 202 && setServerResponse(res.data)
    }
    const validateWithRef = async() => {
        const res = await validateDataReq(serverRequest, re?.id)
        
        res.status === 200 && setServerResponse(res.data)
    }
    return (

        <>
        <form onSubmit={ submitForm } className="form">
                    <h3 className="form_title">Input Student Results</h3>
                    <input type="text" required value={studName} onChange={e => setStudName(e.target.value.toUpperCase())} placeholder="Student Name" className="form_input" />

                    <input type="text" value={year} onChange={e => setYear(e.target.value.toUpperCase())} required   placeholder="Year" className="form_input" />
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
                        <div type="text" className="form_input">
                            <input type='checkbox' className='requirement_checkbox' name='cross_reference' value={reference} onChange={() => setReference(!reference)} />
                            <label htmlFor='cross_reference'className='reference_label'>Compare with Requirement</label>
                        </div>
                        {
                            reference && (
                                <div className='dropdownWrapper'>
                                    <div onClick={() => setRequirementDropdown(!requirementDropdown)} type="text" className="form_input dropdown">
                                        <span id='level_placeholder'>{ selectedRequirement }</span>
                                        <span className="dropdown_indicator"><BsChevronDown /></span>
                                    </div>
                                    <div className={`dropdown-list dropdown-subjects  ${requirementDropdown ? 'showlevelDropDown': ''}`}>
                                        <div type="text" className="form_input dropdown dropdown_content ">
                                            <ul>
                                                {
                                                    requirementList && requirementList.map( requirement => (
                                                        <li key={requirement?.id} onClick={() => selectRequirement(requirement)}>{ requirement?.purpose } ({requirement?.name})</li>
                                                    ))
                                                }
                                            </ul>
                                        </div> 
                                    </div>
                                </div>
                            )
                        }
                        <div className="addBtn"><div onClick={() => setSubjectModal(true)}>+ Add</div></div>
                    </div>
                    { subjectModal ? <SubjectModal subjectServer={ subjectList } requirements={ requirementList } handleAddSubject={ addSubjectList } selectedLevel={level} removeSubjectModal={removeSubjectModal} /> : '' }
                    <input type="submit" value="Verify" className="form_input form_input_submit" />
                </form>
                <br/>
                <br/>
                { serverResponse && <ServerResponse response={serverResponse} /> }

        </>
    )
}

const Cert = () => {
    const [certificate, setCertificate] = useState('')
    const [img, setImg] = useState(null)
    const [croppedImageSrc, setCroppedImageSrc] = useState(null);
    const [response, setResponse] = useState(null)
    const [isloading, setIsloading] = useState(false)
    
    const importImage = (e) => {
        const file = e.target.files[0];
        setImg(file)
        const reader = new FileReader();
        reader.onload = () => {
            setCertificate(reader.result)
        }
        reader.readAsDataURL(file);
    }

    const [crop, setCrop] = useState({ 
        unit: "%", 
        width: 30, 
        aspect: 4 / 3 
    });


    const data = {
        "certificate": certificate
    }
    const submitCertificate = (e) => {
        e.preventDefault();
        sendData()
    }
    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        const canvas = document.createElement('canvas');
        const img = document.createElement('img');

        img.src = certificate;
        img.onload = () => {
            canvas.width = croppedAreaPixels.width;
            canvas.height = croppedAreaPixels.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(
            img,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
            );
            canvas.toBlob((blob) => {
                setCroppedImageSrc(blob);
            }, 'image/jpeg');
        };
    };

    const clearForm = () => {
        setResponse(null)
        setCertificate('')
    }

    const sendData = async() => {
        setIsloading(true)
        try {
            const formData = new FormData();
            formData.append('image', img);
            const res = await axios.post('http://localhost:8000/api/v1/gce/image/', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            setResponse(res.data)
              
        } catch (error) {
            console.error('Error uploading image', error);
        }
        setIsloading(false)
    }

    return (
        <>
        <form onSubmit={submitCertificate} className="form">
            <h3 className="form_title">Import a GCE certificate</h3>
            {
                !certificate ?
                (
                    <div type="text" className="form_input form_media_input">
                        <div className="image_preview">
                            { certificate ? <img src={certificate} className="image_preview_img" alt="certificate" /> : 'CERT'}
                        </div>
                        <input type="file" onChange={importImage} accept=".jpg,.png,.webp" id="certificate_image" />
                    </div> 

                )
                : 
                (
                    <div>
                        <ReactCrop crop={crop} onChange={newCrop => setCrop(newCrop)} onComplete={onCropComplete}>
                            <img src={certificate} alt="certificate" />
                        </ReactCrop>
                    </div>
                )
            }

            
            
            <input type="submit" value="Scan & Authenticate" className="form_input form_input_submit" />

            <div className='resetArea'>
                <div className='resetButton' onClick={clearForm}>
                    <FiRefreshCw />
                </div>
            </div>
        </form>
        {
            isloading ?
            <div>loading...</div>
            :
            response && <ServerResponse response={response} />
        }
        
        </>
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


const ServerResponse = ({ response }) => {
    return (
        <div className='reponseSection'>
        {
            response.is_valid ?
            <p className='response_message_suc'>{ response.message }</p>
            :
            <p className='response_message_err'>{ response.message }</p>
        }
        <br />
        {
            response?.requirement_met && (
                response.requirement_met ?
                <p className='response_message_suc'>You meet the requirement for applying into this institution</p>
                :
                <p className='response_message_err'>You do NOT meet the requirement for applying into this institution</p>
            )
        }
         <div className='main'>
            <h2>Name: { response.name }</h2>
            <h2>Year: { response.year }</h2>
            <h2>Level: { response.level }</h2>
            <h2>Number of Subjects: { response.results.length }</h2>
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Subject</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        response?.results.map(result => (
                            <tr key={ result?.subject }>
                                <td>{ result?.code ? result.code : "Null" }</td>
                                <td>{ result?.subject }</td>
                                <td>{ result?.grade }</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
         </div>
        </div>
    )
}