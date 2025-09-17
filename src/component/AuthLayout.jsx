import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Protected({children, authentication = true}) {
    const navigate = useNavigate();
    const {isAuthenticated, error, loading} = useSelector(state => state.auth);
    
    useEffect(() => {
        // loading = "";
        if (authentication && isAuthenticated !== authentication) {
            navigate("/login")
        } else if(!authentication && isAuthenticated !== authentication) {
            navigate("/")
        }
        
    }, [isAuthenticated, navigate, authentication])
    
    return loading ? <h1>Loading...</h1> : <>{children}</>
}