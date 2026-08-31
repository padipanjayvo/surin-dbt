import { createClient } from "@/lib/supabase/server";
import ApplicantsTable from "./table";

export const dynamic = "force-dynamic";

export default async function Applicants() {
  const supabase = await createClient();
  const { data } = await supabase.from("applicants").select("*").order("created_at", { ascending: false });
  return <ApplicantsTable rows={data ?? []} />;
}