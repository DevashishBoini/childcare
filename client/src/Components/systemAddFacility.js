import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";




const SystemAddFacility = () => {
    
    const {sysId} = useParams();

    const [isPending, setisPending] = useState(false);
    const [error, setError] = useState(null);

    const [namei, setnamei] = useState("");
    const [addressi, setaddressi] = useState("");
    const [contacti, setcontacti] = useState("");
    const [lici, setlici] = useState("");
    const [gmail, setgmail] = useState("");
    const [namee, setnamee] = useState("");
    const [contact, setcontact] = useState("");
    const [pass, setpass] = useState("");

    const history = useHistory();
    
    const url=`/sysId/${sysId}/addFacility`;

    const handleSubmit = (e) => {
        e.preventDefault();


        const newFacility = {namei,addressi,contacti,lici,gmail,namee,contact,pass}
    
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
                
                
                Facility Name:
                <div>
                <input
                  type="text"
                  required
                  value={namei}
                  onChange={(e) => setnamei(e.target.value)}
                  placeholder="Facility Name"
                />  
                </div>

                
                Facility Contact:
                <div>
                <input
                  type="text"
                  required
                  value={contacti}
                  onChange={(e) => setcontacti(e.target.value)}
                  placeholder="Facility Contact"
                />
                </div>
                

                Facility Address:
                <div>
                <input
                  type="text"
                  required
                  value={addressi}
                  onChange={(e) => setaddressi(e.target.value)}
                  placeholder="Facility Address"
                />
                </div>

                License Number:
                <div>
                <input
                  type="text"
                  required
                  value={lici}
                  onChange={(e) => setlici(e.target.value)}
                  placeholder="License Number"
                />
                </div>

                Admin Email:
                <div>
                <input
                  type="text"
                  required
                  value={gmail}
                  onChange={(e) => setgmail(e.target.value)}
                  placeholder="Admin Email"
                />
                </div>

                Admin Name:
                <div>
                <input
                  type="text"
                  required
                  value={namee}
                  onChange={(e) => setnamee(e.target.value)}
                  placeholder="Admin Name"
                />
                </div>

                Admin Contact:
                <div>
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setcontact(e.target.value)}
                  placeholder="Admin Contact"
                />
                </div>

                Admin Password:
                <div>
                <input
                  type="password"
                  required
                  value={pass}
                  onChange={(e) => setpass(e.target.value)}
                  placeholder="Admin Password"
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