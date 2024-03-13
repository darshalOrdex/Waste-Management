import React, { useEffect } from 'react'
import image from "../../assets/images/garbage-truck-waste.png"
import { Link, useNavigate } from 'react-router-dom'

const DriverLogin : React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("authtoken"))
        {
            navigate("/driver_home")
        }
    },[])
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
                            <h2>Driver Login</h2>
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
                                {/* Submit button */}
                                <div className='text-center'>
                                    <Link to={"/driver_home"} type="submit" className="btn btn-primary btn-lg btn-block">
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

export default DriverLogin