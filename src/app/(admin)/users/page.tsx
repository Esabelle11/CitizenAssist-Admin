"use client";

import { CrudPage } from "@/components/crud/CrudPage";

import {userColumns,userFields,transformUserSubmit} from "@/features/users/config";

import { useHooks } from "@/features/users/hooks";

export default function Page() {
  const crud = useHooks();

  return (
    <CrudPage
      title="Agency Routing"
      data={crud.rules}
      columns={userColumns}
      fields={userFields}
      create={crud.add}
      update={crud.update}
      remove={crud.remove}
      searchableFields={[
        "full_name",
        "email",
        "role"
      ]}
      transformSubmit={transformUserSubmit}
    />
  );
}