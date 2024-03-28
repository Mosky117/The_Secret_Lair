import {useState} from "react";

export default function useUserSession(){
    const [userToken, setToken]=useState(localStorage.getItem('token'));
    function logout(){
        localStorage.removeItem('token');
        setToken(null);
    }
    function saveUserSession(token){
        localStorage.setItem('token', token);
        setToken(token);
    }
    return {
        token: userToken,
        saveUserSession,
        logout
    }
}