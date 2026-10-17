import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/applications/mine")
      .then(({ data }) => setApplications(data))
      .catch(() => setError("Could not load your applications"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <h2>My applications</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && applications.length === 0 && <p>You haven't applied to any jobs yet.</p>}

      <div style={{ display: "grid", gap: 12 }}>
        {applications.map((app) => (
          <div key={app._id} className="card">
            {app.job ? (
              <Link to={`/jobs/${app.job._id}`}><b>{app.job.title}</b></Link>
            ) : (
              <b>Job no longer available</b>
            )}
            <p style={{ margin: "4px 0" }}>{app.job?.company} · {app.job?.location}</p>
            <p style={{ margin: 0 }}>Status: <b>{app.status}</b></p>
          </div>
        ))}
      </div>
    </div>
  );
}