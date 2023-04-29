import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { addUser, checkUser } from "../api/User";


export const Logout = () => {

    let navigate = useNavigate(); 
 

    const goToLoginPage = async() =>{
        let path = `/`; //SPYTAT SA NA TUTO CAST
        navigate(path);
    }

    //do new event sa musi dostat natiahnuty event z plans, z toho na ktore sa kliklo
    return (
        <div className="front-pages">
        <div className="auth-form-container">
            <label>YOU ARE LOGGED OUT</label>
            <button className="link-btn" onClick={(e) => goToLoginPage()}>Wanna check your plans? Log In here.</button>
        </div>
        </div>
    )
}

export default Logout;

//cez kalendar potrebujem posunut datum do plans, a cez vyber posuniem generatoru aj meno prihlaseneho a uzivatela ktoreho si vybral