import axios from 'axios';
import Joi from 'joi';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';


export default function Login() {
    const { saveUserInfo } = useContext(AuthContext)

    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [errorsList, setErrorsList] = useState([])
    const [userData, setUserData] = useState({
        'email': '',
        'password': '',
    })
    
    function getInputValue(e) {
        let myUser = { ...userData }
        myUser[e.target.name] = e.target.value;
        setUserData(myUser);
    };
    async function sendUserDataToApi() {
        let { data } = await axios.post(`https://sticky-note-fe.vercel.app/signin`, userData)
        if (data.message === "success") {
            setIsLoading(false);
            localStorage.setItem('userToken', data.token);
            navToHome()
        } else {
            setErrorMessage(data.message);
            console.log(errorMessage);
            setIsLoading(false);
        }
    }
    function submitFormData(e) {
        e.preventDefault(); //to prevent reload on submit
        setIsLoading(true);
        let validationResult = validateFormData();
        if (validationResult.error) {
            setIsLoading(false);
            setErrorsList(validationResult.error.details);
        } else {
            sendUserDataToApi();
        }
    };
    function validateFormData() {
        let schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(new RegExp(/^[A-Z][a-z]{3,6}/)),
        });
        return schema.validate(userData, { abortEarly: false });
    }
    function navToHome() {
        saveUserInfo()
        navigate('/')
    };










    return (
        <div className="container my-5">
            <h2 className="text-center mb-5">Login Form </h2>
            <div className="row g-3 align-items-center justify-content-center">
                <form className="px-4" onSubmit={submitFormData}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input onChange={getInputValue} type="email" className="form-control" id="email" name='email' />
                        {errorsList.filter((err) => err.context.label === 'email')[0] ? <div className="text-danger my-2 py-2">
                            <p className="m-0">{errorsList.filter((err) => err.context.label === 'email')[0]?.message}</p>
                        </div> : ''}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onChange={getInputValue} type="password" className="form-control" id="password" name='password' />
                        {errorsList.filter((err) => err.context.label === 'password')[0] ? <div className=" text-danger my-2 py-2">
                            <p className="m-0">{errorsList.filter((err) => err.context.label === 'password')[0]?.message}</p>
                        </div> : ''}
                    </div>
                    <button type="submit" className="btn btn-outline-warning my-2 px-5">{isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Login'}</button>
                </form>
                <div className="text-center ">Don't have account? <Link className="text-warning" to="/register">Register</Link></div>
            </div>
        </div>
    )
}
