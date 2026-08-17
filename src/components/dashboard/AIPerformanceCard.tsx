import { Card, CardHeader, CardTitle, CardContent,} from "@/components/ui/card";
  
interface Props {
  data: {
    accuracy: number;
    responseTime: number;
    resolutionRate: number;
    escalationRate: number;
  };
}
  
export function AIPerformanceCard({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Performance</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <Metric label="Response Accuracy" value={`${data.accuracy}%`} />
        <Metric label="Average Response Time" value={`${data.responseTime}s`} />
        <Metric label="Successful Resolution" value={`${data.resolutionRate}%`}/>
        <Metric label="Escalation Rate" value={`${data.escalationRate}%`}/>
      </CardContent>
    </Card>
  );
}
  
function Metric({ label, value,}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">
        {label}
      </span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}