import { createClient } from "@/lib/supabase/server";
import { safe } from "@/helper/safe"

export async function getDashboardStats() {
  const supabase = await createClient();
  
  const oneMinuteAgo = new Date( Date.now() - 60 * 1000 ).toISOString();
  
  const [ activeChats, reportsToday, pendingRouting, criticalCases,] = await Promise.all([
    
    supabase
    .from("chat_sessions")
    .select("*", {
        head: true,
        count: "exact",
    })
    .gte("updated_at", oneMinuteAgo),

    supabase
    .from("incident_dispatches")
    .select("*", {
        head: true,
        count: "exact",
    })
    .gte(
        "created_at",
        new Date().toISOString().slice(0, 10)
    ),

    supabase
    .from("incident_dispatches")
    .select("*", {
        head: true,
        count: "exact",
    })
    .eq("status", "PENDING"),

    supabase
    .from("incident_dispatches")
    .select("*", {
        head: true,
        count: "exact",
    })
    .eq("priority", "HIGH"),

  ]);
  
  return {
      activeChats: activeChats.count ?? 0,
      reportsToday: reportsToday.count ?? 0,
      pendingRouting: pendingRouting.count ?? 0,
      criticalCases: criticalCases.count ?? 0,
  };
}


export async function getAIPerformance() {
  //table : ai_interactions
  return {
      accuracy: 0,
      responseTime: 0,
      resolutionRate: 0,
      escalationRate: 0, 
  };
}


export async function getRecentActivity() {

    const supabase = await createClient();
  
    const { data } = await supabase
      .from("incident_dispatches")
      .select("*")
      .order("created_at", {
        ascending: false,
      })
      .limit(10);
  
    return (
      data?.map((item) => ({ 
        id: item.id,
        type: "dispatch",
        description: `Incident dispatched to ${item.agency_name}`,
        timestamp: item.created_at,
      })) ?? []
    );
}



export async function getSystemHealth() {

  const supabase = await createClient();

  const { count } = await supabase
    .from("agency_routing")
    .select("*", {
      head: true,
      count: "exact",
    });

  const { data: knowledge } = await supabase
    .from("informations")
    .select("updated_at")
    .order("updated_at", {
      ascending: false,
    })
    .limit(1);

  return [
    {
      label: "AI Service",
      value: "Operational",
      healthy: true,
    },
    {
      label: "WhatsApp Gateway",
      value: "Connected",
      healthy: true,
    },
    {
      label: "Knowledge Base",
      value: knowledge?.[0]?.updated_at ?? "Never",
      healthy: true,
    },
    {
      label: "Agency Routing",
      value: `${count ?? 0} rules`,
      healthy: true,
    },
    {
      label: "Malay Language",
      value: "Enabled",
      healthy: true,
    },

  ];
  
}

export async function getCaseDistribution() {

  const supabase = await createClient();

  const { data } = await supabase
    .from("incident_dispatches")
    .select("incident_type");

  const map = new Map<string, number>();

  data?.forEach((row) => {
    map.set(
      row.incident_type,
      (map.get(row.incident_type) ?? 0) + 1
    );
  });

  return Array.from(map.entries()).map(
    ([category, count]) => ({
      category,
      count,
    })
  );

}

export async function getEscalationQueue() {

    const supabase = await createClient();
  
    const { data } = await supabase 
      .from("incident_dispatches") 
      .select("*")
      .eq("status", "PENDING");
  
    const oldest = data?.[0]?.created_at;
  
    return {
      waiting: data?.length ?? 0, 
      oldest: oldest ?? "-",  
      high:
        data?.filter( 
          (x) => x.priority === "HIGH" 
        ).length ?? 0, 
      medium:
        data?.filter(
          (x) => x.priority === "MEDIUM"
        ).length ?? 0, 
      low:
        data?.filter( 
          (x) => x.priority === "LOW" 
        ).length ?? 0,  
    }; 
}


export async function getDashboardData() {
    const [stats, performance, activities, system, distribution, escalation] =
    await Promise.all([
      safe(getDashboardStats, {
        activeChats: 0,
        reportsToday: 0,
        pendingRouting: 0,
        criticalCases: 0,
      }),
      safe(getAIPerformance, {
        accuracy: 0,
        responseTime: 0,
        resolutionRate: 0,
        escalationRate: 0,
      }),
      safe(getRecentActivity, []),
      safe(getSystemHealth, []),
      safe(getCaseDistribution, []),
      safe(getEscalationQueue, {
        waiting: 0,
        oldest: "-",
        high: 0,
        medium: 0,
        low: 0,
      }),
    ]);

  return {
    stats,
    performance,
    activities,
    system,
    distribution,
    escalation,
  };
}