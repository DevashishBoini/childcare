import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";


const ParentChildHome = () => {
    
  const [info, setInfo] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);

  const [allergies, setallergies] = useState(null);
  const [attainweek, setattainweek] = useState(null);
  const [attainyear, setattainyear] = useState(null);

  const history = useHistory();

  const { parentId,childId,firstName,lastName } = useParams();

  const url1=`http://localhost:8080/parentId/${parentId}/childId/${childId}/viewWeeklyAttendance`;

  const url2=`http://localhost:8080/parentId/${parentId}/childId/${childId}/updateAllergy`;

  const url3=`http://localhost:8080/parentId/${parentId}/childId/${childId}/dropChild`;

  const week=Cookies.get('week');
  const day=Cookies.get('day');
  const year=Cookies.get('year');


  
  const handleDelete = (childId) => {
     
    const deleteChild = {childId};

    setisPending(true);
    setError(null);

    const abortCont = new AbortController();

    fetch(url3, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deleteChild),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("error occured during the post request");
        }
        alert(`Child UnEnrolled`)
        history.push(`/parentHome/parentId/${parentId}`);
        // window.location.reload();
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

  
  
  
  
        const updateAllergy = (license_no,day,week,year) => {

    
    
        const newAllergy = {allergies,childId};

        setisPending(true);
        setError(null);
    
        const abortCont = new AbortController();
    
        fetch(url2, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAllergy),
        })
          .then((resp) => {
            if (!resp.ok) {
              throw new Error("error occured during the post request");
            }
            alert(`Updated Allergies`)
            // window.location.reload();
          })
          .then((resp) => {
            console.log("Updated Allergy");
         
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
    
  return ( 
     


    <div> 



    <h1>Child Home</h1>
    <h2>{firstName} {lastName}</h2>
    <h2>Child Id : {childId}</h2>

    <form onSubmit={(e) => updateAllergy(e)}>

    <div>
    Update Allergies:

    <input
    type="text"
    required
    value={allergies}
    onChange={(e) => setallergies(e.target.value)}
    placeholder="Allergies"
    />  

    </div>

    <button  >Submit</button>

    </form>


    <button 
    onClick = {() =>{
     handleDelete(childId);
    }}
    >Drop Child</button>

    


    <form>
      
      View Weekly Attendance:

      <div>
      Week Number:

      <input
      type="number"
      required
      value={attainweek}
      onChange={(e) => setattainweek(e.target.value)}
      placeholder="Week Number"
      />

      </div>

      <div>
      Year:

      <input
      type="number"
      required
      value={attainyear}
      onChange={(e) => setattainyear(e.target.value)}
      placeholder="Year"
      />

      </div>

      <Link to={`/parentHome/parentId/${parentId}/viewChild/${childId}/${firstName}/${lastName}/weekAttendance/${attainweek}/${attainyear}`}>
      <button>Submit</button>
      </Link>
      
    
    </form>

    <div>
      To make Payments, please visit corresponding Facility Admin
    </div>

    <div>

      <Link to={`/parentHome/parentId/${parentId}/viewChild/${childId}/${firstName}/${lastName}/pendingPayments`}>
      <button>View Ledger</button>
      </Link>
      
  
    </div>


    </div>

    

  

   );
}
 
export default ParentChildHome;