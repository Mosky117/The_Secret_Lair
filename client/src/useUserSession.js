import React,{useState} from "react";

export default function useUserSession(){
    const [userToken, setToken]=useState(localStorage.getItem('token'));
    function logout(){
        localStorage.removeItem('token');
        setToken(null);
    }

    return {
        token: userToken,
        setToken,
        logout
    }
}