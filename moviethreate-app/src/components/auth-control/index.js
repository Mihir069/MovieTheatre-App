import {useState } from "react";
import LoginPage from "../login";
import User from "../common/user";

const AuthControl = () =>{
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    // const handleLogin = () =>{
    //     setIsLoggedIn(true);
    // }

    return(
        <>
        <User isLoggedIn={isLoggedIn}/>
        <LoginPage />
        </>
    )
}
export default AuthControl;