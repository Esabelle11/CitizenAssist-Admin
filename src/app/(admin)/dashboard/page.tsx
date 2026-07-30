"use client";
import { PageHeader } from "@/components/layout/header";
import { useI18n } from "@/lib/i18n/context";
import { useDashboard } from "@/features/dashboard/hooks";

import { StatCards } from "@/components/dashboard/StatCards";
import { AIPerformanceCard } from "@/components/dashboard/AIPerformanceCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { SystemHealth } from "@/components/dashboard/SystemHealth";
import { CaseDistribution } from "@/components/dashboard/CaseDistribution";
import { EscalationQueue } from "@/components/dashboard/EscalationQueue";


export default function DashboardPage() {
  const { t } = useI18n();
  const d = t.dashboard;

  const {
    stats,
    performance,
    activities,
    system,
    distribution,
    escalation,
    loading
  } = useDashboard();


  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <>
      <PageHeader title={d.title} subtitle={d.subtitle} />

      <StatCards data={stats}/>

      <div className="mt-6 grid grid-cols-2 gap-6">

        <AIPerformanceCard data={performance}/>

        <CaseDistribution data={distribution} />

        <RecentActivity data={activities}/>

        <SystemHealth data={system}/>

      </div>

      <div className="mt-6">
        <EscalationQueue data={escalation}/>
      </div>

    </>
  );
}