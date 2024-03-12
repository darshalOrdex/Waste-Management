import React from 'react'
import { Link } from 'react-router-dom'
import route from "../../assets/images/route.png"

const DriverHome : React.FC = () => {
    return (
        <div>
            <h1 className='text-center py-3'>Driver Home</h1>
            <div className='container pb-10 min-h-screen'>
                <Link to={"/driver_work"} className='bg-white w-full mb-4 py-2 flex no-underline text-black justify-evenly'> 
                    <img src={route} className='' height={100} width={150}/>
                    <span className='my-auto text-2xl'>Work</span>
                </Link>
            </div>
        </div>
    )
}

export default DriverHome