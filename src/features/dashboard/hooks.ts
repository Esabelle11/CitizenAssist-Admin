import { useEffect, useState } from "react";
import { dashboardService } from "./service";
import { DashboardData } from "@/types/dashboard";
import { DEFAULT_DASHBOARD } from "./config";
import { mockDashboardData } from "@/lib/mock-data";

const USE_MOCK = true;

export function useDashboard() {
  
  const [data, setData] = useState<DashboardData>(DEFAULT_DASHBOARD);
  // const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        if (USE_MOCK) {
          // Simulate API loading delay
          await new Promise((resolve) => setTimeout(resolve, 500));

          setData(mockDashboardData);
        } else {
          const result = await dashboardService.getDashboard();
          setData(result);
        }
      } catch {
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return {
    loading,
    error,
    stats: data?.stats,
    performance: data?.performance,
    activities: data?.activities,
    system: data?.system,
    distribution: data?.distribution,
    escalation: data?.escalation,
  };
}