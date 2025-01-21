import {
  useLoaderData,
  LoaderFunctionArgs,
  LoaderFunction,
} from "react-router-dom";
import { Job } from "../types/Job";

const JobPage = () => {
  const job = useLoaderData<Job>();
  return <div>{job.description}</div>;
};

const jobLoader: LoaderFunction = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(`/api/jobs/${params.id}`);
  const data = await response.json();
  return data;
};

export { JobPage as default, jobLoader };
