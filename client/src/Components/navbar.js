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
            <div>
                <a>CMS</a>
                <ul className="right">
                    {/* <li><Link to="/">Home</Link></li> */}
                    <button onClick={handleclick} >Logout</button>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar