import {Card, CardHeader, CardTitle, CardContent,} from "@/components/ui/card";
  
interface Item {
  label: string;
  value: string;
  healthy: boolean;
}
  
interface Props {
  data: Item[];
}
  
export function SystemHealth({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Health</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {data.map((item) => (
          <div key={item.label} className="flex justify-between">
            <span>{item.label}</span>

            <div className="flex items-center gap-2">
              <span>{item.value}</span>

              <div
                className={`w-2 h-2 rounded-full ${
                  item.healthy
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}