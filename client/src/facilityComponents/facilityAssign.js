import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";

const FacilityAssign = () => {
    
    const {facId,licNo,facName} = useParams();

    const [isPending, setisPending] = useState(false);
    const [error, setError] = useState(null);
    
    const [classtype, setclasstype] = useState(0);
    const [teacherId, setteacherId] = useState("");

    const history = useHistory();

    const url=`/facId/${facId}/${teacherId}/assignClass`;
    

    const dropdownOptions = [
        { label: 'Choose ClassType', value: 0 },
        { label: 'Infant', value: 1 },
        { label: 'Toddler', value: 2 },
        { label: 'Twadler', value: 3 },
        { label: '3-year old', value: 4 },
        { label: '4-year old', value: 5 }
      ];
    
      const handleSubmit = (e) => {
        e.preventDefault();


        const assignStaff = {teacherId,classtype,licNo};
    
        setisPending(true);
        setError(null);
    
        const abortCont = new AbortController();
    
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(assignStaff),
        })
          .then((resp) => {
            if (!resp.ok) {
              throw new Error("error occured during the post request");
            }
            return resp;
          })
          .then((resp) => {
            console.log("New Child Added");
            alert("Staff Assigned");
            window.location.reload();
            setisPending(false);
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
            
            <h2>Assign Staff</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
                
                <div>
                <input
                  type="number"
                  required
                  value={teacherId}
                  onChange={(e) => setteacherId(e.target.value)}
                  placeholder="Teacher Id"
                />
                </div>

                <div>
                <select
                  value={classtype}
                  onChange={(e) => setclasstype(e.target.value)}
                  className="select"
                >
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
 
export default FacilityAssign;