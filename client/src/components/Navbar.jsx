import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        gap: 16,
        padding: 16,
        borderBottom: "1px solid #ddd",
      }}
    >
      <Link to="/">
        <b>Jobzone</b>
      </Link>
      <div style={{ marginLeft: "auto", display: "flex", gap: 16 }}>
        {user ? (
          <>
            {user.role === "employer" && (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/post-job">Post job</Link>
              </>
            )}
            {user.role === "jobseeker" && (
              <Link to="/my-applications">My applications</Link>
            )}
            <span>Hi, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
}