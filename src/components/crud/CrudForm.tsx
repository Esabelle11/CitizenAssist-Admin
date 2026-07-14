"use client";

import { useEffect, useState } from "react";
import { FormFieldConfig } from "./types";
import { Button } from "@/components/ui/button";


interface Props {
  fields: FormFieldConfig[];
  data:any;
  mode:
    | "create"
    | "edit"
    | "view";
  onSubmit(data:any):Promise<void>;
  onClose():void;
}


export function CrudForm({
  fields,
  data,
  mode,
  onSubmit,
  onClose
}:Props){

  const readOnly =mode === "view";

  function generateInitialData(){
    return fields.reduce(
      (acc, field)=>{
        let value =data?.[field.name]??field.defaultValue??"";
  
        // Handle arrays first
        if(Array.isArray(value)){
          value =value.join(", ");
        }
        else if( // Handle objects
          typeof value === "object" && value !== null
        ){
          value =JSON.stringify(value,null, 2);
        }

        acc[field.name] = value;
  
        return acc;
      },{} as Record<string,any>
    );
  }

  const [form,setForm] = useState(generateInitialData());

  useEffect(()=>{
    setForm(generateInitialData());
  },[data,fields]);


  function updateField(key:string,value:any){
    setForm(prev=>({
      ...prev,
      [key]:value
    }));
  }

  async function submit(){
    await onSubmit(form);
  }

  const visibleFields = fields.filter((field) => {
    if (field.hide) return false;
  
    if (mode === "create" && field.hideInCreate) return false;
    if (mode === "edit" && field.hideInEdit) return false;
    if (mode === "view" && field.hideInView) return false;
  
    return true;
  });

  return (

    <div className="space-y-4">

      {visibleFields
        .map(field=>(
          <div key={field.name} className="space-y-1">
            <label className="text-sm font-medium">
            {
              typeof field.label === "function"
                ? field.label(mode)
                : field.label
            }
            </label>

            {field.type==="textarea"&&
              <textarea
                className="border rounded p-2 w-full"
                disabled={readOnly ||field.disabled}
                value={form[field.name] ?? ""}
                onChange={
                  e=>updateField(
                    field.name,
                    e.target.value
                  )
                }
              />
            }

            {(field.type==="text"|| field.type === "email" ||field.type === "password") &&
              <input
                type={field.type}
                className="border rounded p-2 w-full"
                disabled={readOnly ||  field.disabled}
                value={form[field.name] ?? ""}
                onChange={
                  e=>updateField(
                    field.name,
                    e.target.value
                  )
                }
              />
            }

            {field.type==="number" &&
              <input
                type="number"
                className="border rounded p-2 w-full"
                disabled={readOnly || field.disabled}
                value={form[field.name] ?? ""}
                onChange={
                  e=>updateField(
                    field.name,
                    Number(e.target.value)
                  )
                }
              />
            }

            {
              field.type==="select"&&
                <select className="border rounded p-2 w-full"
                  disabled={readOnly ||field.disabled}
                  value={form[field.name] ?? ""}
                  onChange={
                    e=>updateField(
                      field.name,
                      e.target.value
                    )
                  }
                >

                  <option value="">
                    Select...
                  </option>

                  {field.options?.map(
                      (opt)=>(
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      )
                    )
                  }
                </select>
            }


            {field.type==="checkbox" &&
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  disabled={readOnly ||field.disabled}
                  checked={
                    Boolean(form[field.name])
                  }
                  onChange={e=> updateField(
                      field.name,
                      e.target.checked
                    )
                  }
                />
                <span>
                {
                  typeof field.label === "function"
                    ? field.label(mode)
                    : field.label
                }
                </span>
              </div>
            }


            {field.helperText &&
              <p className="text-xs text-gray-500">
                {field.helperText}
              </p>
            }

          </div>


        ))
      }


      <div className="flex justify-end gap-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        {
          mode !== "view" &&
          <Button onClick={submit}>
            {mode==="create"?"Create":"Update"}
          </Button>
        }
      </div>

    </div>

  );


}