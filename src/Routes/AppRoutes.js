import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import Login from '../components/Login/Login';
import Register from '../components/Register/Register';
import User from '../components/ManageUsers/User';
import PrivateRoutes from './PrivateRoutes';

function Approutes(props) {
    return (
        <>
            <Switch>
                <PrivateRoutes path="/users" component={User} />
                {/* <PrivateRoutes path="/project" /> */}
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    home
                </Route>
                <Route path="*">
                    404 not found
                </Route>
            </Switch >
        </>
    );
}

export default Approutes;