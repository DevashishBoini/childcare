import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import Cookies from "js-cookie";
import {Link} from "react-router-dom";


const FacilityHome = () => {
  
  const [info, setInfo] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);

  const [week, setweek] = useState(null);
  const [day, setday] = useState(null);
  const [year, setyear] = useState(null);

  const [attainweek, setattainweek] = useState(null);
  const [attainday, setattainday] = useState(null);
  const [attainyear, setattainyear] = useState(null);

  const [pendingweek, setpendingweek] = useState(null);
  const [pendingyear, setpendingyear] = useState(null); 
  
  const [getweek, setgetweek] = useState(null);
  const [getday, setgetday] = useState(null);
  const [getyear, setgetyear] = useState(null);
  const [getclasstype, setgetclasstype] = useState(null);
  
  const { facId } = useParams();
  
  const url=`http://localhost:8080/facId/${facId}`;

  
  const dropdownOptions = [
    { label: 'Monday', value: 1 },
    { label: 'Tuesday', value: 2 },
    { label: 'Wednesday', value: 3 },
    { label: 'Thursday', value: 4 },
    { label: 'Friday', value: 5 },
  ];

  const dropdownOptions1 = [
    { label: 'Infant', value: 1 },
    { label: 'Toddler', value: 2 },
    { label: 'Twadler', value: 3 },
    { label: '3-year old', value: 4 },
    { label: '4-year old', value: 5 }
  ];

  
  
  const handleDate = () => {
  
    Cookies.set('week',week);
    Cookies.set('day',day);
    Cookies.set('year',year);

    alert("Date has been updated.")
    
    const updateToday ={day,week,year}
    
    fetch(`${url}/updatedate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateToday),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("error occured during the post request");
        }
        return resp;
      })
      .then((resp) => {
        console.log("Today Updated");
     
      })
      .catch((error) => {
        if (error.name === "AbortError") {
          console.log("Post Aborted");
        } else {
          setisPending(false);
          setError(error.message);
        }
      });
  
  
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
       console.log(data);
       setInfo(data);
       setisPending(false);
       setError(null);

       setattainweek(Cookies.get('week'));
       setattainday(Cookies.get('day'));
       setattainyear(Cookies.get('year'));


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




   const updateLedger = (license_no,week,year) => {

    const newLedger = {week,year};

        setisPending(false);
        setError(null);
    
        const abortCont = new AbortController();
    
        fetch(`${url}/${license_no}/updateLedger`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newLedger),
        })
          .then((resp) => {
            if (!resp.ok) {
 
              throw new Error("error occured during the post request");
              
            }
            alert("Ledger Updated")
            return resp;
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
          {isPending && <div>Loading...</div>}
          {error && <div> {error} </div>}
          {
            info &&
            <>
           <h1>Home</h1>
           <h2>{info.name}</h2>
           <h2>License No. : {info.license_no}</h2>
           <h2>Facility Admin Id:{facId}</h2>
           
           <form onSubmit={(e) => handleDate(e)}>

           

           <div>
                <select
                  value={day}
                  onChange={(e) => setday(e.target.value)}
                  className="select"
                >
                  <option value="" disabled selected>Choose day</option>
                  {dropdownOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                  {option.label}
                   </option>
                  ))}
                </select>
            </div>

            <div>
                <input
                  type="number"
                  required
                  value={week}
                  onChange={(e) => setweek(e.target.value)}
                  placeholder="Week"
                />
           </div>

           <div>
                <input
                  type="number"
                  required
                  value={year}
                  onChange={(e) => setyear(e.target.value)}
                  placeholder="Year"
                />
           </div>

            <button >Submit</button>
            </form>

           <Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/facilityChildrenEnrollments`}>
           <button>Children Enrollments</button>
           </Link>

           <Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/facilityAddParent`}>
           <button>Add Parent</button>
           </Link>

           <Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/facilityHireStaff`}> 
           <button>Hire Staff</button>
           </Link>

          <Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/facilityAssign`}> 
          <button>Staff assignment</button>
          </Link>

          <Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/facilityManageAttendance`}>
          <button>Daily attendance</button>
          </Link>
          

          <button
           onClick={() => {
            updateLedger(info.license_no,attainweek,attainyear);
          }}
          > 
          Update Ledger
          </button>

          <div>
            {attainweek}
          </div>
          
          <form>

           Pending Payments :

            <div>
                <input
                  type="number"
                  required
                  value={pendingweek}
                  onChange={(e) => setpendingweek(e.target.value)}
                  placeholder="Week"
                />
           </div>

           <div>
                <input
                  type="number"
                  required
                  value={pendingyear}
                  onChange={(e) => setpendingyear(e.target.value)}
                  placeholder="Year"
                />
           </div>
            

            <Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/facilityPendingPayments/${pendingweek}/${pendingyear}`}>
            <button >Submit</button>
            </Link>
            

            </form>
          
          <button>Reports</button>

          <form>

Fetch reports :

<div>
                <select
                  value={getday}
                  onChange={(e) => setgetday(e.target.value)}
                  className="select"
                >
                  <option value="" disabled selected>Choose day</option>
                  {dropdownOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                  {option.label}
                   </option>
                  ))}
                </select>
            </div>
 

 
 <div>
     <input
       type="number"
       required
       value={getweek}
       onChange={(e) => setgetweek(e.target.value)}
       placeholder="Week"
     />
</div>

<div>
     <input
       type="number"
       required
       value={getyear}
       onChange={(e) => setgetyear(e.target.value)}
       placeholder="Year"
     />
</div>

<div>
                <select
                  value={getclasstype}
                  onChange={(e) => setgetclasstype(e.target.value)}
                  className="select"
                >
                  <option value="" disabled selected>Choose Classtype</option>
                  {dropdownOptions1.map((option) => (
                  <option key={option.value} value={option.value}>
                  {option.label}
                   </option>
                  ))}
                </select>
                </div>


 

 <Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/DailyAttendance/${getday}/${getweek}/${getyear}/${getclasstype}`}>
 <button >Daily Attendance</button>
 </Link>

 <Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/DailyAbsence/${getday}/${getweek}/${getyear}/${getclasstype}`}>
 <button >Daily Absence</button>
 </Link>

 <Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/MoneyEarned/${getweek}/${getyear}`}>
 <button >Money Earned</button>
 </Link>

 <Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/MoneyBilled/${getweek}/${getyear}`}>
 <button >Money Billed</button>
 </Link>
 

 </form>
          </>
          }
        </div>
        

     );
}
 
export default FacilityHome;