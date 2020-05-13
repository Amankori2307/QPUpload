import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios'
import {AuthContext} from '../Context/AuthContext'
import Item from './Item';
import Option from './Option'
function MyUploads(props) {
    const [myUploadsList,setMyUploadsList] = useState([])
    const {user} = useContext(AuthContext)
    const [deleted, setDeleted] = useState(false)
    const [mediaType, setMediaType] = useState("questionPaper")
    useEffect(() => {
        var media = mediaType
        if(mediaType === "") media = "null"

        axios.get(`/media/my-uploads/${user._id}-${media}`)
        .then(res => {
            setMyUploadsList(res.data)
            console.log(res.data)
        })
    },[user._id, deleted,mediaType])
    const refresh = () => {
        axios.get(`/media/my-uploads/${user._id}`)
        .then(res => {
            setMyUploadsList(res.data)
        })
    }
    const deleteHandler = (postId) => {
        axios.get(`/media/delete/${postId}`)
        .then(res => {
            if(res.data.success)
                setDeleted(true)
        })
    }
    const onFilterChange = (e) => {
        setMediaType(e.target.value)
    }
    return (
        <div>
            <Option onFilterChange={onFilterChange}/>
            {myUploadsList && myUploadsList.map((item,index) => <div className ="row"  key={index}>
                <div className="col">
                    <Item item={item} refresh={refresh}/>
                </div>
                <div className="col">
                    <i onClick={(postId) => deleteHandler(item._id)} className="far fa-trash-alt mt-5 ml-5 text-primary"></i>
                </div>
            </div>)}
        </div>
    );
}

export default MyUploads;