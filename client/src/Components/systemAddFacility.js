import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";




const SystemAddFacility = () => {
    
    const {sysId} = useParams();

    const [isPending, setisPending] = useState(false);
    const [error, setError] = useState(null);

    const [name, setname] = useState("");
    const [address, setaddress] = useState("");
    const [contact, setcontact] = useState("");
    const [licenseNo, setlicenseNo] = useState("");

    const history = useHistory();
    
    const url=`http://localhost:8080/sysId/${sysId}/addFacility`;

    const handleSubmit = (e) => {
        e.preventDefault();


        const newFacility = {name,address,contact,licenseNo}
    
        setisPending(true);
        setError(null);
    
        const abortCont = new AbortController();
    
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newFacility),
        })
          .then((resp) => {
            if (!resp.ok) {
              throw new Error("error occured during the post request");
            }
            return resp;
          })
          .then((resp) => {
            alert("New Facility Added");
            setisPending(false);
            //history.go(-1);
            history.push(`/systemHome/sysId/${sysId}`);
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
            
            <h2>Enroll Facility Details</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
                
                
                Name:
                <div>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Name"
                />  
                </div>

                
                Contact:
                <div>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setcontact(e.target.value)}
                  placeholder="Contact"
                />
                </div>
                

                Address:
                <div>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  placeholder="Address"
                />
                </div>

                License Number:
                <div>
                <input
                  type="text"
                  required
                  value={licenseNo}
                  onChange={(e) => setlicenseNo(e.target.value)}
                  placeholder="License Number"
                />
                </div>
                

              
             
            {!isPending && <button >Submit</button>}
            {error && <div> {error} </div>}
            {isPending && <button disabled>Submitting</button>}

            </form>
        </div>

     );
}
 
export default SystemAddFacility;