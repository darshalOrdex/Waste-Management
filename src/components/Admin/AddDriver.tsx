import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom'
import Spinner from '../Common/Spinner';

const AddDriver: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [driverDetails, setDriverDetails] = useState({
        name: "",
        email: "",
        password: "",
        phonenumber: "",
        address: "",
        area: "",
        driverid: ""
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setDriverDetails({ ...driverDetails, [name]: value })
    }
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        await axios.post("http://localhost:5000/driver/create", driverDetails)
            .then(response => {
                console.log(response.data);
                if (response.data.success) {
                    setDriverDetails({
                        name: "",
                        email: "",
                        password: "",
                        phonenumber: "",
                        address: "",
                        area: "",
                        driverid: ""
                    })
                    setLoading(false);
                    toast.success('Driver Added Successfully', {
                        style: {
                            borderRadius: '10px',
                            background: '#333',
                            color: '#fff',
                            height: '100px',
                            padding: '0px 20px',
                        },
                    })
                }
            })
            .catch(err => {
                toast.error(err, {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        height: '100px',
                        padding: '0px 20px',
                    },
                })
            })
    }
    return (
        <>
            {loading && <Spinner />}
            <div className='main-body pt-10'>
                <Toaster
                    position="bottom-right"
                    reverseOrder={false}
                />
                <div className='container flex justify-between'>
                    <h2 className='mb-4'>Add Driver Details</h2>
                    <Link to={"/admin_home"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
                </div>
                <div className='container bg-white px-5'>
                    <div className='pt-4'>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Driver Name
                                </label>
                                <input
                                    type="text"
                                    name='name'
                                    className="form-control"
                                    id="name"
                                    value={driverDetails.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Create Driver Email
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    className="form-control"
                                    id="email"
                                    aria-describedby="emailHelp"
                                    value={driverDetails.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">
                                    Create Driver Password
                                </label>
                                <input
                                    type="text"
                                    name='password'
                                    className="form-control"
                                    id="password"
                                    value={driverDetails.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phonenumber" className="form-label">
                                    Driver Mobile Number
                                </label>
                                <input
                                    type="text"
                                    name='phonenumber'
                                    className="form-control"
                                    id="phonenumber"
                                    maxLength={10}
                                    value={driverDetails.phonenumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">
                                    Driver Address
                                </label>
                                <input
                                    name='address'
                                    className="form-control"
                                    id="address"
                                    type='text'
                                    value={driverDetails.address}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="area" className="form-label">
                                    Driver Area
                                </label>
                                <input
                                    type="text"
                                    name='area'
                                    className="form-control"
                                    id="area"
                                    value={driverDetails.area}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="driverid" className="form-label">
                                    Driver Id Number
                                </label>
                                <input
                                    name='driverid'
                                    className="form-control"
                                    id="driverid"
                                    maxLength={15}
                                    value={driverDetails.driverid}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type='submit' className='btn btn-success w-full my-3'>Add Driver</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddDriver