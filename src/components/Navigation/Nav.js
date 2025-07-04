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
                    <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
                        <Container>
                            <Navbar.Brand>
                                <span className="brand-name">
                                    C <i className="fa fa-codepen" aria-hidden="true"></i> D E
                                </span>
                            </Navbar.Brand>

                            {/* Toggle button visible on small screens */}
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                            <Navbar.Collapse id="responsive-navbar-nav">
                                {/* Left side nav */}
                                <Nav className="mr-auto">
                                    <NavLink className="nav-link menus" exact to="/">Home</NavLink>
                                    <NavLink className="nav-link menus" to="/users">User</NavLink>
                                    <NavLink className="nav-link menus" to="/roles">Roles</NavLink>
                                    <NavLink className="nav-link menus" to="/group-role">Group roles</NavLink>
                                    <NavLink className="nav-link menus" to="/about">About</NavLink>
                                </Nav>

                                {/* Right side nav */}
                                <Nav className="ml-auto">
                                    {user?.isAuthenticated
                                        ? (
                                            <>
                                                <Nav.Item className="nav-link">
                                                    Hello <strong>{user.account.username}</strong>
                                                </Nav.Item>
                                                <NavDropdown title="Setting" id="collasible-nav-dropdown" align="end">
                                                    <NavDropdown.Item as="button" onClick={handleLogout}>
                                                        Log out
                                                    </NavDropdown.Item>
                                                </NavDropdown>
                                            </>
                                        ) : (
                                            <Link className="login nav-link btn btn-outline-primary" to="/login">
                                                Login
                                            </Link>
                                        )}
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