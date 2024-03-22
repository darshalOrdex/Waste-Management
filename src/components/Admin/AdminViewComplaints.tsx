import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ComplaintDetails } from '../../interfaces/ComplaintDetails';

const AdminViewComplaints : React.FC = () => {
    const [complaints, setComplaints] = useState<ComplaintDetails[]>([]);
    const fetchAllComplaints = async() =>{
        await axios.get("http://localhost:5000/complaint/getallcomplaints")
        .then(response => setComplaints(response.data))
    }
    useEffect(() => {
        fetchAllComplaints();
    })
    return (
        <div>
            <div className='container flex justify-between mt-3'>
                <h2 className='mb-4'>View All Complaints</h2>
                <Link to={"/admin_home"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
            </div>
            <div className='container pb-10 min-h-screen'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto'>
                    {   complaints.map((item : ComplaintDetails,index : number) => (
                            <div key={index}>
                            <div className='bg-white w-full mb-4 py-3 ps-3'>
                                <div>Name :- {item.name}</div>
                                <div>Locality :- {item.locality}</div>
                                <div>City :- {item.city}</div>
                            </div>
                        </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminViewComplaints