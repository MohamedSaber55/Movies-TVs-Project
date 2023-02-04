import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
// import { Navigate } from "react-router-dom";
import Login from "../Login/Login";

export default function ProtectedRouter({ children }) {
    const { userInfo } = useContext(AuthContext)
    if (userInfo === null) {
        return <Login />;
    } else {
        return children;
    }
}