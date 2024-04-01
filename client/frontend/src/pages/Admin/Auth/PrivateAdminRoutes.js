import React, { useContext } from 'react';
import { AuthContext } from '../../../context/admin/AuthContext';
import { Outlet } from "react-router";
import { Navigate } from 'react-router-dom';


export default function PrivateAdminRoute() {


    const { accessToken } = useContext(AuthContext);


    if (accessToken && accessToken !== 'null') {

        return <Outlet />

    } else {
        return <Navigate replace to="/admin/login" />


    }





}