"use client";

import { useState } from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { PageHeader } from "@/components/layout/header";
import { DataTableToolbar } from "@/components/shared/data-table-toolbar";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { useHooks } from "@/features/agency-routing/hooks";
import { formatDate, urgencyColor } from "@/lib/utils";
import { AgencyRoutingForm } from "@/features/agency-routing/components/form";
import { AgencyRouting } from "@/types";

export default function AgencyRoutingPage() {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
 
  const [mode, setMode] = useState<
  "create" | "edit" | "view" | null
>(null);

const [selected, setSelected] =
  useState<AgencyRouting | null>(null);
  const tr = t.agencyRouting;

  const {
    rules,
    loading,
    add,
    remove,
    update
   } = useHooks();

  const filtered = rules.filter(
    (r) =>
      r.category_code.toLowerCase().includes(search.toLowerCase()) ||
      r.agency_name.toLowerCase().includes(search.toLowerCase()) ||
      r.keywords.some((k) => k.toLowerCase().includes(search.toLowerCase()))
  );

  function handleCreate(){

    setSelected(null);
  
    setMode("create");
  
  }
  
  
  function handleView(rule:AgencyRouting){
  
    setSelected(rule);
  
    setMode("view");
  
  }
  
  
  function handleEdit(rule:AgencyRouting){
  
    setSelected(rule);
  
    setMode("edit");
  
  }
  
  
  async function handleDelete(rule:AgencyRouting){
  
    const confirmed =
      window.confirm(
        "Delete this routing rule?"
      );
  
  
    if(!confirmed)
      return;
  
  
    await remove(rule.id);
  
  }

  return (
    <>
      <PageHeader title={tr.title} subtitle={tr.subtitle} />
      <Card>
        <CardContent className="p-6">
          <DataTableToolbar
            search={search}
            onSearchChange={setSearch}
            onAdd={handleCreate}
            addLabel={t.common.add}
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tr.categoryCode}</TableHead>
                <TableHead>{tr.agencyName}</TableHead>
                <TableHead>{tr.keywords}</TableHead>
                <TableHead>{tr.channel}</TableHead>
                <TableHead>{tr.defaultUrgency}</TableHead>
                <TableHead>{tr.requiresGps}</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead>{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-mono text-xs font-medium">{rule.category_code}</TableCell>
                  <TableCell>{rule.agency_name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {rule.keywords.slice(0, 3).map((kw) => (
                        <Badge key={kw} className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                          {kw}
                        </Badge>
                      ))}
                      {rule.keywords.length > 3 && (
                        <Badge className="bg-gray-100 text-gray-500 dark:bg-gray-800">+{rule.keywords.length - 3}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {rule.channel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={urgencyColor(rule.default_urgency)}>{rule.default_urgency}</Badge>
                  </TableCell>
                  <TableCell>{rule.requires_gps ? "✓" : "—"}</TableCell>
                  <TableCell>
                    <Badge className={rule.is_active ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-gray-100 text-gray-500"}>
                      {rule.is_active ? t.common.active : t.common.inactive}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {/* <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button> */}
                      <Button
variant="ghost"
size="icon"
onClick={() => handleView(rule)}
>
  <Eye className="h-4 w-4"/>
</Button>
                      {/* <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button> */}
                      <Button
variant="ghost"
size="icon"
onClick={() => handleEdit(rule)}
>
  <Pencil className="h-4 w-4"/>
</Button>
                      {/* <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button> */}
                      <Button
variant="ghost"
size="icon"
onClick={() => handleDelete(rule)}
>
  <Trash2 className="h-4 w-4 text-red-500"/>
</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
         

          <AgencyRoutingForm

open={mode !== null}

mode={mode ?? "create"}

data={selected}

onClose={()=>{
  setMode(null);
  setSelected(null);
}}

onSubmit={async(payload)=>{

  if(mode==="create"){

    await add(payload);

  }


  if(mode==="edit" && selected){

    await update(
      selected.id,
      payload
    );

  }


  setMode(null);

  setSelected(null);

}}

/>


            
        </CardContent>
      </Card>
    </>
  );
}
