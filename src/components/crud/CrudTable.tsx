"use client";

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {ColumnConfig} from "./types";


interface Props<T>{
 data:T[];
 columns:ColumnConfig<T>[];
 actions?:(row:T)=>React.ReactNode;
}


export function CrudTable<T>({data, columns, actions}:Props<T>) {
    return (

        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map(col=>(
                        <TableHead key={String(col.accessorKey)}>
                            {col.header}
                        </TableHead>
                    ))}
                    {actions && <TableHead> Actions </TableHead>}
                </TableRow>
            </TableHeader>
           
            <TableBody>
                {
                    data.map((row:any)=>(
                        <TableRow key={row.id}>
                            {
                                columns.map(col=>(
                                    <TableCell key={String(col.accessorKey)}>
                                        {col.render?
                                        col.render(row[col.accessorKey],row)
                                        :String(row[col.accessorKey])                  
                                        }
                                    </TableCell>
                                ))
                            }
                            {actions && <TableCell>{actions(row)}</TableCell>}
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}