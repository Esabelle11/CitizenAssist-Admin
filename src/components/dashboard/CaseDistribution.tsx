import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

interface Props {
  data: {
    category: string;
    count: number;
  }[];
}

export function CaseDistribution({ data }: Props) {
  const maxCount = Math.max(...data.map((item) => item.count), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Distribution</CardTitle>
      </CardHeader>

      {/* Added max height, overflow-y-auto, and padding right for the scrollbar */}
      <CardContent className="max-h-[220px] overflow-y-auto pr-2 space-y-5">
        {data.map((item) => {
          const percentage = Math.min(Math.max((item.count / maxCount) * 100, 2), 100);

          return (
            <div key={item.category} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{item.category}</span>
                <span className="font-medium">{item.count}</span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}