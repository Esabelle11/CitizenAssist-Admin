"use client";

import { CrudPage } from "@/components/crud/CrudPage";

import {trackedIncidentColumns,trackedIncidentFields} from "@/features/incident/config";

import { useHooks } from "@/features/incident/hooks";

export default function Page() {
  const crud = useHooks();

  return (
    <CrudPage
      title="Incident Tracking"
      subtitle="Track and manage citizen-reported cases"
      data={crud.rules}
      columns={trackedIncidentColumns}
      fields={trackedIncidentFields}
      searchableFields={[
        "category",
        "urgency_level",
        "dispatch_status"
      ]}
    />
  );
}