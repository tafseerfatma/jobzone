# Jobzone

A full-stack MERN job portal. Employers post jobs and review applicants. Job seekers search and apply.

**Live demo:** https://jobzone-fyyi.vercel.app/

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Employer | employer1@gmail.com | Employer12@ |
| Job seeker | jobseeker@gmail.com | Jobseeker1@ |

## Features

- Sign up and log in as an employer or a job seeker
- Employers: post and delete jobs, view applicants, shortlist or reject
- Job seekers: search jobs, apply, track application status
- JWT authentication and role-based access

## Tech stack

React, Vite, React Router, Axios, Node.js, Express, MongoDB Atlas, Mongoose, JWT, bcrypt. Hosted on Vercel (frontend) and Render (backend).

## Run locally

```bash
git clone https://github.com/tafseerfatma/jobzone.git
cd jobzone/server
npm install
npm run dev
```

Create `server/.env` first:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=a_long_random_string
```

In a second terminal:

```bash
cd jobzone/client
npm install
npm run dev
```

Open http://localhost:5173

## Author

Tafseer Fatma - [GitHub](https://github.com/tafseerfatma) - [LinkedIn](https://linkedin.com/in/tafseerr)