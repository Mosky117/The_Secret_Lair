import {useState} from "react";

export default function useUserSession(){
    const saveToken=localStorage.getItem('token');
    const [userToken, setToken]=useState(saveToken);
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