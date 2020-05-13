import React from 'react';

function Option({onFilterChange}) {
    return (
            <div className="" style={{fontSize:"0.8rem"}}>
                <hr />
                <div className="custom-control custom-radio">
                    <input type="radio" id="customRadio1" name="mediaType" value="questionPaper" className="custom-control-input" onChange={onFilterChange} defaultChecked/>
                    <label className="custom-control-label" htmlFor="customRadio1">Question Paper</label>
                </div>
                <div className="custom-control custom-radio">
                    <input type="radio" id="customRadio2" name="mediaType" value="notes" className="custom-control-input"  onChange={onFilterChange}/>
                    <label className="custom-control-label" htmlFor="customRadio2">Notes</label>
                </div>
                <div className="custom-control custom-radio">
                    <input type="radio" id="customRadio3" name="mediaType" value="" className="custom-control-input"  onChange={onFilterChange}/>
                    <label className="custom-control-label" htmlFor="customRadio3">Both</label>
                </div>
                <hr />
            </div>
          
    );
}

export default Option;