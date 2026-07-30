"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Route,
  BookOpen,
  AlertTriangle,
  MessageSquare,
  Send,
  Users,
  Bot,
  FlaskConical,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n/context";

const navItems = [
  { href: "/users", icon: Users, key: "users" as const },
  { href: "/dashboard", icon: LayoutDashboard, key: "dashboard" as const },
  { href: "/agency-routing", icon: Route, key: "agencyRouting" as const },
  { href: "/knowledge-base", icon: BookOpen, key: "knowledgeBase" as const },
  { href: "/chat-monitoring", icon: MessageSquare, key: "chatMonitoring" as const },
  { href: "/incidents", icon: AlertTriangle, key: "incidents" as const },
  { href: "/dispatch", icon: Send, key: "dispatch" as const },
  { href: "/ai-config", icon: Bot, key: "aiConfig" as const },
  { href: "/simulator", icon: FlaskConical, key: "simulator" as const },
];

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useI18n();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="flex items-center gap-3 border-b border-gray-200 px-5 py-5 dark:border-gray-800">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
          <Shield className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-sm font-bold leading-tight">{t.appName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{t.appSubtitle}</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {navItems.map(({ href, icon: Icon, key }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-gray-100"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {t.nav[key]}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
