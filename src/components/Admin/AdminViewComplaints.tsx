import React from 'react'
import { Link } from 'react-router-dom'

const AdminViewComplaints : React.FC = () => {
    return (
        <div>
            <div className='container flex justify-between mt-3'>
                <h2 className='mb-4'>Update Driver</h2>
                <Link to={"/admin_home"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
            </div>
            <div className='container pb-10 min-h-screen'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto'>
                </div>
            </div>
        </div>
    )
}

export default AdminViewComplaints