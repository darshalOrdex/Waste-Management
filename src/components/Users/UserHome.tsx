import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import complaint from '../../assets/images/complaint-6.jpg';
import user from '../../assets/images/png-transparent-user.png';
import { useUrlShortener } from '../../context/VerifyUserContext';

const UserHome : React.FC = () => {
    const { verifyUser } = useUrlShortener();
    useEffect(() => {
        verifyUser();
    },[])
    return (
        <div className='min-h-screen'>
            <h1 className='text-center py-3'>User Home</h1>
            <div className='container pb-10'>
                <div className='mx-3 lg:mx-20'>
                    <Link to={"/user_add_complaint"} className='bg-white w-full mb-4 py-3 flex no-underline text-black justify-evenly gap-5'> 
                        <img src={complaint} className='' height={100} width={100}/>
                        <span className='my-auto text-2xl'>Generate Bin Complaint</span>
                    </Link>
                    <Link to={"/user_view_complaint"} className='bg-white w-full mb-4 py-3 flex no-underline text-black justify-evenly gap-5'> 
                        <img src={complaint} className='' height={100} width={100}/>
                        <span className='my-auto text-2xl'>My Complaints</span>
                    </Link>
                    <Link to={"/user_image_complaint"} className='bg-white w-full mb-4 py-3 flex no-underline text-black justify-evenly gap-5'> 
                        <img src={user} className='' height={100} width={100}/>
                        <span className='my-auto text-2xl'>Generate Image Complaint</span>
                    </Link>     
                </div>
            </div>
        </div>
    )
}

export default UserHome