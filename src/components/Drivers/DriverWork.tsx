import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const DriverWork : React.FC = () => {
    const [complaints, setComplaints] = useState([]);
    const fetchComplaints = async() => {
        await axios.get("http://localhost:5000/complaint/getcomplaints", {
            headers: {
                'authtoken': localStorage.getItem("authtoken")
            }
        }).then(response => setComplaints(response.data))
    }
    useEffect(() => {
        fetchComplaints();
    },[])
    return (
        <div>
            <h1 className='text-center py-3'>Driver Work</h1>
            <div className='container pb-10 min-h-screen'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto'> 
                {   complaints.map((item : any,index : number) => (
                        <div>
                            <div key={index} className='bg-white w-full mb-4 py-3 ps-3'>
                                {item.name && <div>Name :- {item.name}</div>}
                                <div>Complaint :- {item.complaint}</div>
                                <div>Locality :- {item.locality}</div>
                                <div>City :- {item.city}</div>
                                <div>Status :- {item.status}</div>
                            </div>
                            <a href={`https://maps.google.com/?q=${item.latitude},${item.longitude}`} target='_blank' className='btn btn-primary'>Map View</a>
                            {   item.status === "Pending" && 
                                <Link to={`/driver_upload/${item._id}`} className='btn btn-primary mx-3'>Update Status</Link>
                            }
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}

export default DriverWork