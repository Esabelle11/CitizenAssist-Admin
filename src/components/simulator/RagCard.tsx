import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    
    
export function RagCard({
    documents=[]
}:{documents:any[]}){
    return (
        <Card>
            <CardHeader>
                <CardTitle> Knowledge Retrieved </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-3">
                {documents.map(
                    (doc,i)=>(
                        <div  key={i} className=" border rounded p-3 " >
                            <p className="font-medium">{doc.title}</p>
                            <p className="text-sm">
                                Similarity: {" "} { doc.similarity }
                            </p>
                        </div>
                    )
                )}
            </CardContent>
        </Card>
    ); 
}