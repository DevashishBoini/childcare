import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

const ParentChildWeekAttendance = () => {
    
    const [info, setInfo] = useState(null);
    const [isPending, setisPending] = useState(true);
    const [error, setError] = useState(null); 
    
    const { parentId,childId,firstName,lastName,attainweek,attainyear } = useParams();

    const week=Cookies.get('week');
    const day=Cookies.get('day');
    const year=Cookies.get('year');

    const url=`/parentId/${parentId}/childId/${childId}/weekAttendance/${attainweek}/${attainyear}`;
    
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
             <h2>Weekly Attendance</h2>
             <h2>Week No. : {attainweek}</h2>
             <h2>Year : {attainyear}</h2>
             <h2>{firstName} {lastName}</h2>
             <h2>Child Id: {childId}</h2>
               <div>
                  <table className="student-table">
                   <thead>
                   <tr>
                       <th>Day</th>
                       <th>Attendance</th>
                    </tr>
                   </thead>
                     {info.map((rec) => (
                    <tbody>
                       <tr key={rec.day_op}>
                         <td>{rec.day_op}</td>
                         <td>{rec.attendance_op}</td>
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
 
export default ParentChildWeekAttendance;
   