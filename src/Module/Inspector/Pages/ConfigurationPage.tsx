import * as React from 'react';
import {useState} from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetConfigurationQuery, useLazyGetObjectQuery} from '../API/Inspector';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import {Button} from '@mui/material';
import {DataTable} from '../../../Component/Grid';

export const ConfigurationPage = () => {
    const {data, isLoading} = useGetConfigurationQuery('web');
    const [lazyLoadObject] = useLazyGetObjectQuery();
    const [objects, setObject] = useState<Record<string, any>>({});

    const columns: GridColDef[] = [
        {
            field: '0',
            headerName: 'Name',
            width: 200,
            renderCell: (params: GridRenderCellParams) => <span style={{wordBreak: 'break-all'}}>{params.value}</span>,
        },
        {
            field: '1',
            headerName: 'Value',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                if (typeof params.value === 'string') {
                    if (params.value in objects) {
                        return <JsonRenderer value={objects[params.value]} />;
                    }
                    if (!params.value.match(/^[\w\\]+$/i)) {
                        return <JsonRenderer value={params.value} />;
                    }
                    return (
                        <>
                            {params.value}
                            <Button onClick={() => handleLoadObject(params.value)}>Load</Button>
                        </>
                    );
                }
                return <JsonRenderer value={params.value} />;
            },
        },
    ];

    const handleLoadObject = async (id: string) => {
        const result = await lazyLoadObject(id);
        setObject((prev) => ({...prev, [id]: result.data}));
    };
    if (isLoading) {
        return <>Loading..</>;
    }
    const isArray = Array.isArray(data);
    let rows = Object.entries(data || ([] as any));
    rows = rows.map((el) => ({0: el[0], 1: isArray ? Object.assign({}, el[1]) : el[1]})) as any;

    return (
        <>
            <h2>{'Configuration'}</h2>
            <DataTable rows={rows as GridValidRowModel[]} getRowId={(row) => row[0]} columns={columns} />
        </>
    );
};
