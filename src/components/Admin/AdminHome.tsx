import React, { useEffect } from 'react'
import bin from "../../assets/images/recycle-grabage-bin.jpg";
import driver from "../../assets/images/Truck-driver.jpg";
import complaint from '../../assets/images/complaint-6.jpg';
import user from '../../assets/images/png-transparent-user.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminHome : React.FC = () => {
    const navigate = useNavigate();
    const verifyAdmin = async() => {
        await axios.get("http://localhost:5000/verify/verifyadmin", {
            headers: {
                "authtoken": localStorage.getItem("authtoken")
            }
        })
            .then(response => {
                if(response.data !== "Admin")
                {
                    localStorage.removeItem("authtoken");
                    navigate("/");
                }
            })
            .catch(err => console.log(err));
    }
    useEffect(() => {
        verifyAdmin();
    },[])
    return (
        <div className='main-body'>
            <h1 className='text-center py-3'>Admin Home</h1>
            <div className='container pb-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <Link to={"/admin_add_bin"} className='bg-white w-full mb-4 py-3 flex no-underline text-black'> 
                        <img src={bin} className='ms-4 md:ms-16' height={100} width={100}/>
                        <span className='my-auto text-2xl mx-auto'>Add Bin</span>
                    </Link>
                    <Link to={"/add_driver"} className='bg-white w-full mb-4 py-3 flex no-underline text-black'> 
                        <img src={bin} className='ms-4 md:ms-16' height={100} width={100}/>
                        <span className='my-auto text-2xl mx-auto'>Update Bin</span>
                    </Link>
                    <Link to={"/admin_add_driver"} className='bg-white w-full mb-4 py-3 flex no-underline text-black'> 
                        <img src={driver} className='ms-4 md:ms-16' height={100} width={100}/>
                        <span className='my-auto text-2xl mx-auto'>Add Driver</span>
                    </Link>
                    <Link to={"/admin_update_driver"} className='bg-white w-full mb-4 py-3 flex no-underline text-black'> 
                        <img src={driver} className='ms-4 md:ms-16' height={100} width={100}/>
                        <span className='my-auto text-2xl mx-auto'>Update Driver</span>
                    </Link>
                    <div className='bg-white w-full mb-4 py-3 flex no-underline text-black'> 
                        <img src={complaint} className='ms-4 md:ms-16' height={100} width={100}/>
                        <span className='my-auto text-2xl mx-auto'>View Complaints</span>
                    </div>
                    <Link to={"/add_driver"} className='bg-white w-full mb-4 py-3 flex no-underline text-black'> 
                        <img src={user} className='ms-4 md:ms-16' height={100} width={100}/>
                        <span className='my-auto text-2xl mx-auto'>All Users</span>
                    </Link>
                </div>
            </div>  
        </div>
    )
}

export default AdminHome