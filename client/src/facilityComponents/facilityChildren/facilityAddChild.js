import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";

const FacilityAddChild = () => {
    
    const {facId,licNo,facName} = useParams();

    const [isPending, setisPending] = useState(false);
    const [error, setError] = useState(null);
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [dob, setdob] = useState("");
    const [allergies, setallergies] = useState([]);
    const [classtype, setclasstype] = useState(0);
    const [parentId, setparentId] = useState("");
    const [consent, setconsent] = useState(false);
    const [week, setweek] = useState("");

    const history = useHistory();

    const url=`/facId/${facId}/${licNo}/${classtype}/addChild`;

    
  
    const dropdownOptions = [
      { label: 'Choose Classtype', value: 0 },
      { label: 'Infant', value: 1 },
      { label: 'Toddler', value: 2 },
      { label: 'Twadler', value: 3 },
      { label: '3-year old', value: 4 },
      { label: '4-year old', value: 5 }
    ];
    
    
    
    
    const handleSubmit = (e) => {
        e.preventDefault();


        const newChild = {firstName,lastName,dob,allergies,classtype,parentId,consent,week};
    
        setisPending(true);
        setError(null);
    
        const abortCont = new AbortController();
    
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newChild),
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
            //history.go(-1);
            history.push(`/facilityHome/facId/${facId}/${licNo}/${facName}/facilityChildrenEnrollments`);
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
            
            <h2>Enroll Children Details</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
                
                
                First Name:
                <div>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  placeholder="First Name"
                />  
                </div>

                
                Last Name:
                <div>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  placeholder="Last Name"
                />
                </div>
                

                Parent Id:
                <div>
                <input
                  type="number"
                  required
                  value={parentId}
                  onChange={(e) => setparentId(e.target.value)}
                  placeholder="Parent Id"
                />
                </div>

                Date of Birth:
                <div>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setdob(e.target.value)}
                  placeholder="Date of Birth"
                />
                </div>
                

                Allergies:
                <div>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setallergies(e.target.value)}
                  placeholder="Allergy"
                />
                </div>
                


                Class Type:
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

                
                Week Enrolled:
                <div>
                <input
                  type="number"
                  required
                  value={week}
                  onChange={(e) => setweek(e.target.value)}
                  placeholder="Week"
                />   
                </div>

                
                Consent :
                <div>
                <label >
                  <input 
                  type="checkbox"
                  required 
                  checked={consent}
                  onChange={(e) => setconsent(e.target.checked)}
                />    
                </label>    
                </div>
             
            {!isPending && <button >Submit</button>}
            {error && <div> {error} </div>}
            {isPending && <button disabled>Submitting</button>}

            </form>
        </div>

      
  
     );
}
 
export default FacilityAddChild;