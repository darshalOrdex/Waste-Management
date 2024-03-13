import React, { useEffect } from 'react'
import { NavDropdown } from 'react-bootstrap'
import logo from '../../assets/images/logo.png'
import { useUrlShortener } from '../../context/VerifyUserContext';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const { user, verifyUser } = useUrlShortener();
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem("authtoken");
        navigate("/")
    }
    useEffect(() => {
        verifyUser();
    }, [])
    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-body-tertiary">
                {/* Container wrapper */}
                <div className="container-fluid">
                    <a className="navbar-brand mt-2 mt-lg-0" href="#">
                        <img
                            src={logo}
                            height={90}
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