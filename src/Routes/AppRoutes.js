import React from 'react';
import {
    Switch,
    Route,
} from "react-router-dom";
import Login from '../components/LoginUser/Login';
import Register from '../components/Register/Register';
import User from '../components/ManageUsers/User';
import PrivateRoutes from './PrivateRoutes';
import Roles from '../components/Roles/Roles';
import GroupRole from '../components/Roles/GroupRole';
import Home from '../components/Home';
import About from '../components/About'

function Approutes(props) {
    return (
        <>
            <Switch>
                <PrivateRoutes exact path="/users" component={User} />
                <PrivateRoutes exact path="/roles" component={Roles} />
                <PrivateRoutes exact path="/group-role" component={GroupRole} />
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/about" exact>
                    <About />
                </Route>
                <Route path="*">
                    404 not found
                </Route>
            </Switch >
        </>
    );
}

export default Approutes;