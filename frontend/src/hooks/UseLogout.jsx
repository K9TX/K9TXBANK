import React from 'react'
import {  useNavigate } from "react-router-dom";
import { useAuthContext } from '../context/AuthContext';
import { useState } from 'react';

const UseLogout = () => {
    const[loading, setLoading] = useState(false);
   
    const { setAuthUser } = useAuthContext();
    const logout = () => {
        setLoading(true);
        try {
           localStorage.removeItem("user");
           setAuthUser(null);
        
       } catch (error) {
        toast.error(error.message);
       }finally{
        setLoading(false);
       }
       
        
    }
    
    return   { loading,logout }
}

export default UseLogout