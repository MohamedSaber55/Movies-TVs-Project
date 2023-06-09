import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


export default function Register() {
  let navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('')
  const [errorsList, setErrorsList] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [userData, setUserData] = useState({
    'first_name': '',
    'last_name': '',
    'age': '',
    'email': '',
    'password': '',
  })

  function getInputValue(e) {
    let myUser = { ...userData }
    myUser[e.target.name] = e.target.value;
    setUserData(myUser);
  };
// console.log(userData);
  async function sendUserDataToApi() {
    let { data } = await axios.post(`https://route-ecommerce-app.vercel.app/api/v1/auth/signup`, userData)
    if (data.message === "success") {
      setIsLoading(false);
      navToLogin()
    } else {
      setIsLoading(false);
      setErrorMessage(data.message)
      console.log(errorMessage);
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
      first_name: Joi.string().alphanum().min(3).max(15).required(),
      last_name: Joi.string().min(3).max(15).required(),
      age: Joi.number().min(16).max(80).required(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().pattern(new RegExp(/^[A-Z][a-z]{3,6}/)),
    });
    return schema.validate(userData, { abortEarly: false });
  }
  // password: Joi.string().regex('/(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[$@$!#.])[A-Za-zd$@$!%*?&.]{8,20}/').min(8).max(20).required()

  function navToLogin() {
    navigate('/login')
  };




  return (
    <div className="container my-5">
      <h2 className="text-center mb-5">Registration Form </h2>
      <div className="row g-3 align-items-center justify-content-center">
        <form className="px-4" onSubmit={submitFormData}>
          <div className="row">
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="first_name" className="form-label">First Name</label>
                <input onChange={getInputValue} type="text" className="form-control" id="first_name" name='first_name' />
                {errorsList.filter((err) => err.context.label === 'first_name')[0] ? <div className="text-danger  py-2">
                  <p className="m-0">{errorsList.filter((err) => err.context.label === 'first_name')[0]?.message}</p>
                </div> : ''}
              </div>
            </div>
            <div className="col-md-6">
              <div className="mb-3">
                <label htmlFor="last_name" className="form-label">Last Name</label>
                <input onChange={getInputValue} type="text" className="form-control" id="last_name" name="last_name" />
                {errorsList.filter((err) => err.context.label === 'last_name')[0] ? <div className="text-danger  py-2">
                  <p className="m-0">{errorsList.filter((err) => err.context.label === 'last_name')[0]?.message}</p>
                </div> : ''}
              </div>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age</label>
            <input onChange={getInputValue} type="number" className="form-control" id="age" name="age" />
            {errorsList.filter((err) => err.context.label === 'age')[0] ? <div className="text-danger  py-2">
              <p className="m-0">{errorsList.filter((err) => err.context.label === 'age')[0]?.message}</p>
            </div> : ''}
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input onChange={getInputValue} type="email" className="form-control" id="email" name='email' />
            {errorsList.filter((err) => err.context.label === 'email')[0] ? <div className="text-danger  py-2">
              <p className="m-0">{errorsList.filter((err) => err.context.label === 'email')[0]?.message}</p>
            </div> : ''}
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={getInputValue} type="password" className="form-control" id="password" name='password' />
            {errorsList.filter((err) => err.context.label === 'password')[0] ? <div className="text-danger  py-2">
              <p className="m-0">{errorsList.filter((err) => err.context.label === 'password')[0]?.message}</p>
            </div> : ''}
          </div>
          <button type="submit" className="btn btn-outline-warning my-2 px-5">{isLoading ? <i className="fas fa-spinner fa-spin"></i> : 'Register'}</button>
        </form>
        <div className="text-center ">Already have account? <Link className="text-warning" to="/login">Login</Link></div>
      </div>
    </div>
  )
}
