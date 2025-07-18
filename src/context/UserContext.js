import React, { useEffect, useState } from 'react';
import { getUserAccount } from "../Services/userService"


const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {


    // User is the name of the "data" that gets stored in context
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {}
    }


    const [user, setUser] = useState(userDefault);

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false })
    };

    // Logout updates the user data to default
    const logoutContext = () => {
        setUser({ ...userDefault, isLoading: false })
    };

    const fetchUser = async () => {
        let response = await getUserAccount();
        if (response && response.EC === 0) {
            let groupWithRoles = response.DT.groupWithRoles;
            let email = response.DT.email;
            let username = response.DT.username;
            let token = response.DT.access_token
            let data = {
                isAuthenticated: true,
                token,
                account: { groupWithRoles, email, username },
                isLoading: false
            }
            setTimeout(() => {
                setUser(data)
            }, 1000);
        } else {
            setTimeout(() => {
                setUser({ ...userDefault, isLoading: false })
            }, 1000);
        }
    }
    useEffect(() => {
        if (window.location.pathname !== '/' && window.location.pathname !== '/login'
            && window.location.pathname !== '/register'
        ) {
            fetchUser()
        } else {
            setUser({ ...user, isLoading: false })
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };