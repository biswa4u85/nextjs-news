import React from 'react';
import Image from 'next/image'
import favicon from "../../assets/image/favicon.png"

const Preloader = () => {
    return (
        <>
            <div id="preloader-active">
                <div className="preloader flex-1 content-center">
                    <div className="logo absolute inset-y-2/4 jump">
                        <Image src={favicon.src} alt="ERP TECH" />
                        <h1 className="text-lg font-semibold">ERP TECH</h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Preloader;