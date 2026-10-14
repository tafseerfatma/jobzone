import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function JobDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [coverNote, setCoverNote] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/jobs/${id}`)
      .then(({ data }) => setJob(data))
      .catch(() => setError("Job not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await api.post(`/applications/${id}`, { coverNote });
      setMessage("Application submitted!");
      setCoverNote("");
    } catch (err) {
      setError(err.response?.data?.message || "Could not apply");
    }
  };

  if (loading) return <p style={{ padding: 16 }}>Loading...</p>;
  if (!job) return <p style={{ padding: 16, color: "red" }}>{error}</p>;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <Link to="/">← Back to jobs</Link>
      <h2>{job.title}</h2>
      <p>{job.company} · {job.location} · {job.type}</p>
      {job.salary && <p>Salary: {job.salary}</p>}
      <p>{job.description}</p>
      {job.skills?.length > 0 && <p><b>Skills:</b> {job.skills.join(", ")}</p>}

      <hr />

      {!user && <p><Link to="/login">Log in</Link> as a job seeker to apply.</p>}
      {user && user.role === "employer" && <p>Employers can't apply to jobs.</p>}
      {user && user.role === "jobseeker" && (
        <form onSubmit={handleApply} style={{ display: "grid", gap: 8 }}>
          <h3>Apply for this job</h3>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <textarea
            rows={4}
            placeholder="Short cover note (optional)"
            value={coverNote}
            onChange={(e) => setCoverNote(e.target.value)}
          />
          <button type="submit">Apply</button>
        </form>
      )}
    </div>
  );
}