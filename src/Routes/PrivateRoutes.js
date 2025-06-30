import React from 'react';
import { Route } from "react-router-dom";
import { useEffect, useContext } from 'react';
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext"

function PrivateRoutes(props) {
    const { user } = useContext(UserContext);
    if (user && user.isAuthenticated === true) {
        return (
            <div>
                <Route path={props.path} component={props.component}
                />
            </div>
        );
    } else {
        return <Redirect to='/login'></Redirect>
    }

}

export default PrivateRoutes;