import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { RoutingResult } from "@/types/simulator";


interface Props {
  routing?: RoutingResult;
}



export function RoutingCard({
  routing
}: Props) {

  if (!routing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>  Agency Routing </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            No agency routing required for this conversation.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (

    <Card>
      
      <CardHeader>
        <CardTitle> Agency Routing </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex justify-between">
          <span className="text-muted-foreground"> Status </span>
          <span className="font-medium"> {routing.status}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground"> Agency </span>
          <span className="font-medium"> {routing.target_agency}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-muted-foreground"> Missing Field </span>
          <div className="flex flex-wrap gap-2">
            {routing.missing_fields?.length ? (
              routing.missing_fields.map((field) => (
                <span
                  key={field}
                  className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800"
                >
                  {field.replace(/_/g, " ")}
                </span>
              ))
            ) : (
              <span className="text-sm text-muted-foreground">
                None
              </span>
            )}
          </div>
        </div>

    
      </CardContent>

    </Card>

  );
}