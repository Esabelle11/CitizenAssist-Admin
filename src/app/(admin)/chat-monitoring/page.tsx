"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/header";
import { DataTableToolbar } from "@/components/shared/data-table-toolbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n/context";
import { chatSessions, chatMessages } from "@/lib/mock-data";
import { formatDate, cn } from "@/lib/utils";

export default function ChatMonitoringPage() {
  const { t } = useI18n();
  const [search, setSearch] = useState("");
  const [selectedChat, setSelectedChat] = useState(chatSessions[0]?.chat_id ?? "");
  const cm = t.chatMonitoring;

  const filteredSessions = chatSessions.filter(
    (s) =>
      s.chat_id.toLowerCase().includes(search.toLowerCase()) ||
      s.user_identifier.toLowerCase().includes(search.toLowerCase())
  );

  const messages = chatMessages.filter((m) => m.chat_id === selectedChat);

  return (
    <>
      <PageHeader title={cm.title} subtitle={cm.subtitle} />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">{cm.sessions}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <DataTableToolbar search={search} onSearchChange={setSearch} />
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredSessions.map((session) => (
                <li key={session.chat_id}>
                  <button
                    onClick={() => setSelectedChat(session.chat_id)}
                    className={cn(
                      "w-full px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50",
                      selectedChat === session.chat_id && "bg-blue-50 dark:bg-blue-950/30"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs">{session.chat_id}</span>
                      <Badge className={session.status === "active" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : "bg-gray-100 text-gray-500"}>
                        {session.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">{session.message_count} messages · {formatDate(session.last_message_at)}</p>
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">{cm.messages} — {selectedChat}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.message_id}
                  className={cn(
                    "rounded-lg p-4",
                    msg.role === "user"
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "bg-blue-50 dark:bg-blue-950/30"
                  )}
                >
                  <div className="mb-1 flex items-center justify-between">
                    <Badge className={msg.role === "user" ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300" : "bg-blue-200 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"}>
                      {msg.role}
                    </Badge>
                    <span className="text-xs text-gray-400">{formatDate(msg.created_at)}</span>
                  </div>
                  <p className="text-sm">{msg.content}</p>
                  {Object.keys(msg.metadata).length > 0 && (
                    <pre className="mt-2 overflow-x-auto rounded bg-black/5 p-2 text-xs dark:bg-white/5">
                      {JSON.stringify(msg.metadata, null, 2)}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
