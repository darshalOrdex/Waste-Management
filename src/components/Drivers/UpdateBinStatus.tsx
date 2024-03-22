import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
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
        <div>
            <h1 className='text-center py-3'>Update Bin Status</h1>
            <div className='container pb-10 min-h-screen'>
                <div className='bg-white w-full mb-4 py-3 ps-3'>
                    <div className="dropdown">
                        <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {complaint?.status}
                        </a>
                        <ul className="dropdown-menu">
                            <li><div className="dropdown-item" onClick={() => handleClick("Completed")}>Completed</div></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateBinStatus