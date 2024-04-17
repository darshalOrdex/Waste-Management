import axios from 'axios';
import React, { FormEvent, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { DriverDetails } from '../../interfaces/DriverDetails';

export const AssignDriver: React.FC = () => {
    const params = useParams();
    const [email, setEmail] = React.useState("");
    const [driver, setDriver] = React.useState<DriverDetails[]>([]);
    useEffect(() => {
        axios.get(`http://localhost:5000/driver/getdriverlocality/${params.id}`).then(response => setDriver(response.data)).catch(err => console.log(err))
    },[])
    const handleSubmit = async(e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/complaint/assigndriver/${params.id}`,{driveremail : email})
        .then(response => {
            console.log(response.data)
            alert("Driver Assigned")
        }).catch(err => console.log(err))
    }
    return (
        <div className='main-body pt-10 min-h-screen'>
            <div className='container flex justify-between'>
                <h2 className='mb-4'>Assign Driver</h2>
                <Link to={"/view_all_complaints"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
            </div>
            <div className='container bg-white px-5'>
                <div className='pt-4'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Assign Driver Email
                            </label>
                            <input
                                type="email"
                                name='email'
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button type='submit' className='btn btn-success w-full my-3'>Add Driver Email</button>
                    </form>
                </div>
            </div>
            <div className='container mt-3'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                { driver.map.length === 0 && <div className='bg-white w-full mb-4 py-3 ps-3'>No Driver Found</div>}
                { driver.map((item : DriverDetails,index : number) => (
                    <div key={index} className='bg-white w-full mb-4 py-3 ps-3'>
                        <div>Name :- {item.name}</div>
                        <div>Email :- {item.email}</div>
                        <div>Phone Number :- {item.phonenumber}</div>
                    </div>
                    ))
                }
                </div>
            </div>
        </div>
    )
}