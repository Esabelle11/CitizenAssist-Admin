"use client";

import { useMemo, useState } from "react";

import { PageHeader } from "@/components/layout/header";
import { DataTableToolbar } from "@/components/shared/data-table-toolbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useI18n } from "@/lib/i18n/context";
import { cn, formatDate } from "@/lib/utils";

import { useHooks } from "@/features/chat-monitoring/hooks";

export default function ChatMonitoringPage() {
  const { t } = useI18n();
  const cm = t.chatMonitoring;

  const [search, setSearch] = useState("");
  const [expandedMetadata, setExpandedMetadata] = useState<Set<string>>(new Set());

  const {
    sessions,
    messages,
    selectedChat,
    selectChat,
    loading,
    messageLoading,
  } = useHooks();

  const filteredSessions = useMemo(() => {
    if (!search.trim()) return sessions;

    const keyword = search.toLowerCase();

    return sessions.filter(
      (session) =>
        session.id.toLowerCase().includes(keyword) ||
        session.user_display_name.toLowerCase().includes(keyword)
    );
  }, [search, sessions]);

  function toggleMetadata(messageId: string) {
    setExpandedMetadata((prev) => {
      const next = new Set(prev);
  
      if (next.has(messageId)) {
        next.delete(messageId);
      } else {
        next.add(messageId);
      }
  
      return next;
    });
  }

  return (
    <>
      <PageHeader
        title={cm.title}
        subtitle={cm.subtitle}
      />

      <div className="grid gap-6 lg:grid-cols-3">

        {/* Session List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">
              {cm.sessions}
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <DataTableToolbar
              search={search}
              onSearchChange={setSearch}
            />

            {loading ? (
              <div className="p-4 text-sm text-muted-foreground">
                Loading sessions...
              </div>
            ) : (
              <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                {filteredSessions.map((session) => (
                  <li key={session.id}>
                    <button
                      onClick={() => selectChat(session.id)}
                      className={cn(
                        "w-full px-4 py-3 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50",
                        selectedChat === session.id &&
                          "bg-blue-50 dark:bg-blue-950/30"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs">
                          {session.id}
                        </span>

                        {/* <Badge
                          className={
                            session.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-gray-100 text-gray-500"
                          }
                        >
                          {session.status}
                        </Badge> */}
                      </div>

                      <p className="mt-1 text-xs text-gray-500">
                        {session.message_count} messages ·{" "}
                        {formatDate(session.created_at)}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Messages */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">
              {cm.messages}
              {selectedChat && ` — ${selectedChat}`}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {messageLoading ? (
              <div className="text-sm text-muted-foreground">
                Loading messages...
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      "rounded-lg p-4",
                      msg.role === "user"
                        ? "bg-gray-100 dark:bg-gray-800"
                        : "bg-blue-50 dark:bg-blue-950/30"
                    )}
                  >
                    <div className="mb-1 flex items-center justify-between">
                      <Badge
                        className={
                          msg.role === "user"
                            ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                            : "bg-blue-200 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                        }
                      >
                        {msg.role}
                      </Badge>

                      <span className="text-xs text-gray-400">
                        {formatDate(msg.created_at)}
                      </span>
                    </div>

                    <p className="text-sm whitespace-pre-wrap">
                      {msg.content}
                    </p>

                    {msg.metadata &&
                      Object.keys(msg.metadata).length > 0 && (
                        <div className="mt-3">
                          <button
                            onClick={() => toggleMetadata(msg.id)}
                            className="text-xs text-blue-600 hover:underline dark:text-blue-400"
                          >
                            {expandedMetadata.has(msg.id)
                              ? "Hide metadata"
                              : "Show metadata"}
                          </button>

                          {expandedMetadata.has(msg.id) && (
                            <pre className="mt-2 max-h-96 overflow-auto rounded bg-black/5 p-2 text-xs dark:bg-white/5">
                              {JSON.stringify(msg.metadata, null, 2)}
                            </pre>
                          )}
                        </div>
                      )}
                  </div>
                ))}

                {!messageLoading &&
                  selectedChat &&
                  messages.length === 0 && (
                    <div className="text-sm text-muted-foreground">
                      No messages found.
                    </div>
                  )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}