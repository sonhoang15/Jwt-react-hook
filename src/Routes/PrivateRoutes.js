import React from 'react';
import {
    Route,
} from "react-router-dom";
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";

function PrivateRoutes(props) {
    let history = useHistory();
    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            history.push("/login");
            window.location.reload();
        }
    }, []);
    return (
        <div>
            <Route path={props.path} component={props.component}
            />
        </div>
    );
}

export default PrivateRoutes;