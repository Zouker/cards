import React from 'react';
import loader from "./img/loader.svg";

export const Preloader = () => {
    return (
        <div style={{position:'absolute',left:'50%',top:'50%'}}>
            <img src={loader}/>
        </div>
    );
};