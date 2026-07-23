
import {ColumnConfig,FormFieldConfig}from "@/components/crud/types";   
import {InformationBase}from "@/types";
import { formatDate } from "@/lib/utils";

export const informationBaseColumns: ColumnConfig<InformationBase>[] = [
  {
    accessorKey:"category",
    header:"Category"
  },
  {
    accessorKey:"name",
    header:"Name"
  },
  {
    accessorKey: "search_summary",
    header: "Summary",
    render(value) {
      return (
        <div
          className="max-w-xs truncate"
          title={value}
        >
          {value}
        </div>
      );
    },
  },
  {
    accessorKey:"updated_at",
    header:"Udated At",
    render(value) {
      return value ? formatDate(value) : "-";
    },
  },
];


export const informationBaseInitialValues = {
  category: "",
  name: "",
  search_summary: "",
  content: "",
  is_active: true,
};


export const informationBaseFields: FormFieldConfig[] = [
  {
    name:"category",
    label:"Category",
    type:"text",
    dataType:"text",
    required:true,
    defaultValue: informationBaseInitialValues.category
  },
  {
    name:"name",
    label:"Name",
    type:"text",
    dataType:"text",
    required:true,
    defaultValue: informationBaseInitialValues.name,
  },
  {
    name:"search_summary",
    label:"Summary Searching",
    type:"text",
    dataType:"text",
    helperText:"Summary for RAG purpose",
    defaultValue: informationBaseInitialValues.search_summary
  },
  {
    name:"content",
    label:"Content",
    type:"textarea",
    dataType:"text",
    defaultValue: informationBaseInitialValues.content
  },
];





export function transforminformationBaseSubmit(data:any){

  return {
    ...data,
  };

}


