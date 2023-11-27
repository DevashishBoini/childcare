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
  
  const url=`/facId/${facId}`;

  
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
           
           <div className="Div">
            
           <form onSubmit={(e) => handleDate(e)}>

<h3>
 Set Today's Date :
</h3>



<div class="form-row">

<div class="form-control">
     
     Day:
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

 <div class="form-control">
   Week :
     <input
       type="number"
       required
       value={week}
       onChange={(e) => setweek(e.target.value)}
       placeholder="Week"
     />
</div>

<div class="form-control">
 Year :
     <input
       type="number"
       required
       value={year}
       onChange={(e) => setyear(e.target.value)}
       placeholder="Year"
     />
</div>

</div>



 <button >Submit</button>
 </form>


<div className="buttons-container">

<Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/facilityChildrenEnrollments`}>
<button className="big-button">Children Enrollments</button>
</Link>

<Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/facilityAddParent`}>
<button className="big-button">Add Parent</button>
</Link>

<Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/facilityHireStaff`}>
<button className="big-button">Hire Staff</button>
</Link>

<Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/facilityAssign`}>
<button className="big-button">Staff assignment</button>
</Link>

<Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/facilityManageAttendance`}>
<button className="big-button">Daily attendance</button>
</Link>
</div>



<button
onClick={() => {
 updateLedger(info.license_no,attainweek,attainyear);
}}
> 
Update Ledger
</button>
            
           </div>
           
           
           <div className="Div">

           <form >
            
            <h3>
            Pending Payments :
            </h3>
           
            
            <div className="form-row">
            
             <div class="form-control">

              Week :
                <input
                  type="number"
                  required
                  value={pendingweek}
                  onChange={(e) => setpendingweek(e.target.value)}
                  placeholder="Week"
                />
           </div>

           <div class="form-control">
              
              Year :
                <input
                  type="number"
                  required
                  value={pendingyear}
                  onChange={(e) => setpendingyear(e.target.value)}
                  placeholder="Year"
                />
           </div>

            </div>

            
            

            <Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/facilityPendingPayments/${pendingweek}/${pendingyear}`}>
            <button >View ledger</button>
            </Link>
            

            </form>
          

           </div>
           
          

          <form>

<h3>
Fetch reports :
</h3>


<div className="form-row">
 
<div class="form-control">

Day :
              <select
                value={getday}
                onChange={(e) => setgetday(e.target.value)}
                className="select"
              >
                <option value="" disabled selected>Day</option>
                {dropdownOptions.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
                 </option>
                ))}
              </select>
          </div>



<div class="form-control">

Week :

   <input
     type="number"
     required
     value={getweek}
     onChange={(e) => setgetweek(e.target.value)}
     placeholder="Week"
   />
</div>

<div class="form-control">
Year :

   <input
     type="number"
     required
     value={getyear}
     onChange={(e) => setgetyear(e.target.value)}
     placeholder="Year"
   />
</div>

<div class="form-control">

Class Type :
              <select
                value={getclasstype}
                onChange={(e) => setgetclasstype(e.target.value)}
                className="select"
              >
                <option value="" disabled selected>Classtype</option>
                {dropdownOptions1.map((option) => (
                <option key={option.value} value={option.value}>
                {option.label}
                 </option>
                ))}
              </select>
              </div>
</div>
 



<div className="buttons-container">

<Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/DailyAttendance/${getday}/${getweek}/${getyear}/${getclasstype}`}>
 <button className="big-button">Daily Attendance</button>
 </Link>

 <Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/DailyAbsence/${getday}/${getweek}/${getyear}/${getclasstype}`}>
 <button className="big-button">Daily Absence</button>
 </Link>

 <Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/MoneyEarned/${getweek}/${getyear}`}>
 <button className="big-button">Money Earned</button>
 </Link>

 <Link to={`/facilityHome/facId/${facId}/${info.license_no}/${info.name}/MoneyBilled/${getweek}/${getyear}`}>
 <button className="big-button">Money Billed</button>
 </Link>

</div>
 

 
 

 </form>
          </>
          }
        </div>
        

     );
}
 
export default FacilityHome;