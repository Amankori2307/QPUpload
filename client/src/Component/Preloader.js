import React from 'react';

function Preloader(props) {
    return (
        <div className="d-flex justify-content-center align-items-center" style = {{height:"95vh"}}>
            <img style={{height:"40vw"}}src="/preloader2.gif" alt="preloader" />
        </div>
    );
}

export default Preloader;