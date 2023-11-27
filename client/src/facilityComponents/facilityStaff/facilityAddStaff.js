import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";

const FacilityAddChild = () => {
    
    const {facId,licNo,facName} = useParams();

    const [isPending, setisPending] = useState(false);
    const [error, setError] = useState(null);
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [dob, setdob] = useState("");
    const [address, setaddress] = useState("");
    const [phone, setphone] = useState("");
    const [hourly_salary, sethourly_salary] = useState("");
    const [mail, setmail] = useState("");
    const [password, setpassword] = useState("");

    const history = useHistory();

    const url=`/facId/${facId}/${licNo}/addStaff`;

    
    
    
    
    const handleSubmit = (e) => {
        e.preventDefault();


        const newStaff = {firstName,lastName,dob,address,phone,hourly_salary,mail,password};
    
        setisPending(true);
        setError(null);
    
        const abortCont = new AbortController();
    
        fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newStaff),
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
            alert("New Staff Added")
            //history.go(-1);
            history.push(`/facilityHome/facId/${facId}/${licNo}/${facName}/facilityHirestaff`);
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
            
            <h2>Hire Staff Details</h2>

            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                First Name :  
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  placeholder="First Name"
                />  
                </div>

                <div>
                  Last Name :
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setlastName(e.target.value)}
                  placeholder="Last Name"
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
                  Date of Birth :
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setdob(e.target.value)}
                  placeholder="Date of Birth"
                />
                </div>

                <div>
                  Phone No :
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setphone(e.target.value)}
                  placeholder="Phone Number"
                />
                </div>
                

                <div>
                  Mail Id :
                <input
                  type="text"
                  required
                  value={mail}
                  onChange={(e) => setmail(e.target.value)}
                  placeholder="Mail Id"
                />   
                </div>

                <div>
                  Hourly Salary :
                <input
                  type="number"
                  required
                  value={hourly_salary}
                  onChange={(e) => sethourly_salary(e.target.value)}
                  placeholder="Hourly Salary"
                />   
                </div>

                <div>
                  Password :
                <input
                  type="text"
                  required
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