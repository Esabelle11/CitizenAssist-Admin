import { MessageSquare, AlertTriangle, Send, AlertOctagon,} from "lucide-react";
  
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const cards = [
  {
    key: "activeChats",
    label: "Active Chats",
    icon: MessageSquare,
    color: "text-blue-600 bg-blue-50 dark:bg-blue-950/50",
  },
  {
    key: "reportsToday",
    label: "Reports Today",
    icon: AlertTriangle,
    color: "text-orange-600 bg-orange-50 dark:bg-orange-950/50",
  },
  {
    key: "pendingRouting",
    label: "Pending Routing",
    icon: Send,
    color: "text-yellow-600 bg-yellow-50 dark:bg-yellow-950/50",
  },
  {
    key: "criticalCases",
    label: "Critical Cases",
    icon: AlertOctagon,
    color: "text-red-600 bg-red-50 dark:bg-red-950/50",
  },
];
  
interface Props {
  data: {
    activeChats: number;
    reportsToday: number;
    pendingRouting: number;
    criticalCases: number;
  };
}
  
export function StatCards({ data }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(({ key, label, icon: Icon, color }) => (
        <Card key={key}>
          <CardContent className="flex items-center gap-4 p-6">
            <div className={cn( "flex h-12 w-12 items-center justify-center rounded-xl", color )} >
              <Icon className="h-6 w-6" />
            </div>

            <div>
              <p className="text-2xl font-bold">
                {data[key as keyof typeof data]}
              </p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}