"use client";

import { CrudPage } from "@/components/crud/CrudPage";

import {incidentDispatchColumns,incidentDispatchFields} from "@/features/incident_dispatch/config";

import { useHooks } from "@/features/incident_dispatch/hooks";

export default function Page() {
  const crud = useHooks();

  return (
    <CrudPage
      title="Dispatch Management"
      data={crud.rules}
      columns={incidentDispatchColumns}
      fields={incidentDispatchFields}
      searchableFields={[
        "incident_id",
        "id",
        "target_agency"
      ]}
    />
  );
}