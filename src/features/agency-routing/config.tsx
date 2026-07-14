
import {ColumnConfig,FormFieldConfig}from "@/components/crud/types";   
import {AgencyRouting}from "@/types";
import { Badge } from "@/components/ui/badge";
import { urgencyColor } from "@/lib/utils";

export const agencyRoutingColumns: ColumnConfig<AgencyRouting>[] = [
  {
    accessorKey:"category_code",
    header:"Category Code"
  },
  {
    accessorKey:"agency_name",
    header:"Agency"
  },
  {
    accessorKey:"channel",
    header:"Channel",
    render(value){
      return (
        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
          {value}
        </Badge>
      );
    }
  },
  {
    accessorKey:"default_urgency",
    header:"Urgency",
    render(value){
      return (
        <Badge className={urgencyColor(value)}>
          {value}
        </Badge>
      );
    }
  },
  {
    accessorKey:"is_active",
    header:"Status",
    render(value){
      return (
        <Badge
          className={
            value?
            `bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300`
            :`bg-gray-100 text-gray-500`
          }
        >
          {value ? "Active" : "Inactive" }
        </Badge>
      );
    }
  }
];


export const agencyRoutingInitialValues = {
  category_code: "",
  agency_name: "",
  keywords: "",
  endpoint: "",
  channel: "INTERNAL",
  requires_gps: false,
  trigger_examples: "",
  default_urgency: "MEDIUM",
  metadata_schema: "{}",
  is_active: true,
};


export const agencyRoutingFields: FormFieldConfig[] = [
  {
    name:"category_code",
    label:"Category Code",
    type:"text",
    dataType:"text",
    required:true,
    defaultValue: agencyRoutingInitialValues.category_code
  },
  {
    name:"agency_name",
    label:"Agency Name",
    type:"text",
    dataType:"text",
    required:true,
    defaultValue: agencyRoutingInitialValues.agency_name,
  },
  {
    name:"keywords",
    label:"Keywords",
    type:"text",
    dataType:"text",
    helperText:"Separate keywords with commas",
    defaultValue: agencyRoutingInitialValues.keywords
  },
  {
    name:"channel",
    label:"Channel",
    type:"select",
    dataType:"text",
    defaultValue:agencyRoutingInitialValues.channel,
    options:[
      {
        value:"API_WEBHOOK",
        label:"API Webhook"
      },
      {
        value:"EMAIL",
        label:"Email"
      },
      {
        value:"INTERNAL",
        label:"Internal"
      }
    ]
  },
  {
      name:"endpoint",
      label:"Endpoint",
      type:"text",
      dataType:"text",
      defaultValue: agencyRoutingInitialValues.endpoint
  },
  {
    name:"requires_gps",
    label:"Requires GPS",
    type:"checkbox",
    dataType:"boolean",
    defaultValue: agencyRoutingInitialValues.requires_gps

  },
  {
    name:"default_urgency",
    label:"Default Urgency",
    type:"select",
    dataType:"text",
    defaultValue: agencyRoutingInitialValues.default_urgency,
    options:[
      {
        value:"CRITICAL",
        label:"Critical"
      },
      {
        value:"HIGH",
        label:"High"
      },
      {
        value:"MEDIUM",
        label:"Medium"
      },
      {
        value:"LOW",
        label:"Low"
      }
    ]
  },
  {
    name:"trigger_examples",
    label:"Trigger Examples",
    type:"text",
    dataType:"text",
    helperText:"Separate examples with commas",
    defaultValue: agencyRoutingInitialValues.trigger_examples
  },
  {
    name:"metadata_schema",
    label:"Metadata Schema JSON",
    type:"textarea",
    dataType:"json",
    required:false,
    defaultValue: agencyRoutingInitialValues.metadata_schema
  },
];





export function transformAgencyRoutingSubmit(data:any){

  return {
    ...data,

    keywords:
      Array.isArray(data.keywords)
      ?data.keywords
      :typeof data.keywords === "string"
        ?data.keywords
          .split(",")
          .map((x:string)=>x.trim())
          .filter(Boolean)
        :[],


    metadata_schema:
      typeof data.metadata_schema === "string"
      ?
      (() => {
        try {
          return JSON.parse(data.metadata_schema);
        }
        catch {
          return {};
        }
      })()
      :data.metadata_schema
  };

}


