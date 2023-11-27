import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";

const FacilityPendingPayments = () => {
    
    const [info, setInfo] = useState(null);
    const [isPending, setisPending] = useState(true);
    const [error, setError] = useState(null);
    
    const { facId,licNo,facName,week,year } = useParams();

    const url=`/facId/${facId}/${licNo}/pendingPayments/${week}/${year}`;

    
    
    const handlePay = (studId) => {

            const newPay = {studId};
    
            setisPending(false);
            setError(null);
        
            const abortCont = new AbortController();
        
            fetch(`${url}/makePayment`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newPay),
            })
              .then((resp) => {
                if (!resp.ok) {
                  throw new Error("error occured during the post request");
                }

                window.location.reload();
                return resp;
              })
              .then((resp) => {
                console.log("Ledger Added");
             
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
    
       }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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
             <h2>Pending Payments in {facName}</h2>
             <h2>Facility Admin Id: {facId}</h2>
               <div>
                  <table className="student-table">
                   <thead>
                   <tr>
                       <th>Student Id</th>
                       <th>First Name</th>
                       <th>Last Name</th>
                       <th>Settle payment</th>
                    </tr>
                   </thead>
                     {info.map((rec) => (
                    <tbody>
                       <tr key={rec.student_id_op}>
                         <td>{rec.student_id_op}</td>
                         <td>{rec.first_name_op}</td>
                         <td>{rec.last_name_op}</td>
                         <td>
                          <button

                           className="big-button"
                           onClick={() => {
                             handlePay(rec.student_id_op);
                           }}
                          >
                           Settle Up
                          </button> 
                         </td>
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
 
export default FacilityPendingPayments;