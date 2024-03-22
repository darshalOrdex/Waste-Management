import axios from 'axios'
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const UserUpdateDetails: React.FC = () => {
    const [user, setUser] = useState({
        _id : "",
        name: "",
        email: "",
        password: "",
        phonenumber: "",
        city: "",
    })
    const fetchUser = async () => {
        await axios.get("http://localhost:5000/users/getuser", {
            headers: {
                "authtoken": localStorage.getItem("authtoken")
            }
        }).then(response => {setUser({
            _id : response.data._id,
            name: response.data.name,
            email: response.data.email,
            password: "",
            phonenumber: response.data.phonenumber,
            city: response.data.city,
        })})
    }
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setUser({...user,[e.target.name] : e.target.value})
    }
    const handleSubmit = async(e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(user);
        await axios.put(`http://localhost:5000/users/updateuser/${user._id}`,user,{
            headers: {
                "authtoken": localStorage.getItem("authtoken")
            }
        })
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchUser()
    }, [])
    return (
        <div className='main-body pt-10 min-h-screen'>
            <div className='container flex justify-between'>
                <h2 className='mb-4'>View / Update User Details</h2>
                <Link to={"/admin_home"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
            </div>
            <div className='container bg-white px-5'>
                <div className='pt-3'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                User's Name
                            </label>
                            <input
                                type="text"
                                name='name'
                                className="form-control"
                                id="name"
                                value={user.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                User's Email
                            </label>
                            <input
                                type="email"
                                name='email'
                                className="form-control"
                                id="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phonenumber" className="form-label">
                                User's Email
                            </label>
                            <input
                                type="text"
                                name='phonenumber'
                                className="form-control"
                                id="phonenumber"
                                value={user.phonenumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="city" className="form-label">
                                User's City
                            </label>
                            <input
                                type="text"
                                name='city'
                                className="form-control"
                                id="city"
                                value={user.city}
                                onChange={handleChange}
                            />
                        </div>
                        <button type='submit' className='btn btn-success w-full my-3'>Update User</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserUpdateDetails