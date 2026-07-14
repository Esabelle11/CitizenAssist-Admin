"use client";

import { CrudPage } from "@/components/crud/CrudPage";

import {agencyRoutingColumns,agencyRoutingFields,transformAgencyRoutingSubmit} from "@/features/agency-routing/config";

import { useHooks } from "@/features/agency-routing/hooks";

export default function Page() {
  const crud = useHooks();

  return (
    <CrudPage
      title="Agency Routing"
      data={crud.rules}
      columns={agencyRoutingColumns}
      fields={agencyRoutingFields}
      create={crud.add}
      update={crud.update}
      remove={crud.remove}
      searchableFields={[
        "category_code",
        "agency_name",
        "keywords"
      ]}
      transformSubmit={transformAgencyRoutingSubmit}
    />
  );
}