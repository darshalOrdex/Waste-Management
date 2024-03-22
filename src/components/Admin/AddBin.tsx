import React, { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { BinDetails } from '../../interfaces/BinDetails';
import axios from 'axios';
import MapComponent from '../Common/MapComponent';

const AddBin: React.FC = () => {
    const [binDetails, setBinDetails] = useState<BinDetails>({
        name: '',
        locality: '',
        landmark: '',
        city: '',
        loadtype: '',
        driveremail: '',
        latitude: 0, 
        longitude: 0
    });
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBinDetails({ ...binDetails, [name]: value });
    }
    const handleItemClick = (value: string) => {
        setBinDetails({ ...binDetails, loadtype: value });
    };
    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/bin/addbin",binDetails)
        .then(response => {
            console.log(response);
            setBinDetails({
                name: "",
                locality: "",
                landmark: "",
                city: "",
                loadtype: "",
                driveremail: ' ',
                latitude: 0, 
                longitude: 0
            });
            alert('Bin Created!');
        })
        .catch(err => console.log(err))
    }
    const handleMapClick = (latitude: number, longitude: number) => {
        setBinDetails({...binDetails,latitude : latitude,longitude : longitude})
    };
    return (
        <div className='main-body pt-10'>
            <div className='container flex justify-between'>
                <h2 className='mb-4'>Add Bin Details</h2>
                <Link to={"/admin_home"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
            </div>
            <div className='container bg-white px-5'>
                <div className='pt-4 grid grid-cols-2 gap-4'>
                    <div>
                        <form onSubmit={handleSubmit}>
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
                            <div className="mb-3">
                                <label htmlFor="latitude" className="form-label">
                                    Lattitude
                                </label>
                                <input
                                    type="number"
                                    name='latitude'
                                    className="form-control"
                                    id="latitude"
                                    value={binDetails.latitude}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="longitude" className="form-label">
                                    Longitude
                                </label>
                                <input
                                    type="number"
                                    name='longitude'
                                    className="form-control"
                                    id="longitude"
                                    value={binDetails.longitude}
                                />
                            </div>
                            <button type='submit' className='btn btn-success w-full my-3'>Add Bin</button>
                        </form>
                    </div>
                    <div>
                        <MapComponent onMapClick={handleMapClick} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddBin