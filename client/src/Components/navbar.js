import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () =>{

    const history = useHistory();

    const [role, setRole] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
     setRole(Cookies.get('role'));
     setId(Cookies.get('id'));
    },[])
    

    let link="";

    if(role==="System")
    {
        link=`/systemHome/sysId/${id}`; 
    }
    else if(role==="Facility")
    {
        link=`/facilityHome/facId/${id}`;
    }
    else if(role==="Teacher")
    {
        link=`/teacherHome/teacherId/${id}`;
    }
    else if(role==="Parent")
    {
        link=`/parentHome/parentId/${id}`;
    }

    
    const handleclick = (e) =>{
        e.preventDefault();
        
        Cookies.remove('day')
        Cookies.remove('week')
        Cookies.remove('year')
        Cookies.remove('role')
        Cookies.remove('id')
        //protected route.
        history.push(`/login`);
    }

    // console.log(hrefLink);

    return(
        <nav>
            <div className="navbar-container">
                <div className="left">
                    <Link to={link}>
                    <h1>CMS</h1>
                    </Link>
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