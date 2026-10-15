import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function PostJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", company: "", location: "", type: "full-time",
    salary: "", description: "", skills: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const skills = form.skills.split(",").map((s) => s.trim()).filter(Boolean);
      await api.post("/jobs", { ...form, skills });
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Could not post job");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "30px auto", display: "grid", gap: 10 }}>
      <h2>Post a job</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input name="title" placeholder="Job title" value={form.title} onChange={handleChange} required />
      <input name="company" placeholder="Company" value={form.company} onChange={handleChange} required />
      <input name="location" placeholder="Location (e.g. Remote)" value={form.location} onChange={handleChange} required />
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="internship">Internship</option>
        <option value="contract">Contract</option>
      </select>
      <input name="salary" placeholder="Salary (optional)" value={form.salary} onChange={handleChange} />
      <input name="skills" placeholder="Skills, comma separated (React, Node.js)" value={form.skills} onChange={handleChange} />
      <textarea name="description" rows={5} placeholder="Job description" value={form.description} onChange={handleChange} required />
      <button type="submit">Post job</button>
    </form>
  );
}