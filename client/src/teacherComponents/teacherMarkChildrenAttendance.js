import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

const TeacherMarkChildrenAttendance = () => {
    
    const [info, setInfo] = useState(null);
    const [isPending, setisPending] = useState(true);
    const [error, setError] = useState(null);
  
    const { teacherId } = useParams(); 

    const week=Cookies.get('week');
    const day=Cookies.get('day');
    const year=Cookies.get('year');

    const url=`http://localhost:8080/teacherId/${teacherId}/markChildrenAttendance/${day}/${week}/${year}`;
    
    const handleToggle = (studentId) => {
        const Toggle = { studentId };
    
        setisPending(true);
        setError(null);
    
        const abortCont = new AbortController();
    
        fetch(`${url}/${studentId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Toggle),
        })
          .then((resp) => {
            if (!resp.ok) {
              throw new Error("error occured during the post request");
            }
            return resp;
          })
          .then((resp) => {
            console.log("Status Updated");
            setisPending(false);
            //history.go(-1);
            window.location.reload();
          })
          .catch((error) => {
            if (error.name === "AbortError") {
              console.log("Post Aborted");
            } else {
              setisPending(false);
              setError(error.message);
            }
          });
    
        return () => {
          abortCont.abort();
        };
      };
    
    
    
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
          //  console.log(data);
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
             <h2>Enrolled Children</h2>
             <h2>Teacher Id: {teacherId}</h2>
               <div>
                  <table>
                   <thead>
                   <tr>
                       <th>Student Id</th>
                       <th>First Name</th>
                       <th>Last Name</th>
                       <th>Attendance</th>
                    </tr>
                   </thead>
                     {info.map((rec) => (
                    <tbody>
                       <tr key={rec.id}>
                         <td>{rec.id}</td>
                         <td>{rec.first_name}</td>
                         <td>{rec.last_name}</td>
                         <td>
                          <button
                           onClick={() => {
                             handleToggle(rec.id);
                           }}
                          >
                           Mark
                          </button> 
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
 
export default TeacherMarkChildrenAttendance;