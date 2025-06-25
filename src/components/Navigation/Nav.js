import React, { useEffect } from "react";
import "./Nav.scss"
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";


const Nav = (props) => {
    const [isShow, setIsShow] = useState(true);
    let location = useLocation();
    useEffect(() => {
        if (location.pathname === '/login' || location.pathname === '/register') {
            setIsShow(false);
        }
    }, [])
    return (
        <>
            {isShow === true &&
                <div className="topnav">
                    <NavLink to="/" exact >Home</NavLink>
                    <NavLink to="/users">User</NavLink>
                    <NavLink to="/project">Project</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            }
        </>

    );
}

export default Nav 