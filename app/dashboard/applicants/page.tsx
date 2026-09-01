import { getRows } from "@/lib/google-sheets";
import ApplicantsTable from "./table";

export const dynamic = "force-dynamic";

export default async function Applicants() {
  const data = (await getRows<any>("applicants")).sort((a,b) => String(b.created_at).localeCompare(String(a.created_at)));
  return <ApplicantsTable rows={data} />;
}
