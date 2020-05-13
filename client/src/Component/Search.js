import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
function Search(props) {
    const {query} = useContext(AuthContext)
    const [subject,setSubject] = useState("")
    
    const onSubmit = (e) => {
        console.log(`Subject : ${subject}`)
        e.preventDefault()
        var data = {...query};
        if(subject !== "") data.subject = subject;
        setSubject("")
        props.filterRefresh(data);
    }

    const onChange = (e) => {
        setSubject(e.target.value)
    }
    return (
            <>
            <form className="form col-md-3 col-sm-4 " onSubmit={onSubmit} style={{padding:"0px",marginBottom:"-60px", zIndex:"1"}}>
                <input  className="form-control"
                        stye={{margin:"10px"}} 
                        type="search" 
                        placeholder="Search" 
                        aria-label="Search"
                        value={subject}
                        onChange={onChange}
                    />
                {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> */}
            </form>
            <div className="col-md-8 col-sm-7 "></div>
            </>
    );
}

export default Search;