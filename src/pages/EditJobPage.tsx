import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { Job } from "../types/Job";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EditJobPage = () => {
  const job = useLoaderData<Job>();
  return <div>{job.title}</div>;
};

export default EditJobPage;
