import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";

const FacilityDailyAttendance = () => {
    
  const [info, setInfo] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);

  const { facId,licNo,facName,day,week,year,classtype } = useParams();

  const url=`/facId/${facId}/${licNo}/dailyAttendance/${day}/${week}/${year}/${classtype}`;
    



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
              <h2>Enrolled Children in {facName}</h2>
              <h2>Attendance List</h2>
              <h2>ClassType: {classtype}</h2>
              <h3>Day: {day} Week: {week} Year: {year}</h3>
                <div>
                   <table className="student-table">
                    <thead>
                    <tr>
                        <th>Student Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                     </tr>
                    </thead>
                      {info.map((rec) => (
                     <tbody>
                        <tr key={rec.student_id_op}>
                          <td>{rec.student_id_op}</td>
                          <td>{rec.first_name}</td>
                          <td>{rec.last_name}</td>
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
 
export default FacilityDailyAttendance;