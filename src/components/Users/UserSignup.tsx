import React from 'react'
import { Link } from 'react-router-dom'
import image from "../../assets/images/garbage-truck-waste.png"

const UserSignup : React.FC = () => {
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
                            <h2>User Sign Up</h2>
                            <form className='pt-4'>
                                {/* Email input */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="name">
                                        Name
                                    </label><br/>
                                    <input
                                        type="text"
                                        id="name"
                                        name='name'
                                        className="bg-white w-full py-2 border-1 border-gray-500 rounded-lg ps-3"
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">
                                        Email address
                                    </label><br/>
                                    <input
                                        type="email"
                                        id="email"
                                        name='email'
                                        className="bg-white w-full py-2 border-1 border-gray-500 rounded-lg ps-3"
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="phonenumber">
                                        Phone Number
                                    </label><br/>
                                    <input
                                        type="number"
                                        id="phonenumber"
                                        name='phonenumber'
                                        className="bg-white w-full py-2 border-1 border-gray-500 rounded-lg ps-3"
                                    />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="city">
                                        City
                                    </label><br/>
                                    <input
                                        type="text"
                                        id="city"
                                        name='city'
                                        className="bg-white w-full py-2 border-1 border-gray-500 rounded-lg ps-3"
                                    />
                                </div>
                                {/* Password input */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form1Example23">
                                        Create Password
                                    </label>
                                    <input
                                        type="password"
                                        id="form1Example23"
                                        className="bg-white w-full py-2 border-1 border-gray-500 rounded-lg ps-3"
                                    />
                                </div>
                                <div className='text-center pb-3'>
                                    Already have a account?<Link to={"/user_login"} className='text-blue-700 no-underline'> Log In</Link>
                                </div>
                                {/* Submit button */}
                                <div className='text-center pb-3'>
                                    <Link to={"/user_login"} type="submit" className="btn btn-primary btn-lg btn-block">
                                        Sign Up
                                    </Link>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
        </section>
    )
}

export default UserSignup