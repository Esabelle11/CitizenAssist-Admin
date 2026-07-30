import {
  Bot,
  Route,
  CheckCircle,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const icons = {
  classification: Bot,
  routing: Route,
  dispatch: CheckCircle,
  error: XCircle,
};

const badgeVariant = {
  classification: "default",
  routing: "secondary",
  dispatch: "outline",
  error: "destructive",
} as const;

interface Props {
  data: {
    id: string;
    type: keyof typeof icons;
    description: string;
    timestamp: string;
  }[];
}

export function RecentActivity({ data }: Props) {
  return (
    <Card className="h-[320px] flex flex-col">
  <CardHeader>
    <CardTitle>Recent Activity</CardTitle>
  </CardHeader>

  <CardContent className="flex-1 overflow-y-auto space-y-4">
    {data.length === 0 ? (
      <p className="text-sm text-muted-foreground">
        No recent activity.
      </p>
    ) : (
      data.map((activity) => {
        const Icon = icons[activity.type];

        return (
          <div
            key={activity.id}
            className="flex items-start justify-between gap-3 border-b pb-4 last:border-b-0"
          >
            <div className="flex gap-3 flex-1 min-w-0">
              <Icon className="h-4 w-4 mt-1 shrink-0" />

              <div className="min-w-0">
                <p className="text-sm break-words">
                  {activity.description}
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  {activity.timestamp}
                </p>
              </div>
            </div>

            <Badge>{activity.type}</Badge>
          </div>
        );
      })
    )}
  </CardContent>
</Card>
  );
}