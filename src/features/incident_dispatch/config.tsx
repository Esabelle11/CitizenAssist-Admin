
import {ColumnConfig,FormFieldConfig}from "@/components/crud/types";   
import {IncidentDispatch}from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatDate, urgencyColor, statusColor } from "@/lib/utils";

export const incidentDispatchColumns: ColumnConfig<IncidentDispatch>[] = [
  {
    accessorKey:"id",
    header:"ID"
  },
  {
    accessorKey:"incident_id",
    header:"Incident"
  },
  {
    accessorKey:"target_agency",
    header:"Agency"
  },

  {
    accessorKey:"channel_used",
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
    accessorKey:"destination_address",
    header:"Destination",
  },
  {
    accessorKey:"status",
    header:"Status",
    render(value){
      return (
        <Badge className={statusColor(value)}>
          {value}
        </Badge>
      );
    }
  },
 
  {
    accessorKey:"created_at",
    header:"Created At",
    render(value) {
      return value ? formatDate(value) : "-";
    },
  },
];




export const incidentDispatchFields: FormFieldConfig[] = [
  {
    name:"id",
    label:"Dispatch Id",
    type:"text",
    dataType:"text",
  },
  {
    name:"incident_id",
    label:"Incident Id",
    type:"text",
    dataType:"text",
  },
  {
    name:"target_agency",
    label:"Agency",
    type:"text",
    dataType:"text",
  },
  {
    name:"channel_used",
    label:"Channel",
    type:"text",
    dataType:"text",
  },
  {
    name:"status",
    label:"Status",
    type:"text",
    dataType:"text",
  },
  {
    name:"payload",
    label:"Metadata Schema JSON",
    type:"textarea",
    dataType:"json",
  },
];


