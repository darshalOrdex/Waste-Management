import axios from 'axios';
import React, { FormEvent, useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';

const AddComplaint: React.FC = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const rawData = searchParams.get('data');
    const [complaint, setComplaint] = useState("");
    const handleSubmit = async(e : FormEvent<HTMLFormElement>) => {
        e.preventDefault() 
        if (rawData) {
            const data: any = JSON.parse(decodeURIComponent(rawData));
            const axiosConfig = {
                headers: {
                  'authtoken': localStorage.getItem("authtoken")
                }
            };
            await axios.post("http://localhost:5000/complaint/generatecomplaint",{ 
                complaint : complaint, 
                name : data.name , 
                locality : data.locality, 
                landmark : data.landmark, 
                city : data.city, 
                driveremail : data.driveremail, 
                latitude : data.latitude, 
                longitude : data.longitude
            },axiosConfig)
            .then(response => console.log(response.data))
        }
    }
    return (
        <div className='min-h-screen pt-10'>
            <div className='container flex justify-between'>
                <h2 className='mb-4'>Complaint</h2>
            </div>
            <div className='container bg-white px-5 py-4'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Complaint
                        </label>
                        <input
                            type="text"
                            name='name'
                            className="form-control"
                            id="name"
                            value={complaint}
                            onChange={e => setComplaint(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-success w-full my-3'>Add Bin</button>
                </form>
            </div>
        </div>
    )
}

export default AddComplaint