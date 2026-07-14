export type CrudMode =
  | "create"
  | "edit"
  | "view";


export interface ColumnConfig<T = any> {
  accessorKey: keyof T;
  header: string;
  enableHiding?: boolean;
  enableColumnOrdering?: boolean;
  size?: number;
  render?: (
    value:any,
    row:T
  ) => React.ReactNode;
}



export interface FormFieldConfig {
  name:string;
  // label:string;
  label:
    | string
    | ((mode: "create" | "edit" | "view") => string);

  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "date"
    | "datetime"
    | "json"
    | "file";
  dataType:string;
  grid?:number;
  defaultValue?:any;
  required?:boolean;
  disabled?:boolean;
  hide?:boolean;
  hideInCreate?:boolean;
  hideInEdit?:boolean;
  hideInView?:boolean;
  helperText?:string;
  options?:{
    value:any;
    label:string;
  }[];
}