import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PostJob from "./pages/PostJob";
import JobApplicants from "./pages/JobApplicants";
import MyApplications from "./pages/MyApplications";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/post-job" element={<ProtectedRoute role="employer"><PostJob /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute role="employer"><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard/jobs/:jobId/applicants" element={<ProtectedRoute role="employer"><JobApplicants /></ProtectedRoute>} />
        <Route path="/my-applications" element={<ProtectedRoute role="jobseeker"><MyApplications /></ProtectedRoute>} />
      </Routes>
    </>
  );
}