import axios from "../lib/axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { message } from "antd";

const RequireAuth = ({  children }) => {
    let user =  typeof(localStorage.getItem('user')) === 'undefined' ? null : JSON.parse(localStorage.getItem('user')) 
    if (!user) {
        return <Navigate to={ '/' } replace />;
    }

    return children;
}

export default RequireAuth