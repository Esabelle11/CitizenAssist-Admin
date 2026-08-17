import {Card, CardHeader, CardTitle,  CardContent, } from "@/components/ui/card";
  
interface Props {
  data: {
    waiting: number;
    oldest: string;
    high: number;
    medium: number;
    low: number;
  };
}

export function EscalationQueue({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Human Review Queue</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Waiting</span>
          <span>{data.waiting}</span>
        </div>

        <div className="flex justify-between">
          <span>Oldest</span>
          <span>{data.oldest}</span>
        </div>

        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between">
            <span>High Priority</span>
            <span>{data.high}</span>
          </div>

          <div className="flex justify-between">
            <span>Medium Priority</span>
            <span>{data.medium}</span>
          </div>

          <div className="flex justify-between">
            <span>Low Priority</span>
            <span>{data.low}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}