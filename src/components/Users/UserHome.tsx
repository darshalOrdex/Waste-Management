import React from 'react'
import { Link } from 'react-router-dom'
import complaint from '../../assets/images/complaint-6.jpg';
import user from '../../assets/images/png-transparent-user.png';

const UserHome : React.FC = () => {
    return (
        <div>
            <h1 className='text-center py-3'>User Home</h1>
            <div className='container pb-10'>
                <div className='mx-20'>
                    <Link to={"/user_add_complaint"} className='bg-white w-full mb-4 py-3 flex no-underline text-black justify-evenly'> 
                        <img src={complaint} className='' height={100} width={100}/>
                        <span className='my-auto text-2xl'>Generate Complaint</span>
                    </Link>
                    <Link to={"/user_view_complaint"} className='bg-white w-full mb-4 py-3 flex no-underline text-black justify-evenly'> 
                        <img src={complaint} className='' height={100} width={100}/>
                        <span className='my-auto text-2xl'>My Complaints</span>
                    </Link>
                    <Link to={"/user_profile_view"} className='bg-white w-full mb-4 py-3 flex no-underline text-black justify-evenly'> 
                        <img src={user} className='' height={100} width={100}/>
                        <span className='my-auto text-2xl'>My Profile</span>
                    </Link>      
                </div>
            </div>
        </div>
    )
}

export default UserHome