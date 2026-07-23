
import {ColumnConfig,FormFieldConfig}from "@/components/crud/types";   
import {TrackedIncident}from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatDate, urgencyColor, statusColor } from "@/lib/utils";

export const trackedIncidentColumns: ColumnConfig<TrackedIncident>[] = [
  {
    accessorKey:"id",
    header:"ID"
  },
  {
    accessorKey:"category",
    header:"Category"
  },
  {
    accessorKey:"urgency_level",
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
    accessorKey:"dispatch_status",
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
    accessorKey:"gps_lat",
    header:"GPS",
    render(value, row){
      return row.gps_lat && row.gps_lng
        ? `${row.gps_lat.toFixed(4)}, ${row.gps_lng.toFixed(4)}`
        : "—";
    }
  },
  {
    accessorKey:"updated_at",
    header:"Udated At",
    render(value) {
      return value ? formatDate(value) : "-";
    },
  },
];




export const trackedIncidentFields: FormFieldConfig[] = [
  {
    name:"id",
    label:"Incident Id",
    type:"text",
    dataType:"text",
  },
  {
    name:"chat_id",
    label:"Chat Id",
    type:"text",
    dataType:"text",
  },
  {
    name:"category",
    label:"Category",
    type:"text",
    dataType:"text",
  },
  {
    name:"urgency_level",
    label:"Default Urgency",
    type:"select",
    dataType:"text",
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
    name:"dispatch_status",
    label:"Status",
    type:"text",
    dataType:"text",
  },
  {
    name:"extracted_metadata",
    label:"Metadata Schema JSON",
    type:"textarea",
    dataType:"json",
  },
];


