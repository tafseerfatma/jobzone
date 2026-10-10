const express = require("express");
const Job = require("../models/Job");
const { protect, employerOnly } = require("../middleware/auth");

const router = express.Router();

// POST /api/jobs  (employer creates a job)
router.post("/", protect, employerOnly, async (req, res) => {
  try {
    const job = await Job.create({ ...req.body, postedBy: req.user.id });
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET /api/jobs?search=react&location=lucknow  (anyone can browse)
router.get("/", async (req, res) => {
  try {
    const { search, location } = req.query;
    const filter = {};
    if (search) filter.title = { $regex: search, $options: "i" };
    if (location) filter.location = { $regex: location, $options: "i" };

    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/jobs/mine  (employer sees their own jobs)
router.get("/mine", protect, employerOnly, async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.id }).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/jobs/:id  (one job)
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (err) {
    res.status(400).json({ message: "Invalid job id" });
  }
});

// PUT /api/jobs/:id  (owner edits)
router.put("/:id", protect, employerOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only edit your own jobs" });
    }
    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/jobs/:id  (owner deletes)
router.delete("/:id", protect, employerOnly, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    if (job.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "You can only delete your own jobs" });
    }
    await job.deleteOne();
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;