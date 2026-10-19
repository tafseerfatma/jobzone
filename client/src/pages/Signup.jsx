import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "jobseeker" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);
  try {
    await signup(form);     
    navigate("/");
  } catch (err) {
    setError(err.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 360, margin: "40px auto", display: "grid", gap: 12 }}>
      <h2>Sign up</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password (min 6)" value={form.password} onChange={handleChange} required minLength={6} />
      <select name="role" value={form.role} onChange={handleChange}>
        <option value="jobseeker">I'm looking for a job</option>
        <option value="employer">I'm hiring</option>
      </select>
      <button type="submit" disabled={loading}>
      {loading ? "Please wait..." : "Create account"}
      </button>
      {loading && <small>The server may take up to a minute to wake up the first time.</small>}
    </form>
  );
}