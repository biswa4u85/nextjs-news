import React from "react";

function Loader() {
    return (<div className="preloader-wrapper">
        <div className='preloader'>
            <div className='diamond'>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className='movement'>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>);
}

export default Loader;