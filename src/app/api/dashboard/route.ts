import { NextResponse } from "next/server";

import {
 getDashboardStats,
 getAIPerformance,
 getRecentActivity,
 getSystemHealth,
 getEscalationQueue,
 getCaseDistribution
}
from "@/features/dashboard/db";


export async function GET(){


const data={


stats: await getDashboardStats(),


performance: await getAIPerformance(),


activities: await getRecentActivity(),


system: await getSystemHealth(),

distribution: await getCaseDistribution(),


escalation: await getEscalationQueue()


};


return NextResponse.json(data);


}