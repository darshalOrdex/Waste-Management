import React, { FormEvent, useEffect, useState } from 'react'
import { storage } from "../../firebase/firebase"
import { Link } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Spinner from '../Common/Spinner';

const UserAddImageComplaint: React.FC = () => {
    const [complaint, setComplaint] = useState<string>("");
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);
    const [locality, setLocality] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [imageUpload, setImageUpload] = useState<File | undefined>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        })
        if (latitude !== 0 && longitude !== 0) {
            console.log(latitude, longitude);
        } else {
            console.log("Location Not Found");
        }
    }, [latitude, longitude])
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (imageUpload) {
            const imageRef = ref(storage, `${Date.now}`)
            uploadBytes(imageRef, imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {
                    console.log(url)
                    const axiosConfig = {
                        headers: {
                            'authtoken': localStorage.getItem("authtoken")
                        }
                    }
                    const data = {
                        complaint: complaint,
                        latitude: latitude,
                        longitude: longitude,
                        locality: locality,
                        city: city,
                        complaintImage: url
                    }
                    await axios.post("http://localhost:5000/complaint/userimagecomplaint", data, axiosConfig).then((response) => {
                        setLoading(false);
                        toast.success('Complaint Added Successfully!', {
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                                height: '100px',
                                padding: '0px 20px',
                            },
                        })
                        setComplaint("");
                        setLatitude(0);
                        setLongitude(0);
                        setLocality("");
                        setCity("");
                        setImageUpload(undefined);
                    }).catch((error) => {
                        toast.error(error, {
                            style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                                height: '100px',
                                padding: '0px 20px',
                            },
                        })
                    })
                })
            })
        }
    }
    return (
        <div className='pt-10'>
            {loading && <Spinner />}
            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />
            <div className='container flex justify-between'>
                <h2 className='mb-4'>Add Custom Complaint</h2>
                <Link to={"/user_home"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
            </div>
            <div className='container bg-white px-5'>
                <div className='pt-4'>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="complaint" className="form-label">
                                Complaint
                            </label>
                            <input
                                type="text"
                                name='complaint'
                                className="form-control"
                                id="complaint"
                                value={complaint}
                                onChange={(e) => setComplaint(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="latitude" className="form-label">
                                Latitude
                            </label>
                            <input
                                type="number"
                                name='latitude'
                                className="form-control"
                                id="latitude"
                                value={latitude}
                                onChange={(e) => setLatitude(Number(e.target.value))}
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
                                value={longitude}
                                onChange={(e) => setLongitude(Number(e.target.value))}
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
                                value={locality}
                                onChange={(e) => setLocality(e.target.value)}
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
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Upload Image
                            </label>
                            <input
                                name='image'
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const files = e.target.files;
                                    if (files && files.length > 0) {
                                        setImageUpload(files[0]);
                                    }
                                }}
                                className="form-control"
                                id="image"
                            />
                        </div>
                        <button type='submit' className='btn btn-success w-full my-3'>Add Complaint</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserAddImageComplaint