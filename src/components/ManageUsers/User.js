import React, { use, useEffect } from 'react';
import { useHistory } from "react-router-dom";

function User(props) {
    let history = useHistory();
    useEffect(() => {
        let session = sessionStorage.getItem('account');
        if (!session) {
            history.push("/login");
        }
    }, []);
    return (
        <div>
            user
        </div>
    );
}

export default User;