import { Card, CardContent, CardHeader,  CardTitle } from "@/components/ui/card";
import type { IntentAnalysis } from "@/types/simulator";


interface Props {
    analysis: IntentAnalysis;
}

    
export function IntentCard({
    analysis
}:Props){
    return (
        <Card>
            <CardHeader>
                <CardTitle> Intent Analysis </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3" >
                <div>
                    Intent:
                    <b> {" "} {analysis.intent_type}</b>
                </div>

                <div>
                    Category:
                    <b> {" "} {analysis.category}</b>
                </div>

                <div>
                    Urgency:
                    <b> {" "} {analysis.urgency}</b>
                </div>
                    
                <div>
                    Confidence:
                    <b> {" "}{ (analysis.confidence*100).toFixed(0) }% </b>
                </div>

                <div>
                    <p className="font-medium mb-2">Extracted Entities</p>

                    {analysis.extracted_entities &&
                    Object.keys(analysis.extracted_entities).length > 0 ? (
                        <div className="space-y-1 text-sm">
                        {Object.entries(analysis.extracted_entities).map(([key, value]) => (
                            <div key={key} className="flex justify-between gap-4">
                            <span className="text-muted-foreground capitalize">
                                {key.replace(/_/g, " ")}
                            </span>

                            <span className="font-medium">
                                {String(value)}
                            </span>
                            </div>
                        ))}
                        </div>
                    ) : (
                        <span className="text-muted-foreground">
                        None
                        </span>
                    )}
                </div>
                
                <div>
                    Requires GPS:
                    <b>{" "} {analysis.requires_immediate_gps ?"YES" :"NO"}</b>
                </div>
            </CardContent> 
        </Card>
    );
}