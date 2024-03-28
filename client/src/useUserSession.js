import {useState} from "react";

export default function useUserSession(){
    
    //using local storage to check token
    const saveToken=localStorage.getItem('token');
    const [userToken, setToken]=useState(saveToken);

    function logout(){
        localStorage.removeItem('token');
        setToken(null);
    }

    function saveUserSession(token, callback){
        localStorage.setItem('token', token);
        setToken(token, callback);
    }

    return {
        token: userToken,
        saveUserSession,
        logout
    }
}