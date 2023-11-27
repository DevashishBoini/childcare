import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const FacilityChildrenEnrollments = () => {
    const [info, setInfo] = useState(null);
    const [isPending, setisPending] = useState(true);
    const [error, setError] = useState(null);
    const { facId, licNo, facName } = useParams();
    const url = `/facId/${facId}/${licNo}/studentList`;

    const handleDelete = (id) => {
        // Indicate loading or process start
        setisPending(true);
        fetch(`${url}/delete/${id}`, { method: "DELETE" })
            .then((resp) => {
                if (!resp.ok) {
                    throw new Error("Delete request failed");
                }
                // Optionally, you can refetch the student list here instead of reloading the page
                window.location.reload();
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => setisPending(false)); // Stop indicating loading
    };

    useEffect(() => {
        const abortCont = new AbortController();
        fetch(url, { signal: abortCont.signal })
            .then(res => {
                if (!res.ok) {
                    throw Error("data couldn't be fetched");
                }
                return res.json();
            })
            .then(data => {
                setInfo(data);
                setisPending(false);
            })
            .catch(err => {
                if (err.name !== "AbortError") {
                    setisPending(false);
                    setError(err.message);
                }
            });

        return () => abortCont.abort();
    }, [url]);

    return (
        <div>
            {isPending && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            {info && (
                <>
                    <h2>Enrolled Children in {facName}</h2>
                    <h2>Facility Admin Id: {facId}</h2>
                    <div>
                        <table className="student-table">
                            <thead>
                                <tr>
                                    <th>Student Id</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {info.map((rec) => (
                                    <tr key={rec.id}>
                                        <td>{rec.id}</td>
                                        <td>{rec.first_name}</td>
                                        <td>{rec.last_name}</td>
                                        <td>
                                            <button onClick={() => handleDelete(rec.id)}
                                            
                                            className="big-button">
                                                UnEnroll
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <Link to={`/facilityHome/facId/${facId}/${licNo}/${facName}/addChildren`}>
                            <button >Add New Child</button>
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default FacilityChildrenEnrollments;


