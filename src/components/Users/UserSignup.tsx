import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from "../../assets/images/garbage-truck-waste.png"
import { UserDetails } from '../../interfaces/UserDetails'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../Common/Spinner';

const UserSignup: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState<UserDetails>({
        name: "",
        email: "",
        password: "",
        phonenumber: "",
        city: "",
    })
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials({...credentials, [name]: value});
    }
    const handleSubmit = async(e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        await axios.post("http://localhost:5000/users/signup",credentials)
        .then(response => {
            if(response.data.success) {
                setCredentials({
                    name: "",
                    email: "",
                    password: "",
                    phonenumber: "",
                    city: "",
                });
                setLoading(false);
                toast.success('Login Success!', {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        height: '100px',
                        padding: '0px 20px',
                    },
                })
                setLoading(false);
                setTimeout(() => {
                    navigate('/login')
                }, 1000);
            }
        })
        .catch(err =>
            toast.error(err.response.data.errors[0].msg, {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                    height: '100px',
                    padding: '0px 20px',
                },
            })
        )
    }
    return (
        <section>
            {loading && <Spinner />}
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
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
                    <div className='flex justify-between'>
                            <h2>User Sign Up</h2>
                            <button className='btn btn-primary' onClick={() => navigate("/")}>Back</button>
                        </div>
                        <form className='pt-4' onSubmit={handleSubmit}>
                            {/* Email input */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="name">
                                    Name
                                </label><br />
                                <input
                                    type="text"
                                    id="name"
                                    name='name'
                                    className="bg-white w-full py-2 border-1 border-gray-500 rounded-lg ps-3"
                                    value={credentials.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="email">
                                    Email address
                                </label><br />
                                <input
                                    type="email"
                                    id="email"
                                    name='email'
                                    className="bg-white w-full py-2 border-1 border-gray-500 rounded-lg ps-3"
                                    value={credentials.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="phonenumber">
                                    Phone Number
                                </label><br />
                                <input
                                    type="text"
                                    inputMode = {'numeric'}
                                    pattern="\d*"
                                    maxLength = {10}
                                    id="phonenumber"
                                    name='phonenumber'
                                    className="bg-white w-full py-2 border-1 border-gray-500 rounded-lg ps-3"
                                    value={credentials.phonenumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="city">
                                    City
                                </label><br />
                                <input
                                    type="text"
                                    id="city"
                                    name='city'
                                    className="bg-white w-full py-2 border-1 border-gray-500 rounded-lg ps-3"
                                    value={credentials.city}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* Password input */}
                            <div className="form-outline mb-4">
                                <label className="form-label" htmlFor="password">
                                    Create Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name='password'
                                    className="bg-white w-full py-2 border-1 border-gray-500 rounded-lg ps-3"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className='text-center pb-3'>
                                Already have a account?<Link to={"/user_login"} className='text-blue-700 no-underline'> Log In</Link>
                            </div>
                            {/* Submit button */}
                            <div className='text-center pb-3'>
                                <button type="submit" className="btn btn-primary btn-lg btn-block">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UserSignup