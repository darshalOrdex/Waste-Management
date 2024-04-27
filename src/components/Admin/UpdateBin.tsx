import axios from 'axios'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BinDetails } from '../../interfaces/BinDetails';
import Spinner from '../Common/Spinner';

const UpdateBin: React.FC = () => {
    const [bins, setBins] = useState<BinDetails[]>([]);
    const [id, setId] = useState();
    const [loading, setLoading] = useState(false);
    const [binDetails, setBinDetails] = useState({
        name: '',
        locality: '',
        landmark: '',
        city: '',
        loadtype: '',
        driveremail: '',
    });
    const onUpdate = (bin: any) => {
        setId(bin._id);
        setBinDetails(bin);
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBinDetails({ ...binDetails, [name]: value });
    }
    const handleItemClick = (value: string) => {
        setBinDetails({ ...binDetails, loadtype: value });
    };
    const handleUpdate = async () => {
        await axios.put(`http://localhost:5000/bin/updatedetails/${id}`, binDetails)
            .then(response => { console.log(response.data)})
    }
    const fetchBins = async () => {
        setLoading(true);
        await axios.get("http://localhost:5000/bin/getbins")
            .then(response => { setBins(response.data.bins); setLoading(false) })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchBins();
    }, [])
    return (
        <div>
            {loading && <Spinner />}
            <div className='container flex justify-between mt-3'>
                <h2 className='mb-4'>Update Driver</h2>
                <Link to={"/admin_home"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
            </div>
            <div className='container pb-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto'>
                    {bins.map((item: BinDetails, index: number) => {
                        return (
                            <div key={index}>
                                <div className='bg-white w-full mb-4 py-3 ps-3'>
                                    <div>Name :- {item.name}</div>
                                    <div>Load Type :- {item.loadtype}</div>
                                    <div>Locality :- {item.locality}</div>
                                    <div>City :- {item.city}</div>
                                </div>
                                <a href={`https://maps.google.com/?q=${item.latitude},${item.longitude}`} target='_blank' className='btn btn-primary'>Map View</a>
                                <button type="button" className="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => { onUpdate(item) }}>
                                    Update Details
                                </button>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
            <div
                className="modal fade"
                id="exampleModal"
                tabIndex={-1}
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                Modal title
                            </h1>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Create Bin
                                </label>
                                <input
                                    type="text"
                                    name='name'
                                    className="form-control"
                                    id="name"
                                    value={binDetails.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="locality" className="form-label">
                                    Locality
                                </label>
                                <input
                                    type="text"
                                    name='locality'
                                    className="form-control"
                                    id="locality"
                                    value={binDetails.locality}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="landmark" className="form-label">
                                    Landmank
                                </label>
                                <input
                                    type="text"
                                    name='landmark'
                                    className="form-control"
                                    id="landmark"
                                    value={binDetails.landmark}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="city" className="form-label">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name='city'
                                    className="form-control"
                                    id="city"
                                    value={binDetails.city}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="driveremail">Driver Email:</label>
                                <input id='driveremail' name='driveremail' type="email" className="form-control my-2" value={binDetails.driveremail} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="loadtype" className="form-label">
                                    Load Type
                                </label>
                                <br />
                                <div className="dropdown">
                                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {binDetails.loadtype || 'Load Type'}
                                    </a>
                                    <ul className="dropdown-menu">
                                        <li><div className="dropdown-item" onClick={() => handleItemClick('Small')}>Small</div></li>
                                        <li><div className="dropdown-item" onClick={() => handleItemClick('Medium')}>Medium</div></li>
                                        <li><div className="dropdown-item" onClick={() => handleItemClick('Large')}>Large</div></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default UpdateBin