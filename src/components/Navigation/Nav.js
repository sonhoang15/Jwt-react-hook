import React, { useEffect, useContext } from "react";
import "./Nav.scss"
import { Link, NavLink, useLocation, useHistory } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "../../context/UserContext"
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { logOutUser } from '../../Services/userService'
import { toast } from 'react-toastify';


const NavHeader = (props) => {
    const { user, logoutContext } = useContext(UserContext);
    const location = useLocation();
    const history = useHistory();
    const handleLogout = async () => {
        let data = await logOutUser();
        logoutContext();
        localStorage.removeItem('jwt')
        if (data && +data.EC === 0) {
            toast.success("logout succeds...")
            history.push('/login')
        } else {
            toast.error(data.EM)
        }
    }

    if (user && user.isAuthenticated === true || location.pathname === '/') {
        return (
            <>
                <div className="Nav-header">
                    <Navbar collapseOnSelect expand="lg" bg="header" className="bg-body-tertiary">
                        <Container>
                            <Navbar.Brand href="#home">
                                <img
                                    src="/img/logo.svg"
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />
                                HE
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink className="nav-link" to="/" exact >Home</NavLink>
                                    <NavLink className="nav-link" to="/users">User</NavLink>
                                    <NavLink className="nav-link" to="/roles">Roles</NavLink>
                                    <NavLink className="nav-link" to="/project">Project</NavLink>
                                    <NavLink className="nav-link" to="/about">About</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated === true
                                        ?

                                        <>
                                            <Nav.Item className="nav-link">Hello {user.account.username}</Nav.Item>
                                            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                                <NavDropdown.Item >
                                                    Change Password
                                                </NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item >
                                                    <span onClick={() => handleLogout()}> Log out</span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <Link className="nav-link" to="/login">Login</Link>
                                    }

                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>

        );
    } else {
        return <></>
    }

}

export default NavHeader 