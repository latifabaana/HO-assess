import React from "react";
import useApp from "../context/context";
import { useNavigate } from "react-router-dom";
import "../CSS/Nav.css"

function Nav(data){
    //put it in local storage then put it in myMeals again. 
    const navigate = useNavigate()

    function goTo(){
        navigate(data.link)
    }

    return(
        <div className="Nav">
            <button onClick= {goTo} className = "nav-link">{data.name}</button>
           
        </div>
    )
}

export default Nav