import { useParams, useLoaderData, LoaderFunctionArgs } from "react-router-dom";

const JobPage = () => {
  const { id } = useParams<{ id: string }>();
  const job = useLoaderData<{ title: string }>();
  return <div>{job.title}</div>;
};

const jobLoader = async ({ params }: LoaderFunctionArgs) => {
  const response = await fetch(`/api/jobs/${params.id}`);
  const data = await response.json();
  return data;
};

export { JobPage as default, jobLoader };
