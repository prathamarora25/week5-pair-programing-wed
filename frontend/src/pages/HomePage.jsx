import { useEffect, useState } from "react";
import JobListing from "../components/JobListing";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [jobType, setJobType] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const url = jobType
          ? `/api/jobs/type/${jobType}`
          : "/api/jobs";

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setJobs([]);
      }
    };

    fetchJobs();
  }, [jobType]);

  return (
    <div className="home">
      <h2>Jobs</h2>

      <label htmlFor="jobType">Filter by job type:</label>

      <select
        id="jobType"
        value={jobType}
        onChange={(e) => setJobType(e.target.value)}
      >
        <option value="">All Jobs</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
      </select>

      <div className="job-list">
        {jobs.length === 0 && <p>No jobs found</p>}

        {jobs.length !== 0 &&
          jobs.map((job) => <JobListing key={job.id} {...job} />)}
      </div>
    </div>
  );
};

export default Home;