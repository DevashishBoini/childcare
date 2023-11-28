import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";
import Cookies from "js-cookie";

const TeacherAttendance = () => {
    
    const [info, setInfo] = useState(null);
    const [isPending, setisPending] = useState(true);
    const [error, setError] = useState(null); 

    const [salary, setSalary] = useState(null);
    
    const {teacherId,weekNo,yearNo}=useParams();

    const week=Cookies.get('week');
    const day=Cookies.get('day');
    const year=Cookies.get('year');

    const url=`/teacherId/${teacherId}/teacherAttendance/${weekNo}/${yearNo}`;
    
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


      const getTotalSalary =() => {
       
        const abortCont= new AbortController();

    fetch(`${url}/totalSalary`).then(
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
       setSalary(data);
    }
    ).catch((err) =>
    {
      if(err.name==="AbortError")
      {
          console.log("Fetch Aborted");
      }
      
    })  

    return () => {
      abortCont.abort();  
      }
        
      }
    
    return ( 

        <div>
        {isPending && <div>Loading...</div>}
         {error && <div> {error} </div>}

         {
           info &&
           <>
             <h2>Weekly Attendance and Payroll of Week :{weekNo}</h2>
             <h2>Teacher Id: {teacherId}</h2>
               <div>
                  <table className="student-table">
                   <thead>
                   <tr>
                       <th>Day</th>
                       <th>Attendance</th>
                       <th>In Time</th>
                       <th>Out Time</th>
                       <th>Hours Worked</th>
                       <th>Salary Earned</th>
                    </tr>
                   </thead>
                     {info.map((rec) => (
                    <tbody>
                       <tr key={rec.day_op}>
                         <td>{rec.day_op}</td>
                         <td>{rec.attendance_op}</td>
                         <td>{rec.intime_op}</td>
                         <td>{rec.outime_op}</td>
                         <td>{rec.hours_worked_op}</td>
                         <td>{rec.money_earned_that_day_op}</td>
                       </tr>
                    </tbody>
                     ))}
                  </table> 
               </div>

               <div>
                Total Salary this week : {salary}
                <button 
                onClick = {() =>{
                  getTotalSalary();
                 }}>Fetch</button>
                 
               </div>

           </>
         } 
      </div>

    );
}
 
export default TeacherAttendance;
   
  