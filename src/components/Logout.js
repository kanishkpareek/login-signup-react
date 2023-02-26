import React from 'react';
import {useEffect} from 'react';
import {Navigate} from 'react-router-dom';

const Logout = () => {

    useEffect(() => {
        localStorage.removeItem('token');
        localStorage.setItem("justLoggedOut", "Y");
    })

    return(
        <Navigate to="/" />
    );
}

export default Logout;