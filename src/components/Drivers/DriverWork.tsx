import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../Common/Spinner';

const DriverWork: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [complaints, setComplaints] = useState([]);
    const fetchComplaints = async () => {
        setLoading(true);
        await axios.get("http://localhost:5000/complaint/getcomplaints", {
            headers: {
                'authtoken': localStorage.getItem("authtoken")
            }
        }).then(response => {
            setComplaints(response.data)
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchComplaints();
    }, [])
    return (
        <div>
            {loading ? <Spinner /> : null}
            <div className='container flex justify-between mt-3'>
                <h2 className='mb-4'>Driver Work</h2>
                <Link to={"/driver_home"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
            </div>
            <div className='container pb-10'>
                {complaints.length === 0 ? <h1 className='text-center'>No Work Available</h1> :
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto'>
                        {complaints.map((item: any, index: number) => (
                            <div>
                                <div key={index} className='bg-white w-full mb-4 py-3 ps-3'>
                                    {item.name && <div>Name :- {item.name}</div>}
                                    <div>Complaint :- {item.complaint}</div>
                                    <div>Locality :- {item.locality}</div>
                                    <div>City :- {item.city}</div>
                                    <div>Status :- {item.status}</div>
                                </div>
                                <a href={`https://maps.google.com/?q=${item.latitude},${item.longitude}`} target='_blank' className='btn btn-primary'>Map View</a>
                                {item.status === "Pending" &&
                                    <Link to={`/driver_upload/${item._id}`}>
                                        <button disabled={item.driverImage} className='btn btn-primary mx-3'>
                                            {item.driverImage ? "Work Done" : "Update Status"}
                                        </button>
                                    </Link>
                                }
                            </div>
                        ))
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default DriverWork