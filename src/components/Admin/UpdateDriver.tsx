import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DriverDetails } from '../../interfaces/DriverDetails';

const UpdateDriver : React.FC = () => {
    const [drivers, setDrivers] = useState<DriverDetails[]>([]);
    const getDriver = async() => {
        await axios.get("http://localhost:5000/driver/getdrivers")
        .then(response => {setDrivers(response.data.drivers)})
        .catch(err => console.log(err))
    }
    useEffect(() => {
        getDriver();
    },[])
    return (
        <div>
            <h1 className='text-center py-3'>Update Driver</h1>
            <div className='container pb-10 min-h-screen'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto'>
                    {   drivers.map((item : DriverDetails) => {
                            return (
                                <div className='bg-white w-full mb-4 py-3 ps-3'>
                                    <div>ID :- {item.driverid}</div>
                                    <div>Name :- {item.drivername}</div>
                                    <div>Email :- {item.driveremail}</div>
                                    <div>Phone Number :- {item.drivernumber}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default UpdateDriver