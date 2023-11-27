import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";

const ParentHome = () => {
    
    const [info, setInfo] = useState(null);
    const [isPending, setisPending] = useState(true);
    const [error, setError] = useState(null);
    
    const { parentId } = useParams();    

    const url=`/parentId/${parentId}/childrenList`;

    
    useEffect(() => {
    
        const abortCont= new AbortController();
    
        fetch(url).then(
          res => {
    
            if(!res.ok)
            {
                throw Error("data couldn't be fetched");
            }
            return res.json();
            }
        ).then((data) =>
        {
           console.log(data);
           setInfo(data);
           setisPending(false);
           setError(null);
        }
        ).catch((err) =>
        {
          if(err.name==="AbortError")
          {
              console.log("Fetch Aborted");
          }
          
          else
          {
              setisPending(false);
              setError(err.message);
          } 
        })  
    
        return () => {
          abortCont.abort();  
          }
    
    
      },[url]);
    
    
    return ( 
 
        <div>
        {isPending && <div>Loading...</div>}
         {error && <div> {error} </div>}

         {
           info &&
           <>
             <h2>Parent Id: {parentId}</h2>
             <h2>Children List</h2>
               <div>
                  <table className="student-table">
                   <thead>
                   <tr>
                       <th>Student Id</th>
                       <th>First Name</th>
                       <th>Last Name</th>
                       <th> </th>
                    </tr>
                   </thead>
                     {info.map((rec) => (
                    <tbody>
                       <tr key={rec.student_id_op}>
                         <td>{rec.student_id_op}</td>
                         <td>{rec.first_name_op}</td>
                         <td>{rec.last_name_op}</td>
                         <td>
                          <Link to={`/parentHome/parentId/${parentId}/viewChild/${rec.student_id_op}/${rec.first_name_op}/${rec.last_name_op}`}>
                          <button className="big-button">View</button>
                          </Link>
                         </td>
                       </tr>
                    </tbody>
                     ))}
                  </table> 
               </div>

           </>
         } 
      </div>

     );
}
 
export default ParentHome;