import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";

export default function JobApplicants() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/applications/job/${jobId}`)
      .then(({ data }) => setApplications(data))
      .catch((err) => setError(err.response?.data?.message || "Could not load applicants"))
      .finally(() => setLoading(false));
  }, [jobId]);

  const updateStatus = async (id, status) => {
    try {
      const { data } = await api.put(`/applications/${id}/status`, { status });
      setApplications(applications.map((a) => (a._id === id ? { ...a, status: data.status } : a)));
    } catch (err) {
      setError(err.response?.data?.message || "Could not update status");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <Link to="/dashboard">← Back to dashboard</Link>
      <h2>Applicants</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && applications.length === 0 && <p>No applications yet.</p>}

      <div style={{ display: "grid", gap: 12 }}>
        {applications.map((app) => (
          <div key={app._id} className="card">
            <b>{app.applicant?.name}</b> · {app.applicant?.email}
            {app.coverNote && <p style={{ margin: "6px 0" }}>"{app.coverNote}"</p>}
            <p style={{ margin: "6px 0" }}>  Status: <span className={`badge badge-${app.status}`}>{app.status}</span></p>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => updateStatus(app._id, "shortlisted")}>Shortlist</button>
              <button onClick={() => updateStatus(app._id, "rejected")}>Reject</button>
              <button onClick={() => updateStatus(app._id, "pending")}>Reset</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}