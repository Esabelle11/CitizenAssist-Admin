"use client";


import { useEffect, useState } from "react";
import { CrudPage } from "@/components/crud/CrudPage";
import { userColumns, userFields, transformUserSubmit } from "@/features/users/config";
import { useHooks } from "@/features/users/hooks";
import { getRoles } from "@/features/users/service";
import { FormFieldConfig } from "@/components/crud/types";


export default function Page() {
  const crud = useHooks();
  const [ fields, setFields] = useState<FormFieldConfig[]>(userFields);

  useEffect(() => {

    async function loadRoles(){
      try {
        const roles = await getRoles();
        const roleOptions =
          roles.map(
            (role:any)=>({
              value: role.id,
              label:role.name
            })
          );

        const updatedFields = userFields.map(
          field=>{
            if(field.name === "role_id"){
              return {
                ...field,
                options: roleOptions
              };
            }
            return field;
          }
        );
        setFields(updatedFields);
      }
      catch(error){
        console.error("Failed loading roles", error);
      }
    }

    loadRoles();

  },[]);

  return (
    <CrudPage
      title="Agency Routing"
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