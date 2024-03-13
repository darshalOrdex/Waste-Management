import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import image from "../../assets/images/garbage-truck-waste.png"
import { Link, useNavigate } from 'react-router-dom';
import { UserDetails } from '../../interfaces/UserDetails';
import axios from 'axios';

const UserLogin : React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("authtoken"))
        {
            navigate("/user_home")
        }
    },[])
    const [credentials, setCredentials] = useState<UserDetails>({
        email: "",
        password: "",
    })
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target; 
        setCredentials({...credentials, [name] : value});
    }
    const handleSubmit = async(e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/users/login",credentials)
        .then(response => {
            if(response.data.success) {
                alert('Successfully Logged In');
                localStorage.setItem("authtoken", response.data.authtoken);
                navigate('/user_home')
                setCredentials({
                    name: "",
                    email: "",
                    password: "",
                    phonenumber: "",
                    city: "",
                });
            }
        })
        .catch(err => alert(err.response.data.errors[0].msg))
    }
    return (
        <section className="min-h-screen">
            <div className="container py-5 h-100">
                <div className="row d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-8 col-lg-7 col-xl-6">
                        <img
                            src={image}
                            className="img-fluid"
                            alt="Phone image"
                        />
                    </div>
                    <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h2>User Login</h2>
                            <form className='pt-4' onSubmit={handleSubmit}>
                                {/* Email input */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">
                                        Email address
                                    </label><br/>
                                    <input
                                        type="email"
                                        id="email"
                                        name='email'
                                        className="bg-white w-full py-2 border-1 border-gray-500 rounded-lg ps-3"
                                        value={credentials.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Password input */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="password">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        name='password'
                                        className="bg-white w-full py-2 border-1 border-gray-500 rounded-lg ps-3"
                                        value={credentials.password}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='text-center pb-3'>
                                    Dont have an account?<Link to={"/user_signup"} className='text-blue-700 no-underline'> Sign Up</Link>
                                </div>
                                {/* Submit button */}
                                <div className='text-center'>
                                    <button type="submit" className="btn btn-primary btn-lg btn-block">
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
        </section>
    )
}

export default UserLogin