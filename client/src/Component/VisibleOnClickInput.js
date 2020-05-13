import React from 'react';

function VisibleOnClickInput({item, filter, onFilterChange, visible, onVisibleChange}) {
    
    return (
        <div>
            <div className="custom-control custom-checkbox">
                <input 
                        type="checkbox" 
                        className="custom-control-input" 
                        name={`visible${item}`} 
                        onChange={onVisibleChange} 
                        id={item}
                    />
                <label className="custom-control-label" htmlFor={item}>{item}</label>
            </div>
            {visible && 
             <div className="form-group">
                <input 
                        type="text"
                        className="form-control mt-1" 
                        placeholder={item} 
                        name={`input${item}`}
                        onChange={onFilterChange}
                        value={filter}
                    />
           </div>}
        </div>
    );
}

export default VisibleOnClickInput;