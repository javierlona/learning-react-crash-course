export type Job = {
  id: string;
  type: string;
  title: string;
  description: string;
  salary: string;
  location: string;
  company: Company;
};

type Company = {
  name: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
};
