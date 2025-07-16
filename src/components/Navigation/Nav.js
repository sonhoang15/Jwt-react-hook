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

    if (user && user.isAuthenticated === true || location.pathname === '/' || location.pathname === '/about') {
        return (
            <>
                <div className="Nav-header">
                    <Navbar collapseOnSelect expand="lg" bg="header">
                        <Container>
                            <Navbar.Brand >
                                <span className="brand-name"> C <i class="fa fa-codepen" aria-hidden="true"></i> D E</span>
                            </Navbar.Brand>
                            {user && user.isAuthenticated === true
                                ?

                                <>
                                    <div className="d-lg-none d-flex align-items-center ms-auto me-2 text-white">
                                        <span className="me-2">Hello <strong>{user.account.username}</strong></span>
                                        <NavDropdown title="⚙️" id="user-dropdown-mobile" align="end">
                                            <NavDropdown.Item onClick={handleLogout}>Log out</NavDropdown.Item>
                                        </NavDropdown>
                                    </div>
                                </>
                                :
                                <Link className="d-lg-none d-flex align-items-center ms-auto me-2 btn btn-primary" to="/login">Login</Link>
                            }
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink className="nav-link menus" to="/" exact >Home</NavLink>
                                    <NavLink className="nav-link menus" to="/users">User</NavLink>
                                    <NavLink className="nav-link menus" to="/roles">Roles</NavLink>
                                    <NavLink className="nav-link menus" to="/group-role">Group roles</NavLink>
                                    <NavLink className="nav-link menus" to="/about">About</NavLink>
                                </Nav>

                                <Nav className="ml-auto d-none d-lg-flex">
                                    {user && user.isAuthenticated === true
                                        ?

                                        <>
                                            <Nav.Item className="nav-link welcome">Hello {user.account.username}</Nav.Item>
                                            <NavDropdown className="setting" title="Setting" id="basic-nav-dropdown">
                                                <NavDropdown.Item >
                                                    <span onClick={() => handleLogout()}> Log out</span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <Link className="login nav-link btn" to="/login">Login</Link>
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