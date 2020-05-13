import React, { useState, useEffect } from 'react';
import AuthService from '../Service/AuthService'
import Preloader from '../Component/Preloader';
export const AuthContext = React.createContext();
export default ({children}) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [query,setQuery] = useState({
        mediaType : "questionPaper",
    })    
    useEffect(() => {
        AuthService.isAuthenticated().then(res => {
            setUser(res.user);
            setIsAuthenticated(res.isAuthenticated);
            setIsLoaded(true)
        })
    },[]);
    return(
        <div>
            {!isLoaded ? 
            <Preloader />
            :
            <AuthContext.Provider value={{user,setUser, isAuthenticated, setIsAuthenticated, query, setQuery}}>
                {children}
            </AuthContext.Provider>}
        </div>
    );
}
