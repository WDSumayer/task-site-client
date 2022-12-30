import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../../component/Loading/Loading';
import { AuthContext } from '../../contexts/Authprovider/AuthProvider';

const PrivateRouter = ({children}) => {
    const {user,loading, googleLoading} = useContext(AuthContext)
    const location = useLocation()
    if(loading || googleLoading){
        return <Loading></Loading>
    }
    if(!user){
        return <Navigate to='/logIn' state={{from: location}} replace></Navigate>
    }
    return children
};

export default PrivateRouter;