"use client";

import {
  MessageSquare,
  AlertTriangle,
  Send,
  AlertOctagon,
  Activity,
  Bot,
  Route,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/layout/header";
import { useI18n } from "@/lib/i18n/context";
import { dashboardStats, recentActivities } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

const statCards = [
  { key: "activeSessions" as const, icon: MessageSquare, color: "text-blue-600 bg-blue-50 dark:bg-blue-950/50" },
  { key: "totalIncidents" as const, icon: AlertTriangle, color: "text-orange-600 bg-orange-50 dark:bg-orange-950/50" },
  { key: "pendingDispatches" as const, icon: Send, color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/50" },
  { key: "criticalCases" as const, icon: AlertOctagon, color: "text-red-600 bg-red-50 dark:bg-red-950/50" },
];

const statValues: Record<string, number> = {
  activeSessions: dashboardStats.activeChatSessions,
  totalIncidents: dashboardStats.totalIncidents,
  pendingDispatches: dashboardStats.pendingDispatches,
  criticalCases: dashboardStats.criticalCases,
};

const activityIcons = {
  classification: Bot,
  routing: Route,
  dispatch: CheckCircle,
  error: XCircle,
};

const activityColors = {
  classification: "text-blue-600",
  routing: "text-purple-600",
  dispatch: "text-green-600",
  error: "text-red-600",
};

export default function DashboardPage() {
  const { t } = useI18n();
  const d = t.dashboard;

  return (
    <>
      <PageHeader title={d.title} subtitle={d.subtitle} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map(({ key, icon: Icon, color }) => (
          <Card key={key}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl", color)}>
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-2xl font-bold">{statValues[key]}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{d[key]}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              {d.recentActivity}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activityIcons[activity.type];
                return (
                  <li key={activity.id} className="flex gap-3">
                    <div className={cn("mt-0.5", activityColors[activity.type])}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{activity.description}</p>
                      <p className="mt-0.5 text-xs text-gray-400">{formatDate(activity.timestamp)}</p>
                    </div>
                    <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      {activity.type}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{d.systemOverview}</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-4">
              {[
                { label: "Agency Routing Rules", value: "4 active", status: "healthy" },
                { label: "Knowledge Base Entries", value: "3 active", status: "healthy" },
                { label: "Supabase Connection", value: "Demo Mode", status: "demo" },
                { label: "AI Model", value: "GPT-4o", status: "healthy" },
                { label: "Supported Languages", value: "English, Malay", status: "healthy" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0 dark:border-gray-800">
                  <dt className="text-sm text-gray-500 dark:text-gray-400">{item.label}</dt>
                  <dd className="flex items-center gap-2">
                    <span className="text-sm font-medium">{item.value}</span>
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        item.status === "healthy" && "bg-green-500",
                        item.status === "demo" && "bg-yellow-500"
                      )}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
