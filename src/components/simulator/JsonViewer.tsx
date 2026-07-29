import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
    
    
export function JsonViewer({
    data
}:{ data:any}){
    return (
        <Card>
            
            <CardHeader>
                <CardTitle> Raw JSON </CardTitle>
            </CardHeader>
                
            <CardContent>
                <pre className=" overflow-auto rounded bg-black p-4 text-xs text-white " >
                    {JSON.stringify(data, null,2) }
                </pre>
            </CardContent>

        </Card>
    );
}