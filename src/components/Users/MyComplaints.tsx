import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ComplaintDetails } from '../../interfaces/ComplaintDetails';

const MyComplaints : React.FC = () => {
    const [complaints,setComplaints] = useState<ComplaintDetails[]>([]);
    useEffect(() => {
        getData()
    },[])
    const getData = async() => {
        const axiosConfig = {
            headers: {
              'authtoken': localStorage.getItem("authtoken")
            }
        };
        await axios.get("http://localhost:5000/complaint/getcomplaints",axiosConfig)
        .then(response => setComplaints(response.data.complaints))
    }
    return (
        <div>
            <div className='container flex justify-between mt-3'>
                <h2 className='mb-4'>View Complaints</h2>
                <Link to={"/user_home"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
            </div>
            <div className='container pb-10 min-h-screen'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto'>
                    {   complaints.map((item : ComplaintDetails,index : number) => {
                            return (
                                <div>
                                    <div key={index} className='bg-white w-full mb-4 py-3 ps-3'>
                                        <div>Bin Name :- {item.name}</div>
                                        <div>Complaint :- {item.complaint}</div>
                                        <div>Locality :- {item.locality}</div>
                                        <div>Status :- {item.status}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default MyComplaints