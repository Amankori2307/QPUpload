import React, { useState } from 'react';
import axios from 'axios'
import Message from './Message'
import { useParams } from 'react-router-dom';
function EditProfile(props) {
    const [data, setData] = useState({
        file : null,
        sem : "",
        college : "",
        branch : "",
        year : ""
    });
    const {id}  = useParams();
    const [message,setMessage] = useState(null);

    const fileHandleChange = e => {
        setData({
            ...data,
            file:e.target.files[0]
        })
    }
    const onSubmit = e => {
        e.preventDefault()
        const {file, college, branch, sem, year} = data
        const config ={
            header : {
                "Content-Type":"multipart/form-data"
            }
        }
        var formData = new FormData();
        formData.append("userId",id);
        formData.append("file",file);
        formData.append("college",college);
        formData.append("sem",branch);
        formData.append("year",sem);
        formData.append("branch",year);
        
        axios.post('/user/edit',formData,config)
        .then(res => {
            setMessage(res.data.message)
            if(!res.data.msgError)
                props.history.push('/')
        })
        .catch(err => {
            setMessage({msgBody : "Something went Wront, Pls try again!",msgError: true})
            console.log(err)
        })       
    }
    const onChange = e => {
        setData({
          ...data,
          [e.target.name]:e.target.value
        })
        console.log(data)
      }
      
    return (
        <form encType="multipart/form-data" onSubmit={onSubmit}>
            <p className="display-4 ">Edit Profile</p>
            {message? <Message message={message}/>:null}
            <input 
                    type="file"
                    onChange = {e => fileHandleChange(e)}
                />
            <div className="form-group">
                <label htmlFor="college">College</label>
                <input  type="text" 
                        className="form-control" id="college" 
                        name = "college"
                        onChange ={onChange} 
                        value = {data.college}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="branch">Branch</label>
                <input  type="text" 
                        className="form-control" id="branch" 
                        name = "branch"
                        onChange ={onChange} 
                        value = {data.branch}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="sem">Sem</label>
                <input  type="sem" 
                        className="form-control" id="sem" 
                        name = "sem"
                        onChange ={onChange} 
                        value = {data.sem}
                    />
            </div>
            <div className="form-group">
                <label htmlFor="year">Year</label>
                <input  type="text" 
                        className="form-control" id="year" 
                        name = "year"
                        onChange ={onChange} 
                        value = {data.year}
                    />
            </div>
             <button type="submit" className="my-2 btn btn-primary">Upload</button>
        </form>
    );
}

export default EditProfile;