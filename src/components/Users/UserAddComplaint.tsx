import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BinDetails } from '../../interfaces/BinDetails';
import { Link } from 'react-router-dom';

const UserAddComplaint : React.FC = () => {
    const [bins, setBins] = useState<BinDetails[]>([]);
    const fetchBins = async() => {
        await axios.get("http://localhost:5000/bin/getbins")
        .then(response => {setBins(response.data.bins)})
        .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchBins();
    },[])
    return (
        <div>
            <div className='container flex justify-between mt-3'>
                <h2 className='mb-4'>Generate Complaint</h2>
                <Link to={"/user_home"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
            </div>
            <div className='container pb-10 min-h-screen'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto'>
                    {   bins.map((item : BinDetails,index : number) => {
                            const linkTo = `/user_complaint?data=${encodeURIComponent(JSON.stringify(item))}`
                            return (
                                <div key={index}>
                                    <div className='bg-white w-full mb-4 py-3 ps-3'>
                                        <div>Name :- {item.name}</div>
                                        <div>Load Type :- {item.loadtype}</div>
                                        <div>Locality :- {item.locality}</div>
                                        <div>City :- {item.city}</div>
                                    </div>
                                    <div className='flex flex-row gap-3'>
                                        <a href={`https://maps.google.com/?q=${item.latitude},${item.longitude}`} target='_blank' className='btn btn-primary'>Map View</a>
                                        <Link to={linkTo} className='btn btn-primary'>Generate Complaint</Link>
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

export default UserAddComplaint