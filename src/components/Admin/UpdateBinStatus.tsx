import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ComplaintDetails } from '../../interfaces/ComplaintDetails';

const UpdateBinStatus : React.FC = () => {
    const [complaint, setComplaint] = useState<ComplaintDetails>();
    const params = useParams();
    const navigate = useNavigate();
    const getComplaint = async() => {
        await axios.get(`http://localhost:5000/complaint/getcomplaint/${params.id}`)
        .then(response => setComplaint(response.data))
    }
    const handleClick = async(status : string) => {
        await axios.put(`http://localhost:5000/complaint/updatecomplaint/${params.id}`,{status : status})
        .then(response => {console.log(response.data); alert('Status Updated!'); navigate("/driver_home") })
    }
    useEffect(() => {
        getComplaint();
    },[])
    return (
        <div className='container'>
            <div className='d-flex justify-content-between align-items-center'>
                <h1 className='text-center py-3'>Update Bin Status</h1>
                <Link to="/driver_home"><button className='btn btn-primary'>Back</button></Link>
            </div>
            <div className='pb-10 min-h-screen'>
                <div className='bg-white w-full mb-4 py-3 ps-3 d-flex flex-column justify-content-center align-items-center'>
                    <div className='my-4 flex flex-col md:flex-row gap-5'>
                        <div>
                            <h2>Complaint Image</h2>
                            <img src={complaint?.complaintImage} width={250} height={300} alt='image'/>
                        </div>
                        <div>
                            <h2>Driver Image</h2>
                            {   complaint?.driverImage ?
                                <img src={complaint?.driverImage} width={250} height={300} alt='image'/>
                                :
                                <div>No Driver Image Uploaded</div>
                            }
                        </div>
                    </div>
                    <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {complaint?.status}
                        </a>
                        <ul className="dropdown-menu">
                            <li><div className={complaint?.driverImage ? `dropdown-item` : `dropdown-item disabled`} onClick={() => handleClick("Completed")}>Completed</div></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateBinStatus