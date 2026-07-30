"use client";

import { CrudPage } from "@/components/crud/CrudPage";

import {informationBaseColumns,informationBaseFields,transforminformationBaseSubmit} from "@/features/information-base/config";

import { useHooks } from "@/features/information-base/hooks";

export default function Page() {
  const crud = useHooks();

  return (
    <CrudPage
      title="Information Base"
      subtitle="Manage AI knowledge entries for citizen assistance"
      data={crud.rules}
      columns={informationBaseColumns}
      fields={informationBaseFields}
      create={crud.add}
      update={crud.update}
      remove={crud.remove}
      searchableFields={[
        "category",
        "name",
      ]}
      transformSubmit={transforminformationBaseSubmit}
    />
  );
}