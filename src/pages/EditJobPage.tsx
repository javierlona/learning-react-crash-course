import { useLoaderData } from "react-router-dom";
import { useCallback, useState } from "react";
import { Job } from "../types/Job";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type HandleChangeArgs =
  | {
      fieldName: keyof Omit<Job, "company">;
      value: string;
      isCompanyField?: false;
    }
  | { fieldName: keyof Job["company"]; value: string; isCompanyField: true };

type HandleChange = (args: HandleChangeArgs) => void;

const EditJobPage = () => {
  // This is the job data that was loaded by the loader
  const jobData = useLoaderData<Job>();
  const [job, setJob] = useState<Job>(jobData);
  const navigate = useNavigate();

  const handleChange = useCallback<HandleChange>(
    ({ fieldName, value, isCompanyField }) => {
      console.log(fieldName, value);
      setJob((prevJob) => {
        const updatedJob: Job = { ...prevJob, company: { ...prevJob.company } };
        if (isCompanyField) {
          updatedJob.company[fieldName] = value;
        } else {
          updatedJob[fieldName] = value;
        }
        return updatedJob;
      });
    },
    []
  );

  const handleSubmit = useCallback(
    async (job: Job) => {
      try {
        const response = await fetch(`/api/jobs/${job.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(job),
        });

        if (response.ok) {
          toast.success("Job added successfully");
          navigate(`/jobs/${job.id}`);
        } else {
          toast.error("Failed to update job");
          console.error("Failed to update job");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [navigate]
  );

  return (
    <section className="bg-indigo-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form
            onSubmit={() => {
              handleSubmit(job);
            }}
          >
            <h2 className="text-3xl text-center font-semibold mb-6">
              Update Job
            </h2>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Job Type
              </label>
              <select
                id="type"
                className="border rounded w-full py-2 px-3"
                required
                value={job.type}
                onChange={(e) => {
                  handleChange({ fieldName: "type", value: e.target.value });
                }}
              >
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Job Listing Name
              </label>
              <input
                type="text"
                id="title"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Give your job listing a name"
                required
                value={job.title}
                onChange={(e) => {
                  handleChange({ fieldName: "title", value: e.target.value });
                }}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-gray-700 font-bold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                className="border rounded w-full py-2 px-3"
                rows={4}
                placeholder="Add any job duties, expectations, requirements, etc"
                value={job.description}
                onChange={(e) => {
                  handleChange({
                    fieldName: "description",
                    value: e.target.value,
                  });
                }}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="type"
                className="block text-gray-700 font-bold mb-2"
              >
                Salary
              </label>
              <select
                id="salary"
                className="border rounded w-full py-2 px-3"
                required
                value={job.salary}
                onChange={(e) => {
                  handleChange({ fieldName: "salary", value: e.target.value });
                }}
              >
                <option value="Under $50K">Under $50K</option>
                <option value="$50K - 60K">$50K - $60K</option>
                <option value="$60K - 70K">$60K - $70K</option>
                <option value="$70K - 80K">$70K - $80K</option>
                <option value="$80K - 90K">$80K - $90K</option>
                <option value="$90K - 100K">$90K - $100K</option>
                <option value="$100K - 125K">$100K - $125K</option>
                <option value="$125K - 150K">$125K - $150K</option>
                <option value="$150K - 175K">$150K - $175K</option>
                <option value="$175K - 200K">$175K - $200K</option>
                <option value="Over $200K">Over $200K</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="border rounded w-full py-2 px-3 mb-2"
                placeholder="Company Location"
                required
                value={job.location}
                onChange={(e) => {
                  handleChange({
                    fieldName: "location",
                    value: e.target.value,
                  });
                }}
              />
            </div>

            <h3 className="text-2xl mb-5">Company Info</h3>

            <div className="mb-4">
              <label
                htmlFor="company"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                className="border rounded w-full py-2 px-3"
                placeholder="Company Name"
                value={job.company.name}
                onChange={(e) => {
                  handleChange({
                    fieldName: "name",
                    value: e.target.value,
                    isCompanyField: true,
                  });
                }}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="companyDescription"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Description
              </label>
              <textarea
                id="companyDescription"
                className="border rounded w-full py-2 px-3"
                rows={4}
                placeholder="What does your company do?"
                value={job.company.description}
                onChange={(e) => {
                  handleChange({
                    fieldName: "description",
                    value: e.target.value,
                    isCompanyField: true,
                  });
                }}
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="contactEmail"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Email
              </label>
              <input
                type="email"
                id="contactEmail"
                className="border rounded w-full py-2 px-3"
                placeholder="Email address for applicants"
                required
                value={job.company.contactEmail}
                onChange={(e) => {
                  handleChange({
                    fieldName: "contactEmail",
                    value: e.target.value,
                    isCompanyField: true,
                  });
                }}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contactPhone"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Phone
              </label>
              <input
                type="tel"
                id="contactPhone"
                className="border rounded w-full py-2 px-3"
                placeholder="Optional phone for applicants"
                value={job.company.contactPhone}
                onChange={(e) => {
                  handleChange({
                    fieldName: "contactPhone",
                    value: e.target.value,
                    isCompanyField: true,
                  });
                }}
              />
            </div>

            <div>
              <button
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Edit Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EditJobPage;
