import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";


const TeacherHome = () => {
    
  const [info, setInfo] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);

  const [attainweek, setattainweek] = useState(null);
  const [attainyear, setattainyear] = useState(null);

  const { teacherId } = useParams();

  const url=`/teacherId/${teacherId}`;

  const week=Cookies.get('week');
  const day=Cookies.get('day');
  const year=Cookies.get('year');

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

    <h1>Teacher Home</h1>
    <h2>{info.firstname} {info.lastname}</h2>
    <h2>License No. : {info.licenseno}</h2>
    <h2>Teacher Id : {teacherId}</h2>

    <form>
    
    <h3>Weekly Attendance and Payroll:</h3>

    
    <div class="form-row">
     
    <div class="form-control">
    Week Number:
    <input
    type="text"
    required
    value={attainweek}
    onChange={(e) => setattainweek(e.target.value)}
    placeholder="Week Number"
    />  

    </div>

    <div class="form-control">
    
    Year:
    <input
    type="text"
    required
    value={attainyear}
    onChange={(e) => setattainyear(e.target.value)}
    placeholder="Year"
    />

    </div>
  
    </div>
    


    
     
    <Link to={`/teacherHome/teacherId/${teacherId}/teacherAttendance/${attainweek}/${attainyear}`}>
    <button >Submit</button>
    </Link>
    </form>

    <Link to={`/teacherHome/teacherId/${teacherId}/teacherMarkChildrenAttendance`}>
    <button>Mark Children Attendance</button>
    </Link>
     
    </>
    }

    </div>

  

   );
}
 
export default TeacherHome;