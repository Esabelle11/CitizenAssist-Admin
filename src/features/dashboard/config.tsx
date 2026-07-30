import { DashboardData } from "@/types/dashboard";


export const DEFAULT_DASHBOARD: DashboardData = {
  stats: {
    activeChats: 0,
    reportsToday: 0,
    pendingRouting: 0,
    criticalCases: 0,
  },

  performance: {
    accuracy: 0,
    responseTime: 0,
    resolutionRate: 0,
    escalationRate: 0,
  },

  activities: [],

  system: [],

  distribution: [],

  escalation: {
    waiting: 0,
    oldest: "-",
    high: 0,
    medium: 0,
    low: 0,
  },
};