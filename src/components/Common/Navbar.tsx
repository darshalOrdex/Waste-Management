import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import logo from '../../assets/images/logo.png'

const Navbar : React.FC = () => {
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
                        <NavDropdown
                            id="nav-dropdown-dark-example"
                            title="User Name"
                        >
                            <NavDropdown.Item href='/profile/1'>My Profile</NavDropdown.Item>
                            <NavDropdown.Item href='/'>
                                <div>Logout</div>
                            </NavDropdown.Item>
                        </NavDropdown>
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