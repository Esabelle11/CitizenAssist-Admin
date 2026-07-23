"use client";

import { useState } from "react";
import { RefreshCw, Eye } from "lucide-react";
import { PageHeader } from "@/components/layout/header";
import { DataTableToolbar } from "@/components/shared/data-table-toolbar";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { dispatches } from "@/lib/mock-data";
import { formatDate, statusColor } from "@/lib/utils";

export default function DispatchPage() {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const dp = t.dispatch;

  const filtered = dispatches.filter(
    (d) =>
      d.target_agency.toLowerCase().includes(search.toLowerCase()) ||
      d.id.toLowerCase().includes(search.toLowerCase()) ||
      d.incident_id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageHeader title={dp.title} subtitle={dp.subtitle} />
      <Card>
        <CardContent className="p-6">
          <DataTableToolbar search={search} onSearchChange={setSearch} />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dispatch ID</TableHead>
                <TableHead>Incident</TableHead>
                <TableHead>{dp.targetAgency}</TableHead>
                <TableHead>{dp.channelUsed}</TableHead>
                <TableHead>{dp.destination}</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead>Dispatched</TableHead>
                <TableHead>{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((dispatch) => (
                <TableRow key={dispatch.id}>
                  <TableCell className="font-mono text-xs">{dispatch.id}</TableCell>
                  <TableCell className="font-mono text-xs">{dispatch.incident_id}</TableCell>
                  <TableCell>{dispatch.target_agency}</TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {dispatch.channel_used}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm text-gray-500">
                    {dispatch.destination_address}
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColor(dispatch.status)}>{dispatch.status}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {dispatch.dispatched_at ? formatDate(dispatch.dispatched_at) : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                      {dispatch.status === "FAILED" && (
                        <Button variant="ghost" size="icon" title={dp.retry}>
                          <RefreshCw className="h-4 w-4 text-orange-500" />
                        </Button>
                      )}
                    </div>
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
