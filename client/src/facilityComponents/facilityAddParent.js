import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";

const FacilityAddChild = () => {
    
    const {facId,licNo,facName} = useParams();

    const [isPending, setisPending] = useState(false);
    const [error, setError] = useState(null);
    const [name, setname] = useState("");
    const [contact, setcontact] = useState("");
    const [address, setaddress] = useState("");
    const [mail, setmail] = useState([]);
    const [password, setpassword] = useState("");

    const history = useHistory();

    const url=`/facId/${facId}/addParent`;

    

    
    
    
    
    const handleSubmit = (e) => {
        e.preventDefault();


        const newChild = {name,contact,address,mail,password};
    
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
            console.log("New Parent Added");
            setisPending(false);
            //history.go(-1);
            history.push(`/facilityHome/facId/${facId}`);
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
            
            <h2>Add Parent Details</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
                
                
                <div>
                Name :
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  placeholder="Name"
                />  
                </div>
                
                
                <div>
                Contact No :
                <input
                  type="text"
                  required
                  value={contact}
                  onChange={(e) => setcontact(e.target.value)}
                  placeholder="Contact No."
                />
                </div>

                <div>
                Address :
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setaddress(e.target.value)}
                  placeholder="Address"
                />
                </div>


                <div>
                Mail Id :
                <input
                  type="mail"
                  required
                  value={mail}
                  onChange={(e) => setmail(e.target.value)}
                  placeholder="Mail Id"
                />
                </div>

                <div>
                Password :
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder="Password"
                />
                </div>
                
                
             
            {!isPending && <button >Submit</button>}
            {error && <div> {error} </div>}
            {isPending && <button disabled>Submitting</button>}

            </form>
        </div>

      
  
     );
}
 
export default FacilityAddChild;