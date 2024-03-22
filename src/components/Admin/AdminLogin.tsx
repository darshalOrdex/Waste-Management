import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import image from "../../assets/images/garbage-truck-waste.png"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin : React.FC = () => {
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("authtoken"))
        {
            navigate("/admin_home")
        }
    },[])
    const [credentials, setCredentials] = useState({
        email: "",
        password:""
    });
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setCredentials({...credentials,[name] : value})
    }   
    const handleSubmit = async(e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/admin/login",credentials)
        .then(response => {
            console.log(response.data);
            if(response.data.success)
            {
                alert('Successfully Logged In!');
                localStorage.setItem('authtoken', response.data.authtoken);
                setCredentials({
                    email: "",
                    password: ""
                })
                navigate("/admin_home");
            }
        })
        .catch(err => {alert(err.response.data.error)})
    }
    return (
        <div className="main-body">
            <section className="min-h-screen">
                <div className="container py-5">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img
                                src={image}
                                className="img-fluid"
                                alt="Phone image"
                            />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h2>Admin Login</h2>
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
                                        required
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
                                        required
                                    />
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
        </div>
    )
}

export default AdminLogin