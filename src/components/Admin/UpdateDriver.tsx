import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { DriverDetails } from '../../interfaces/DriverDetails';
import { Link } from 'react-router-dom';

const UpdateDriver: React.FC = () => {
    const [drivers, setDrivers] = useState<DriverDetails[]>([]);
    const [id, setId] = useState();
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
    const getDriver = async () => {
        await axios.get("http://localhost:5000/driver/getdrivers")
            .then(response => { setDrivers(response.data.drivers) })
            .catch(err => console.log(err))
    }
    const onUpdate = (item: any) => {
        setId(item._id)
        setDriverDetails(item)
    }
    const handleUpdate = async () => {
        await axios.put(`http://localhost:5000/driver/updatedriver/${id}`, driverDetails)
            .then(response => { console.log(response.data) })
    }
    useEffect(() => {
        getDriver();
    }, [])
    return (
        <div>
            <div className='container flex justify-between mt-3'>
                <h2 className='mb-4'>Update Driver</h2>
                <Link to={"/admin_home"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
            </div>
            <div className='container pb-10 min-h-screen'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto'>
                    {drivers.map((item: DriverDetails, index: number) => {
                        return (
                            <div key={index}>
                                <div className='bg-white w-full mb-4 py-3 ps-3'>
                                    <div>ID :- {item.driverid}</div>
                                    <div>Name :- {item.name}</div>
                                    <div>Email :- {item.email}</div>
                                    <div>Phone Number :- {item.phonenumber}</div>
                                </div>
                                <button type="button" className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { onUpdate(item) }}>
                                    Launch demo modal
                                </button>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Modal title
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
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
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateDriver