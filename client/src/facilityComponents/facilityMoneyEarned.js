import { useState,useEffect } from "react";
import {useParams,useHistory} from "react-router-dom/cjs/react-router-dom";
import {Link} from "react-router-dom";

const FacilityMoneyEarned = () => {
    
  const [info, setInfo] = useState(null);
  const [isPending, setisPending] = useState(true);
  const [error, setError] = useState(null);

  const { facId,licNo,facName,week,year} = useParams();

  const url=`/facId/${facId}/${licNo}/moneyEarned/${week}/${year}`;
    

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
              <h2>Week: {week} Year: {year}</h2>
              <h2>Money Earned in {facName} : {info.money_earned}</h2>
              
                 

              

            </>
          } 
       </div> 
     );
}
 
export default FacilityMoneyEarned;