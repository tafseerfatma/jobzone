import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadJobs = async () => {
    try {
      const { data } = await api.get("/jobs/mine");
      setJobs(data);
    } catch (err) {
      setError("Could not load your jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      await api.delete(`/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || "Could not delete");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <h2>Your jobs</h2>
        <Link to="/post-job" style={{ marginLeft: "auto" }}>+ Post a job</Link>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && jobs.length === 0 && <p>You haven't posted any jobs yet.</p>}

      <div style={{ display: "grid", gap: 12 }}>
        {jobs.map((job) => (
          <div key={job._id} className="card">
            <h3 style={{ margin: 0 }}>{job.title}</h3>
            <p style={{ margin: "4px 0" }}>{job.company} · {job.location}</p>
            <div style={{ display: "flex", gap: 12 }}>
              <Link to={`/dashboard/jobs/${job._id}/applicants`}>View applicants</Link>
              <button className="btn-danger" onClick={() => handleDelete(job._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}