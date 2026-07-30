export interface DashboardData {
    stats: DashboardStats;
    performance: DashboardPerformance;
    activities: DashboardActivity[];
    system: DashboardSystemHealth[];
    distribution: CaseDistribution[];
    escalation: EscalationQueue;
  }
  
  export interface DashboardStats {
    activeChats: number;
    reportsToday: number;
    pendingRouting: number;
    criticalCases: number;
  }
  
  export interface DashboardPerformance {
    accuracy: number;
    responseTime: number;
    resolutionRate: number;
    escalationRate: number;
  }
  
  export interface DashboardActivity {
    id: string;
    type: "classification" | "routing" | "dispatch" | "error";
    description: string;
    timestamp: string;
  }
  
  export interface DashboardSystemHealth {
    label: string;
    value: string;
    healthy: boolean;
  }
  
  export interface CaseDistribution {
    category: string;
    count: number;
  }
  
  export interface EscalationQueue {
    waiting: number;
    oldest: string;
    high: number;
    medium: number;
    low: number;
  }