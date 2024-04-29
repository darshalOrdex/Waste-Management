import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ComplaintDetails } from '../../interfaces/ComplaintDetails';
import Spinner from '../Common/Spinner';
import toast, { Toaster } from 'react-hot-toast';

const UpdateBinStatus: React.FC = () => {
    const [complaint, setComplaint] = useState<ComplaintDetails>();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const getComplaint = async () => {
        setLoading(true);
        await axios.get(`http://localhost:5000/complaint/getcomplaint/${params.id}`)
            .then(response => {setComplaint(response.data); setLoading(false)})
    }
    const handleClick = async (status: string) => {
        setLoading(true);
        await axios.put(`http://localhost:5000/complaint/updatecomplaint/${params.id}`, { status: status })
            .then(response => {
                setLoading(false);
                toast.success('Status Updated!', {
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                        height: '100px',
                        padding: '0px 20px',
                    },
                });
                setTimeout(() => {
                    navigate("/driver_home")
                }, 1000);
            })
    }
    useEffect(() => {
        getComplaint();
    }, [])
    return (
        <>
        {loading && <Spinner />}
        <div className='container'>
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <div className='d-flex justify-content-between align-items-center'>
                <h1 className='text-center py-3'>Update Bin Status</h1>
                <Link to="/view_all_complaints"><button className='btn btn-primary'>Back</button></Link>
            </div>
            <div className='pb-10'>
                <div className='bg-white w-full mb-4 py-3 ps-3 d-flex flex-column justify-content-center align-items-center'>
                    <div className='my-4 flex flex-col md:flex-row gap-5'>
                        <div>
                            <h2>Complaint Image</h2>
                            <img src={complaint?.complaintImage} width={250} height={300} alt='image' />
                        </div>
                        <div>
                            <h2>Driver Image</h2>
                            {complaint?.driverImage ?
                                <img src={complaint?.driverImage} width={250} height={300} alt='image' />
                                :
                                <div>No Driver Image Uploaded</div>
                            }
                        </div>
                    </div>
                    {   complaint?.driverImage ?
                        <div className="dropdown">
                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {complaint?.status}
                            </a>
                            <ul className="dropdown-menu">
                                <li><div className={complaint?.driverImage ? `dropdown-item` : `dropdown-item disabled`} onClick={() => handleClick("Completed")}>Completed</div></li>
                            </ul>
                        </div> 
                        :
                        <div className='text-center'>
                            <h2>Contact the Driver</h2>
                            <h3>{complaint?.driveremail}</h3>
                        </div>
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default UpdateBinStatus