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
    <nav className="navbar">
      <Link to="/" className="brand">Jobzone</Link>
      <div className="nav-links">
        {user ? (
          <>
            {user.role === "employer" && (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/post-job">Post job</Link>
              </>
            )}
            {user.role === "jobseeker" && <Link to="/my-applications">My applications</Link>}
            <span className="nav-user">Hi, {user.name}</span>
            <button className="btn-outline" onClick={handleLogout}>Logout</button>
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