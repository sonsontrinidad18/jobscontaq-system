import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const formData = await request.formData();

  const updates = {
    hsw_name: formData.get("hsw_name"),
    medical: formData.get("medical"),
    contract_status: formData.get("contract_status"),
    owwa_pdos: formData.get("owwa_pdos"),
    tesda_infosheet: formData.get("tesda_infosheet"),
    nbi: formData.get("nbi"),
    biometrics: formData.get("biometrics"),
    oec_in: formData.get("oec_in"),
    oec_out: formData.get("oec_out"),
    visa_stamping: formData.get("visa_stamping"),
    remarks_2: formData.get("remarks_2"),
    deployment_date: formData.get("deployment_date"),
  };

  await supabase
    .from("workers")
    .update(updates)
    .eq("id", id);

  return NextResponse.redirect(
    new URL(`/workers/${id}`, request.url)
  );
}