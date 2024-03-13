import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BinDetails } from '../../interfaces/BinDetails';

const UpdateBin : React.FC = () => {
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
                <h2 className='mb-4'>Update Driver</h2>
                <Link to={"/admin_home"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
            </div>
            <div className='container pb-10 min-h-screen'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto'>
                    {   bins.map((item : BinDetails,index : number) => {
                            return (
                                <div>
                                    <div key={index} className='bg-white w-full mb-4 py-3 ps-3'>
                                        <div>Name :- {item.name}</div>
                                        <div>Load Type :- {item.loadtype}</div>
                                        <div>Locality :- {item.locality}</div>
                                        <div>City :- {item.city}</div>
                                    </div>
                                    <a href={`https://maps.google.com/?q=${item.latitude},${item.longitude}`} target='_blank' className='btn btn-primary'>Map View</a>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default UpdateBin