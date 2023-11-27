import {useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = () => {
  const [role, setRole] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const [isPending, setisPending] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const url = '/login';

  
    const handleSubmit = (e) => {
      
      e.preventDefault();
      setisPending(true);
      setError(null);

      const abortCont = new AbortController();


      fetch(`${url}/${role}/${id}`, { signal: abortCont.signal })
        .then(res => {
          if (!res.ok) {
            throw Error("data couldn't be fetched");
          }
          return res.json();
        })
        .then(data => {
          console.log(data);
          if (data.get_password === password) 
          {
            Cookies.set('role',role);
            Cookies.set('id',id);

            if(role==="System")
            {
                history.push(`/systemHome/sysId/${id}`);
            }
            else if(role==="Facility")
            {
                history.push(`/facilityHome/facId/${id}`);
            }
            else if(role==="Teacher")
            {
                history.push(`/teacherHome/teacherId/${id}`);
            }
            else if(role==="Parent")
            {
                history.push(`/parentHome/parentId/${id}`);
            }
            
            
          }
          else {
            alert('Incorrect Credentials, Please Retry');
            window.location.reload();
          }
          

          setisPending(false);
          setError(null);
        })
        .catch(err => {
          if (err.name === "AbortError") {
            console.log("Fetch Aborted");
          } else {
            setisPending(false);
            setError(err.message);
          }
        });

      return () => {
        abortCont.abort();
      };
    };

    

    
  

  return (
    <div class = "content-w3ls">
      <div >
        <div ></div>
        <div class = "text-center">LOGIN</div>
        <div class = "content-bottom">
        <form onSubmit={(e) => handleSubmit(e)} className="login">
          <div >
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="select"
            >
              <option disabled selected value="">Select a Role</option>
              <option value="System">System</option>
              <option value="Facility">Facility</option>
              <option value="Teacher">Teacher</option>
              <option value="Parent">Parent</option>
            </select>
          </div>
          <div className="field-login">
            {/* <label>ID</label> */}
            <input
              type="text"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="ID"
            />
          </div>
          <div className="field-login">
            {/* <label>Password</label> */}
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          {!isPending && <button className="submit-button">Submit</button>}
          {error && <div>{error}</div>}
          {isPending && <button disabled className="submit-button">Submitting...</button>}
        </form>
        </div>
      </div>
    </div>
  );

  }
export default Login;