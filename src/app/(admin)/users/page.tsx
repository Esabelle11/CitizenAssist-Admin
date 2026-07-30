"use client";

import { useEffect, useState } from "react";
import { CrudPage } from "@/components/crud/CrudPage";
import {
  getUserColumns,
  getUserFields,
  transformUserSubmit,
} from "@/features/users/config";
import { useHooks } from "@/features/users/hooks";
import { getRoles } from "@/features/users/service";
import { useI18n } from "@/lib/i18n/context";

export default function Page() {
  const { t } = useI18n();
  const d = t.users;

  const crud = useHooks();

  const userColumns = getUserColumns(t);

  const [roleOptions, setRoleOptions] = useState<
    {
      value: number;
      label: string;
    }[]
  >([]);

  useEffect(() => {
    async function loadRoles() {
      try {
        const roles = await getRoles();

        const options = roles.map((role: any) => ({
          value: role.id,
          label: role.name,
        }));

        setRoleOptions(options);
      } catch (error) {
        console.error("Failed loading roles", error);
      }
    }

    loadRoles();
  }, []);

  /**
   * Rebuild fields whenever language changes
   */
  const userFields = getUserFields(t);

  const fields = userFields.map((field) => {
    if (field.name === "role_id") {
      return {
        ...field,
        options: roleOptions,
      };
    }

    return field;
  });

  return (
    <CrudPage
      title={d.title}
      subtitle={d.subtitle}
      data={crud.rules}
      columns={userColumns}
      fields={fields}
      create={crud.add}
      update={crud.update}
      remove={crud.remove}
      searchableFields={[
        "full_name",
        "email",
      ]}
      transformSubmit={transformUserSubmit}
    />
  );
}