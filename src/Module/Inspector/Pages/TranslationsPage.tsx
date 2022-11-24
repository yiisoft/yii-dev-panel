import * as React from 'react';
import {useMemo, useState} from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetTranslationsQuery} from '../API/Inspector';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import {DataTable} from '../../../Component/Grid';
import {FullScreenCircularProgress} from '../../../Component/FullScreenCircularProgress';

export const TranslationsPage = () => {
    const {data, isFetching} = useGetTranslationsQuery();
    // const [lazyLoadObject] = useLazyGetObjectQuery();
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
            renderCell: (params: GridRenderCellParams) => <JsonRenderer value={params.value} />,
        },
    ];

    const handleLoadObject = async (id: string) => {
        // const result = await lazyLoadObject(id);
        // setObject((prev) => ({...prev, [id]: result.data}));
    };
    const rows = useMemo(() => {
        const isArray = Array.isArray(data);
        const rows = Object.entries(data || ([] as any));
        return rows.map((el) => ({0: el[0], 1: isArray ? Object.assign({}, el[1]) : el[1]})) as any;
    }, [data]);

    if (isFetching) {
        return <FullScreenCircularProgress />;
    }
    return (
        <>
            <h2>{'Translations'}</h2>
            <DataTable rows={rows as GridValidRowModel[]} getRowId={(row) => row[0]} columns={columns} />
        </>
    );
};
