import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () =>{

    const history = useHistory();

    
    const handleclick = (e) =>{
        e.preventDefault();
        
        Cookies.remove('day')
        Cookies.remove('week')
        Cookies.remove('year')
        //protected route.
        history.push(`/login`);
    }

    // console.log(hrefLink);

    return(
        <nav>
            <div className="navbar-container">
                <div className="left">
                <h1>CMS</h1>
                </div>
                <ul className="right">
                    <button
                    className="big-button" 
                    onClick={handleclick} >Logout</button>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar