import { current } from "@reduxjs/toolkit";
import { useSelector } from "react-redux"
import {Outlet, Navigate} from  "react-router-dom"
export default function PrivateRoute() {
  const token = useSelector((state) => state.user.token);
    return (
        token ? <Outlet/> : <Navigate to = "/login"/>
  )
}