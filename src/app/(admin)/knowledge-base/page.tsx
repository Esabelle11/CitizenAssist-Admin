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
import { knowledgeEntries } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function KnowledgeBasePage() {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const kb = t.knowledgeBase;

  const filtered = knowledgeEntries.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase()) ||
      e.search_summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageHeader title={kb.title} subtitle={kb.subtitle} />
      <Card>
        <CardContent className="p-6">
          <DataTableToolbar search={search} onSearchChange={setSearch} onAdd={() => {}} addLabel={t.common.add} />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{kb.category}</TableHead>
                <TableHead>{kb.name}</TableHead>
                <TableHead>{kb.searchSummary}</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead>{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                      {entry.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{entry.name}</TableCell>
                  <TableCell className="max-w-xs truncate text-gray-500">{entry.search_summary}</TableCell>
                  <TableCell>
                    <Badge className={entry.is_active ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-gray-100 text-gray-500"}>
                      {entry.is_active ? t.common.active : t.common.inactive}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">{formatDate(entry.updated_at)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
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
