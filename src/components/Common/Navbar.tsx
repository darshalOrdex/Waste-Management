import React, { useEffect, useState } from 'react'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar: React.FC = () => {
    const [user, setUser] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();
    let authtoken = localStorage.getItem("authtoken");
    const axiosConfig = {
        headers: {
          'authtoken': localStorage.getItem("authtoken")
        }
    };
    const verifyUser = async() => {
        if(authtoken)
        {
            axios.get("http://localhost:5000/verify/verifyapi",axiosConfig)
            .then((response : any) => {
                if(response.data.role)
                {
                    setUser(response.data.name);
                    setRole(response.data.role);
                }
            })
        }
    }
    const logOut = () => {
        localStorage.removeItem("authtoken");
        navigate("/")
    }
    useEffect(() => {
        verifyUser();
    }, [authtoken])
    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
                {/* Container wrapper */}
                <div className="container-fluid">
                    <a className="navbar-brand mt-2 mt-lg-0" href="#" onClick={()=>navigate(`/${role.toLowerCase()}_home`)}>
                        <img
                            src={logo}
                            className='logo'
                            alt="MDB Logo"
                            loading="lazy"
                        />
                    </a>
                    {/* Right elements */}
                    <div className="ms-auto me-2 me-md-5">
                        { localStorage.getItem("authtoken") && 
                            <div className="dropdown">
                                <a className="btn dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {user}
                                </a>
                                <ul className="dropdown-menu">
                                    <li><div className="cursor-pointer dropdown-item" onClick={logOut}>Log Out</div></li>
                                </ul>
                            </div>
                        }
                    </div>
                    {/* Right elements */}
                </div>
                {/* Container wrapper */}
            </nav>
            {/* Navbar */}
        </>
    )
}

export default Navbar