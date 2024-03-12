import React from 'react'
import image from "../../assets/images/garbage-truck-waste.png"
import { Link } from 'react-router-dom'

const UserLogin : React.FC = () => {
    return (
        <section className="loginpage">
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
                            <form className='pt-4'>
                                {/* Email input */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form1Example13">
                                        Email address
                                    </label><br/>
                                    <input
                                        type="email"
                                        id="form1Example13"
                                        className="bg-white w-full py-2 border-1 border-gray-500 rounded-lg ps-3"
                                    />
                                </div>
                                {/* Password input */}
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="form1Example23">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="form1Example23"
                                        className="bg-white w-full py-2 border-1 border-gray-500 rounded-lg ps-3"
                                    />
                                </div>
                                <div className='text-center pb-3'>
                                    Dont have an account?<Link to={"/user_signup"} className='text-blue-700 no-underline'> Sign Up</Link>
                                </div>
                                {/* Submit button */}
                                <div className='text-center'>
                                    <Link to={"/user_home"} type="submit" className="btn btn-primary btn-lg btn-block">
                                        Sign in
                                    </Link>
                                </div>
                            </form>
                        </div>
                </div>
            </div>
        </section>
    )
}

export default UserLogin