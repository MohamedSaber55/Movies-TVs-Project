// import axios from 'axios'
import jwtDecode from 'jwt-decode'
import React, { createContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'


export const AuthContext = createContext(null)

export default function AuthContextProvider(props) {


    // const [data, setData] = useState('mohamed')

    useEffect(() => {
        if (localStorage.getItem('userToken') !== null) {
            saveUserInfo();
        }
    }, [])
    const [userInfo, setUserInfo] = useState(null);

    function logOut() {
        localStorage.removeItem('userToken');
        setUserInfo(null);
        return <Navigate to='/login' />
    }

    function saveUserInfo() {
        let encodedToken = localStorage.getItem('userToken');
        var decodedToken = jwtDecode(encodedToken);
        localStorage.setItem('decodedToken',decodedToken );
        // console.log(decodedToken);
        setUserInfo(decodedToken);
    }
if (userInfo) {
    var _id = userInfo._id
}




    return (
        <AuthContext.Provider value={{ saveUserInfo, userInfo, logOut,_id }} >
            {props.children}
        </AuthContext.Provider>
    )
}
