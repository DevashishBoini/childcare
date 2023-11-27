import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";

const SystemHome = () => {
    
  const [info, setInfo] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);

  const { sysId } = useParams();

  const url=`/sysId/${sysId}/facilityList`;
    


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
              <h2>All Facilities</h2>
              <h2>System Id: {sysId}</h2>
                <div>
                   <table className="student-table">
                    <thead>
                    <tr>
                        <th>Facility Id</th>
                        <th>Name</th>
                        <th>License No</th>
                        <th>Facility Admin</th>
                        <th></th>
                     </tr>
                    </thead>
                      {info.map((rec) => (
                     <tbody>
                        <tr key={rec.id}>
                          <td>{rec.id}</td>
                          <td>{rec.name}</td>
                          <td>{rec.license_no}</td>
                          <td>{rec.admin_name}</td>
                          <td>
                            <Link to={`/facilityHome/facId/${rec.id}`}>
                            <button
                            className="big-button"
                            >View</button>
                            </Link>
                          </td>
                        </tr>
                     </tbody>
                      ))}
                   </table> 
                </div>

                <div>
                  <Link to={`/systemHome/sysId/${sysId}/addFacility`}>
                  <button>Add New Facility</button>
                  </Link>  
                </div>
            </>
          } 
       </div> 
     );
}
 
export default SystemHome;