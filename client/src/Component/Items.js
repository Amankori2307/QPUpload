import React,{useState, useEffect} from 'react';
import Item from './Item';
import axios from 'axios';
import Filter from './Filter';
import Search from './Search';

function Items(props) {
    const [items,setItems] = useState([])
    useEffect(() => {
        axios.get('/media/question-paper')
        .then(res => {
            setItems(res.data.questionPapers)
        })
    },[])
   const refresh = ( ) => {
    axios.get('/media/question-paper')
    .then(res => {
        setItems(res.data.questionPapers)
    })
    }
    
    const filterRefresh= (data) => {
        axios.post('/media/question-paper',data).then(res => {
            setItems(res.data.data)
        })        
    }
    return (
        <>
        <Search filterRefresh={filterRefresh}/>
        <Filter filterRefresh={filterRefresh}/>
        <div className="col-sm-7 col-md-8">
            {items && items.map((item,index) => <Item key={index} item={item} refresh={refresh}/>)}
        </div>
        </>
    );
}

export default Items;