"use client";

import { useState } from "react";
import { Eye } from "lucide-react";
import { PageHeader } from "@/components/layout/header";
import { DataTableToolbar } from "@/components/shared/data-table-toolbar";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";
import { incidents } from "@/lib/mock-data";
import { formatDate, urgencyColor, statusColor } from "@/lib/utils";

export default function IncidentsPage() {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const inc = t.incidents;

  const filtered = incidents.filter((i) => {
    const matchesSearch =
      i.category.toLowerCase().includes(search.toLowerCase()) ||
      i.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || i.dispatch_status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <PageHeader title={inc.title} subtitle={inc.subtitle} />
      <Card>
        <CardContent className="p-6">
          <DataTableToolbar search={search} onSearchChange={setSearch}>
            <Select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-40">
              <option value="ALL">All Status</option>
              <option value="PENDING_GPS">Pending GPS</option>
              <option value="PENDING">Pending</option>
              <option value="DISPATCHED">Dispatched</option>
              <option value="RESOLVED">Resolved</option>
              <option value="CLOSED">Closed</option>
            </Select>
          </DataTableToolbar>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>{inc.category}</TableHead>
                <TableHead>{inc.urgency}</TableHead>
                <TableHead>{inc.dispatchStatus}</TableHead>
                <TableHead>{inc.gps}</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((incident) => (
                <TableRow key={incident.id}>
                  <TableCell className="font-mono text-xs">{incident.id}</TableCell>
                  <TableCell>{incident.category}</TableCell>
                  <TableCell>
                    <Badge className={urgencyColor(incident.urgency_level)}>{incident.urgency_level}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColor(incident.dispatch_status)}>{incident.dispatch_status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {incident.gps_lat ? `${incident.gps_lat.toFixed(4)}, ${incident.gps_lng?.toFixed(4)}` : "—"}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{formatDate(incident.created_at)}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
