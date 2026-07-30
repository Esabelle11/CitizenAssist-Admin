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
    return (
      <Card>
        <CardHeader>
          <CardTitle>Case Distribution</CardTitle>
        </CardHeader>
  
        <CardContent className="space-y-4">
          {data.map((item) => (
            <div key={item.category}>
              <div className="flex justify-between">
                <span>{item.category}</span>
  
                <span>{item.count}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }