"use client";

import { useMemo, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";

import { PageHeader } from "@/components/layout/header";
import { DataTableToolbar } from "@/components/shared/data-table-toolbar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { CrudTable } from "./CrudTable";
import { CrudDialog } from "./CrudDialog";
import { ConfirmDialog } from "./ConfirmDialog";

import {ColumnConfig,FormFieldConfig,CrudMode,} from "./types";



interface CrudPageProps<T extends { id: string | number }> {
  title: string;
  subtitle?: string;
  data: T[];
  loading?: boolean;
  columns: ColumnConfig<T>[];
  fields: FormFieldConfig[];
  create(data: Partial<T>): Promise<void>;
  update(id: T["id"],data: Partial<T>): Promise<void>;
  remove(id: T["id"]): Promise<void>;
  searchableFields?: (keyof T)[];
  transformSubmit?:(data:any)=>any;
}



export function CrudPage<T extends { id:string | number }>({
  title,
  subtitle,
  data,
  columns,
  fields,
  create,
  update,
  remove,
  searchableFields = [],
  transformSubmit,
}:CrudPageProps<T>) {

  const [search,setSearch] =useState("");
  const [mode,setMode] =useState<CrudMode|null>(null);
  const [selected,setSelected] =useState<T|null>(null);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);


  const filtered = useMemo(()=>{
    if(!search.trim()) return data;

    return data.filter((row)=> searchableFields.some((key)=>{
      const value = row[key];
      if(Array.isArray(value))
        return value.join(" ").toLowerCase().includes(search.toLowerCase());
        return String(value).toLowerCase().includes(search.toLowerCase());
    }));

    },[search,data,searchableFields]
  );

  function handleCreate(){
    setSelected(null);
    setMode("create");
  }

  function handleView(row:T){
    setSelected(row);
    setMode("view");
  }

  function handleEdit(row:T){
    setSelected(row);
    setMode("edit");
  }

  function handleDelete(row: T) {
    setDeleteTarget(row);
  }


  async function confirmDelete(){
    if(!deleteTarget) return;
    try {
      setDeleteLoading(true);
      await remove(deleteTarget.id);
    }
    finally {
      setDeleteLoading(false);
      setDeleteTarget(null);
    }
  }



  return (
    <>
      <PageHeader title={title} subtitle={subtitle}/>

      <Card>
        <CardContent className="p-6">
          <DataTableToolbar search={search} onSearchChange={setSearch} onAdd={handleCreate} addLabel="Add"/>

          <CrudTable
            data={filtered}
            columns={columns}
            actions={(row)=>(
              <div className="flex gap-1">
                <Button variant="ghost" size="icon" onClick={()=>handleView(row)}>
                  <Eye className="h-4 w-4"/>
                </Button>

                <Button variant="ghost" size="icon" onClick={()=>handleEdit(row)}>
                  <Pencil className="h-4 w-4"/>
                </Button>

                <Button variant="ghost" size="icon" onClick={()=>handleDelete(row)}>
                  <Trash2 className="h-4 w-4 text-red-500"/>
                </Button>
              </div>
            )}
          />

        </CardContent>
      </Card>

      <CrudDialog
        open={mode !== null}
        mode={mode ?? "create"}
        data={selected ?? {}}
        fields={fields}
        onClose={()=>{
          setMode(null);
          setSelected(null);
        }}
        onSubmit={
          async(payload)=>{
            const finalPayload =transformSubmit?transformSubmit(payload):payload;
            if(mode==="create"){ await create(finalPayload);}
            if(mode==="edit" && selected){ await update(selected.id,finalPayload);}
            setMode(null);
            setSelected(null);
          }
        }
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Record"
        description={deleteTarget?`Are you sure you want to delete this record?`:""}
        loading={deleteLoading}
        onCancel={()=>{setDeleteTarget(null);}}
        onConfirm={confirmDelete}
      />

    </>
  );
}