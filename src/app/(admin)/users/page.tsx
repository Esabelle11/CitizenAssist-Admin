"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/layout/header";
import { DataTableToolbar } from "@/components/shared/data-table-toolbar";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n/context";
import { adminUsers } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

const roleColors: Record<string, string> = {
  Admin: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  Operator: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  Viewer: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300",
};

export default function UsersPage() {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const u = t.users;

  const filtered = adminUsers.filter(
    (user) =>
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.full_name.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <PageHeader title={u.title} subtitle={u.subtitle} />
      <Card>
        <CardContent className="p-6">
          <DataTableToolbar
            search={search}
            onSearchChange={setSearch}
            onAdd={() => {}}
            addLabel={t.common.add}
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{u.fullName}</TableHead>
                <TableHead>{u.email}</TableHead>
                <TableHead>{u.role}</TableHead>
                <TableHead>{t.common.status}</TableHead>
                <TableHead>{u.lastLogin}</TableHead>
                <TableHead>{t.common.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.full_name}</TableCell>
                  <TableCell className="text-sm text-gray-500">{user.email}</TableCell>
                  <TableCell>
                    <Badge className={roleColors[user.role]}>{u.roles[user.role]}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={user.is_active ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-gray-100 text-gray-500"}>
                      {user.is_active ? t.common.active : t.common.inactive}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {user.last_login ? formatDate(user.last_login) : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
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
