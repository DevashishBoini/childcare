import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import Cookies from "js-cookie";

const FacilityAddChild = () => {
    
    const {facId,licNo,facName} = useParams();

    const [isPending, setisPending] = useState(false);
    const [error, setError] = useState(null);

    const [teacherId, setteacherId] = useState("");
    const [time, settime] = useState("");

    const week=Cookies.get('week');
    const day=Cookies.get('day');
    const year=Cookies.get('year');

    const history = useHistory();

    const url=`/facId/${facId}/${licNo}/teacherAttendance`;

    
  
    const dropdownOptions = [
      { label: 'In Time', value: 0 },
      { label: 'Out Time', value: 1 }
    ];
    
    
    
    
    const handleSubmit = (e) => {
        e.preventDefault();


        const newTime = {teacherId,time,week,day,year};
    
        setisPending(true);
        setError(null);
    
        const abortCont = new AbortController();
    
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTime),
        })
          .then((resp) => {
            if (!resp.ok) {
              throw new Error("error occured during the post request");
            }
            return resp;
          })
          .then((resp) => {
            console.log("New Child Added");
            setisPending(false);

            console.log(time);

            if(time == 0)
            {
                alert("In Time Marked");
            }
            else
            {
                alert("Out Time Marked");
            }
            //history.go(-1);
            
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
    
    return ( 
        
        <div>
            
            <h2>Mark Teacher Attendance</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                  Teacher Id:  
                <input
                  type="text"
                  required
                  value={teacherId}
                  onChange={(e) => setteacherId(e.target.value)}
                  placeholder="Teacher Id"
                />  
                </div>

                
                
                <div>
                 Select Type: 
                <select
                  value={time}
                  onChange={(e) => settime(e.target.value)}
                  className="select"
                >
                  <option value="" disabled selected>Choose Time</option>
                  {dropdownOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                  {option.label}
                   </option>
                  ))}
                </select>
                </div>

             
            {!isPending && <button >Submit</button>}
            {error && <div> {error} </div>}
            {isPending && <button disabled>Submitting</button>}

            </form>
        </div>

      
  
     );
}
 
export default FacilityAddChild;