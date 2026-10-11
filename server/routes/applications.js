const express = require("express");
const Application = require("../models/Application");
const Job = require("../models/Job");
const { protect, employerOnly, jobseekerOnly } = require("../middleware/auth");

const router = express.Router();

// POST /api/applications/:jobId  (job seeker applies)
router.post("/:jobId", protect, jobseekerOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const exists = await Application.findOne({ job: job._id, applicant: req.user.id });
    if (exists) return res.status(400).json({ message: "You already applied to this job" });

    const application = await Application.create({
      job: job._id,
      applicant: req.user.id,
      coverNote: req.body.coverNote,
    });
    res.status(201).json(application);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/applications/mine  (job seeker's own applications)
router.get("/mine", protect, jobseekerOnly, async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.id })
      .populate("job", "title company location")
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/applications/job/:jobId  (employer sees applicants)
router.get("/job/:jobId", protect, employerOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only view applicants for your own jobs" });
    }
    const applications = await Application.find({ job: job._id })
      .populate("applicant", "name email")
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/applications/:id/status  (employer shortlists or rejects)
router.put("/:id/status", protect, employerOnly, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "shortlisted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const application = await Application.findById(req.params.id).populate("job");
    if (!application) return res.status(404).json({ message: "Application not found" });
    if (application.job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }
    application.status = status;
    await application.save();
    res.json(application);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;