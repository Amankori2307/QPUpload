import React, { useState } from 'react';
import axios from 'axios'
import Message from './Message'
function Upload(props) {
    const [data, setData] = useState({
        topic:"",
        subject:"",
        college:"",
        branch:"",
        year:"",
        sem:"",
        mediaType:"",
        file : null,
    });
    const [message,setMessage] = useState(null);

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }
    const fileHandleChange = e => {
        setData({
            ...data,
            file:e.target.files[0]
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        const {file, branch, subject, year, sem, college,mediaType} = data
        const config ={
            header : {
                "Content-Type":"multipart/form-data"
            }
        }
        var formData = new FormData();
        formData.append("file",file);
        formData.append("subject",subject);
        formData.append("college",college);
        formData.append("branch",branch);
        formData.append("year",year);
        formData.append("sem",sem);
        formData.append("mediaType",mediaType);
        axios.post('/media/upload',formData,config)
        .then(res => {
            setMessage(res.data.message)
            if(res.data.message.msgError === false)
                props.history.push('/')
        })
        .catch(err => setMessage({msgBody : "Something went Wront, Pls try again!",msgError: true}))       
    }
    return (
        <form encType="multipart/form-data" onSubmit={onSubmit}>
            <p className="display-4 ">Upload</p>
            {message? <Message message={message}/>:null}
            <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="customRadio1" name="mediaType" className="custom-control-input" value = "questionPaper" onChange={onChange}/>
                <label className="custom-control-label" htmlFor="customRadio1">Question Paper</label>
            </div>
            <div className="custom-control custom-radio custom-control-inline my-3">
                <input type="radio" id="customRadio2" name="mediaType" className="custom-control-input" value = "notes" onChange={onChange}/>
                <label className="custom-control-label" htmlFor="customRadio2">Notes</label>
            </div>
            <input 
                    type="file"
                    onChange = {e => fileHandleChange(e)}
                />
            <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input  type="text" 
                        className="form-control" 
                        id="subject" 
                        name="subject"
                        value={data.subject}
                        onChange={onChange}

                    />
            </div>
            <div className="form-group">
                <label htmlFor="college">College</label>
                <input  type="text" 
                        className="form-control" 
                        id="college" 
                        name="college"
                        value={data.college}
                        onChange={onChange}

                    />
            </div>
            <div className="form-group">
                <label htmlFor="branch">Branch</label>
                <input  type="text" 
                        className="form-control" 
                        id="branch" 
                        name="branch"
                        value={data.branch}
                        onChange={onChange}

                    />
            </div>
            <div className="form-group">
                <label htmlFor="sem">Semester</label>
                <input  type="text" 
                        className="form-control" 
                        id="sem" 
                        name="sem"
                        value={data.sem}
                        onChange={onChange}

                    />
            </div>
            <div className="form-group">
                <label htmlFor="year">Year</label>
                <input  type="text" 
                        className="form-control" 
                        id="year" 
                        name="year"
                        value={data.year}
                        onChange={onChange}

                    />
            </div>
             <button type="submit" className="my-2 btn btn-primary">Upload</button>
        </form>
    );
}

export default Upload;