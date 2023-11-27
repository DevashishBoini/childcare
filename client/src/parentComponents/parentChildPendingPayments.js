import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";



const ParentChildPendingPayments = () => {
    
    const [info, setInfo] = useState(null);
    const [isPending, setisPending] = useState(true);
    const [error, setError] = useState(null);
    
    const { parentId,childId,firstName,lastName } = useParams();

    const url=`/parentId/${parentId}/childId/${childId}/pendingPayments`;

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
             <h2>Pending Payments</h2>
             <h2>{firstName} {lastName}</h2>
               <div>
                  <table className="student-table">
                   <thead>
                   <tr>
                       <th>Year</th>
                       <th>Week</th>
                       <th>Due Payment</th>
                    </tr>
                   </thead>
                     {info.map((rec) => (
                    <tbody>
                       <tr key={rec.year_op}>
                         <td>{rec.year_op}</td>
                         <td>{rec.weeknumber_op}</td>
                         <td>{rec.money_to_be_paid_op}</td>
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
 
export default ParentChildPendingPayments;