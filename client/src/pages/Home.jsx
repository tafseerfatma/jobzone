import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await api.get("/jobs", { params: { search, location } });
      setJobs(data);
    } catch (err) {
      setError("Could not load jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchJobs();
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <h2>Find your next job</h2>

      <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <input placeholder="Job title (e.g. React)" value={search} onChange={(e) => setSearch(e.target.value)} />
        <input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading jobs...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && jobs.length === 0 && <p>No jobs found.</p>}

      <div style={{ display: "grid", gap: 12 }}>
        {jobs.map((job) => (
          <Link key={job._id} to={`/jobs/${job._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="card">
              <h3 style={{ margin: 0 }}>{job.title}</h3>
              <p style={{ margin: "4px 0" }}>{job.company} · {job.location} · {job.type}</p>
              {job.skills?.length > 0 && <small>Skills: {job.skills.join(", ")}</small>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}