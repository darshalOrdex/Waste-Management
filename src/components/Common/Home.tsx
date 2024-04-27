import React, { useEffect } from 'react'
import second from "../../assets/images/homeimg.jpg"
import { Link } from 'react-router-dom'
import { useUrlShortener } from '../../context/VerifyUserContext';

const Home : React.FC = () => {
    const { verifyUser } = useUrlShortener();
    useEffect(() => {
        verifyUser();
    },[])
    return (
        <div>
            <div className='container pt-3 pb-5'>
                <img src={second} className='h-[55vh] w-full xl:w-[65vw] mx-auto'/>
                <div className='grid grid-cols-3 md:grid-cols-3 text-center mt-5 gap-2 md:gap-0'>
                    <div>
                        <Link to="/admin_login"><button className='btn btn-primary'>Login As Admin</button></Link>
                    </div>
                    <div>
                        <Link to="/driver_login"><button className='btn btn-primary'>Login As Driver</button></Link>
                    </div>
                    <div>
                        <Link to="/user_login"><button className='btn btn-primary'>Login As User</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home