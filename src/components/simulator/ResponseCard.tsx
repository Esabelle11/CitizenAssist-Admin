import {  Card,CardContent, CardHeader,CardTitle } from "@/components/ui/card";
    
    
export function ResponseCard({
    response
}:{response:string}){
    return (
    
        <Card>
            <CardHeader>
                <CardTitle>Citizen Response </CardTitle>
            </CardHeader>
            
            <CardContent>
                <p>{response} </p>
            </CardContent>
        </Card>
    
    );
    
}