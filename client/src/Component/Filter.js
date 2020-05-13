import React, { useState, useContext } from 'react';
import VisibleOnClickInput from './VisibleOnClickInput';
import {AuthContext} from '../Context/AuthContext'
import Option from './Option'
function Filter(props) {
    const {setQuery} = useContext(AuthContext)
    const [applied, setApplied] = useState(null)
    const [filter,setFilter] = useState({
        mediaType : "questionPaper",
        inputCollege: "",
        inputBranch: "",
        inputYear: "",
        inputSem: ""
        
    })
    const [visible,setVisible] = useState({
        visibleCollege: false,
        visibleBranch: false,
        visibleSem: false,
        visibleYear: false
    })

    const onFilterChange = (e) => {
        setFilter({
            ...filter,
            [e.target.name] :e.target.value
        })
        setApplied(null)
    }
     
    const onVisibleChange = (e) => {
        setVisible({
            ...visible,
            [e.target.name] : !eval(`visible.${e.target.name}`)
        })
        setApplied(null)
    }
    const submitFilter = () => {
        var data = {}
        const {visibleBranch, visibleCollege, visibleSem, visibleYear} = visible;
        const {mediaType,inputSem : sem, inputBranch : branch, inputYear : year, inputCollege : college} = filter
        if(mediaType !== "") data.mediaType = mediaType;
        if(visibleSem && sem !== "") data.sem = sem;
        if(visibleCollege && college !== "") data.college = college;
        if(visibleBranch && branch !== "") data.branch = branch;
        if(visibleYear && year !== "") data.year = year
        setQuery(data)
        props.filterRefresh({...data})
        setApplied("Applied");
    }
     
    return (
        <>
        <div className="col-md-3 col-sm-4 bg-light mt-1" style={{maxHeight:"100vh"}}>
            <div className="mt-5"> 
                <span className="h3 mt-4">Filter</span>
                {applied && <span className="text-success ">({applied})</span>}
            </div>
            <Option onFilterChange={onFilterChange}/>
            <VisibleOnClickInput item="Branch" filter={filter.inputBranch} onFilterChange={onFilterChange} onVisibleChange={onVisibleChange} visible={visible.visibleBranch}/>
            <VisibleOnClickInput item="Sem" filter={filter.inputSem} onFilterChange={onFilterChange} onVisibleChange={onVisibleChange} visible={visible.visibleSem}/>
            <VisibleOnClickInput item="Year" filter={filter.inputYear} onFilterChange={onFilterChange} onVisibleChange={onVisibleChange} visible={visible.visibleYear}/>
            <VisibleOnClickInput item="College" filter={filter.inputCollege} onFilterChange={onFilterChange} onVisibleChange={onVisibleChange} visible={visible.visibleCollege}/>
        {/* college */}
            <button type="submit" className="btn btn-sm btn-primary my-2" onClick={submitFilter}>Apply Filter</button>
        </div>
        </>
    );
}

export default Filter;