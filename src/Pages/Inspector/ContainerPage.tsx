import * as React from 'react';
import {useState} from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetClassesQuery, useLazyGetObjectQuery,} from "../../API/Inspector";
import {Button, Link} from "@mui/material";
import {JsonRenderer} from "../../Helper/JsonRenderer";
import {DataTable} from "../../Component/Grid";

export const ContainerPage = () => {
    const {data, isLoading} = useGetClassesQuery('');
    const [lazyLoadObject] = useLazyGetObjectQuery();
    const [objects, setObject] = useState<Record<string, any>>({})

    if (isLoading) {
        return <>Loading..</>
    }

    const handleLoadObject = async (id: string) => {
        const result = await lazyLoadObject(id)
        setObject(prev => ({...prev, [id]: result.data}))
    }

    let rows = (data || [] as any).map((v: string) => ({0: v, 1: v in objects ? objects[v] : null}))

    const getColumns = (): GridColDef[] => [
        {
            field: '0', headerName: 'Name', width: 200,
            renderCell: (params: GridRenderCellParams) => <span style={{wordBreak: 'break-all'}}>{params.value}</span>
        },
        {
            field: '1',
            headerName: 'Value',
            width: 1000,
            renderCell: (params: GridRenderCellParams) => {
                if (params.row[1]) {
                    return <JsonRenderer key={params.id} value={params.row[1]}/>
                }

                return <>
                    <Button onClick={() => handleLoadObject(params.row[0])}>Load</Button>
                    <Link href={'view?class=' + params.row[0]}>View</Link>
                </>
            }
        },
    ];


    return (
        <>
            <h2>{'Container'}</h2>
            <DataTable
                rows={rows as GridValidRowModel[]}
                getRowId={(row) => row[0]}
                columns={getColumns()}
            />
        </>
    );
}
