import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios'
import {AuthContext} from '../Context/AuthContext'
import Item from './Item';
import {withRouter} from 'react-router-dom'
import Option from './Option';
function Bookmark(props) {
    const [bookmarkList,setBookmarkList] = useState([])
    const [mediaType, setMediaType] = useState('questionPaper')
    const {user} = useContext(AuthContext)

    useEffect(() => {
        var media = mediaType
        if(mediaType === "") media = "null"
        axios.get(`/bookmark/${user._id}-${media}`)
        .then(res => {
            setBookmarkList(res.data)
            console.log(res.data)
        })
    },[user._id, mediaType])
    const refresh = () => {
        axios.get(`/bookmark/${user._id}`)
        .then(res => {
            setBookmarkList(res.data)
        })
    }
    const onFilterChange = (e) => {
        setMediaType(e.target.value)
    }
    return (
        <div>
            <Option onFilterChange={onFilterChange}/>
            {bookmarkList && bookmarkList.map((item,index) => item.postId?<Item key={index} item={item.postId} refresh={refresh}/>:null)}
        </div>
    );
}

export default withRouter(Bookmark);