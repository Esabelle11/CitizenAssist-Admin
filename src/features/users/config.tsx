
import {ColumnConfig,FormFieldConfig}from "@/components/crud/types";   
import {AdminUser}from "@/types";
import { formatDate } from "@/lib/utils";

export const userColumns: ColumnConfig<AdminUser>[] = [
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "last_login",
    header: "Last Login",
    render(value) {
      return value ? formatDate(value) : "-";
    },
  },
  {
    accessorKey: "created_at",
    header: "Joined Date",
    render(value) {
      return value ? formatDate(value) : "-";
    },
  },
];




export const userFields: FormFieldConfig[] = [

  {
      name:"full_name",
      label:"Full Name",
      type:"text",
      dataType:"text",
      required:true
  },
  
  {
      name:"email",
      label:"Email",
      type:"text",
      dataType:"email",
      required:true
  },
  
  {
      name:"password",
      label:"Password",
      type:"password",
      dataType:"password",
      required:true,
      hideInEdit:true
  },
  
  {
      name:"department",
      label:"Department",
      type:"text",
      dataType:"text",
  },
  
  {
      name:"employee_id",
      label:"Employee ID",
      type:"text",
      dataType:"text",
  },
  
  {
      name:"phone",
      label:"Phone",
      type:"text",
      dataType:"text",
  },
  
  {
      name:"role_id",
      label:"Role",
      type:"select",
      dataType:"text",
      options:[]
  },
 
];



export function transformUserSubmit(data:any){
  return {
    ...data,
  };
}


