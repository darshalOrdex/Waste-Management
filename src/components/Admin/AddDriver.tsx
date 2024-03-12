import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'

const AddDriver : React.FC = () => {
    const [driverDetails, setDriverDetails] = useState({
        drivername: "",
        driveremail: "",
        driverpassword: "",
        drivernumber: "",
        driveraddress: "",
        driverarea: "",
        driverid: ""
    });
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setDriverDetails({...driverDetails,[name] : value})
    }   
    const handleSubmit = async(e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/driver/create",driverDetails)
        .then(response => {
            console.log(response.data);
            if(response.data.success)
            {
                setDriverDetails({
                    drivername: "",
                    driveremail: "",
                    driverpassword: "",
                    drivernumber: "",
                    driveraddress: "",
                    driverarea: "",
                    driverid: ""
                })
                alert("Driver Created")
            }
        })
        .catch(err => {console.log(err)})
    }
    return (
        <div className='main-body pt-10'>
            <div className='container flex justify-between'>
                <h2 className='mb-4'>Add Driver Details</h2>
                <Link to={"/admin_home"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
            </div>
            <div className='container bg-white px-5'>
                <div className='pt-4'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="drivername" className="form-label">
                                Driver Name
                            </label>
                            <input
                                type="text"
                                name='drivername'
                                className="form-control"
                                id="drivername"
                                value={driverDetails.drivername}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="driveremail" className="form-label">
                                Create Driver Email
                            </label>
                            <input
                                type="email"
                                name='driveremail'
                                className="form-control"
                                id="driveremail"
                                aria-describedby="emailHelp"
                                value={driverDetails.driveremail}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="driverpassword" className="form-label">
                                Create Driver Password
                            </label>
                            <input
                                type="text"
                                name='driverpassword'
                                className="form-control"
                                id="driverpassword"
                                value={driverDetails.driverpassword}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="drivernumber" className="form-label">
                                Driver Mobile Number
                            </label>
                            <input
                                type="text"
                                name='drivernumber'
                                className="form-control"
                                id="drivernumber"
                                maxLength={10}
                                value={driverDetails.drivernumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="driveraddress" className="form-label">
                                Driver Address
                            </label>
                            <input
                                name='driveraddress'
                                className="form-control"
                                id="driveraddress"
                                type='text'
                                value={driverDetails.driveraddress}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="driverarea" className="form-label">
                                Driver Area
                            </label>
                            <input
                                type="text"
                                name='driverarea'
                                className="form-control"
                                id="driverarea"
                                value={driverDetails.driverarea}
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
    )
}

export default AddDriver