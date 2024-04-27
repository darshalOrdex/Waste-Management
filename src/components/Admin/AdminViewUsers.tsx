import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { UserDetails } from '../../interfaces/UserDetails';
import Spinner from '../Common/Spinner';

const AdminViewUsers : React.FC = () => {
    const [users, setUsers] = useState<UserDetails[]>([]);
    const [loading, setLoading] = useState(false);
    const axiosConfig = {
        headers: {
          'authtoken': localStorage.getItem("authtoken")
        }
    };
    const fetchUser = async() => {
        setLoading(true);
        await axios.get("http://localhost:5000/users/getallusers",axiosConfig)
        .then(response => {setUsers(response.data),setLoading(false)})
    }
    useEffect(() => {
        fetchUser();
    },[])
    return (
        <div>
            {loading ? <Spinner /> : null}
            <div className='container flex justify-between mt-3'>
                <h2 className='mb-4'>See All Users</h2>
                <Link to={"/admin_home"} className='mb-4 btn btn-primary text-2xl'>Back</Link>
            </div>
            <div className='container pb-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto'>
                    {   users.map((item : UserDetails,index : number) => (
                            <div key={index}>
                                <div className='bg-white w-full mb-4 py-3 ps-3'>
                                    <div>Name :- {item.name}</div>
                                    <div>Email :- {item.email}</div>
                                    <div>Phone Number :- {item.phonenumber}</div>
                                    <div>City :- {item.city}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default AdminViewUsers