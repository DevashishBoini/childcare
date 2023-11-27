import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";

const FacilityHireStaff = () => {
    
  const [info, setInfo] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);

  const { facId,licNo,facName } = useParams();
    
  const url=`/facId/${facId}/${licNo}/staffList`;  

  
  const handleDelete = (id) => {
    fetch(`${url}/delete/${id}`, {
      method: "DELETE",
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Delete request failed");
        }

        window.location.reload();
      })
      .then(() => console.log("Staff Removed"));
  };
  
  
  
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
       console.log(data);
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
         <h2>Hired Staff in {facName}</h2>
         <h2>Facility Id: {facId}</h2>
           <div>
              <table className="student-table">
               <thead>
               <tr>
                   <th>Staff Id</th>
                   <th>First Name</th>
                   <th>Last Name</th>
                   <th> </th>
                </tr>
               </thead>
                 {info.map((rec) => (
                <tbody>
                   <tr key={rec.id}>
                     <td>{rec.id}</td>
                     <td>{rec.first_name}</td> 
                     <td>{rec.last_name}</td>
                     <td>
                      <button
                      onClick={() => {
                        handleDelete(rec.id);
                      }}

                      className="big-button"
                      >
                       UnEnroll
                      </button> 
                     </td>
                   </tr>
                </tbody>
                 ))}
              </table> 
           </div>

           <div>
             <Link to={`/facilityHome/facId/${facId}/${licNo}/${facName}/addStaff`}>
             <button>Add New Staff</button>
             </Link>  
           </div>
       </>
     } 
  </div> 
     );
}
 
export default FacilityHireStaff;