import React, { FormEvent, useState } from 'react'
import { storage } from '../../firebase/firebase'
import { Link, useParams } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import axios from 'axios';

const UploadProofBin: React.FC = () => {
    const params = useParams();
    const [imageUpload, setImageUpload] = useState<File | undefined>();
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (imageUpload) {
            const imageRef = ref(storage, `${Date.now()}`);
            uploadBytes(imageRef, imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then(async (url) => {
                    console.log(url)
                    const data = {
                        driverImage: url
                    }
                    await axios.put(`http://localhost:5000/complaint/updatecomplaintimage/${params.id}`, data).then((response) => {
                        console.log(response.data)
                        alert("Complaint Updated Successfully");
                        setImageUpload(undefined);
                    }).catch((error) => {
                        console.log(error)
                    })
                })
            })
        }
    }
    return (
        <div className='main-body pt-10 min-h-screen'>
            <div className='container flex justify-between'>
                <h2 className='mb-4'>Upload Cleaning Proof</h2>
                <Link to={"/driver_home"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
            </div>
            <div className='container bg-white px-5'>
                <div className='pt-4'>
                    <form onSubmit={handleSubmit}>
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

export default UploadProofBin