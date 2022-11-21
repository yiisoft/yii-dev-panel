import * as React from 'react';
import {useMemo, useState} from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetClassesQuery, useLazyGetObjectQuery} from '../API/Inspector';
import {Button, Link} from '@mui/material';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import {DataTable} from '../../../Component/Grid';
import {FilterInput} from '../../../Component/Form/FilterInput';
import {regexpQuote} from '../../../Helper/regexpQuote';

export const ContainerPage = () => {
    const {data} = useGetClassesQuery('');
    const [lazyLoadObject] = useLazyGetObjectQuery();
    const [objects, setObject] = useState<Record<string, any>>({});
    const [searchString, setSearchString] = useState<string>('');

    const handleLoadObject = async (id: string) => {
        const result = await lazyLoadObject(id);
        setObject((prev) => ({...prev, [id]: result.data}));
    };

    const rows = useMemo(() => {
        return (data || ([] as any)).map((v: string) => ({0: v, 1: v in objects ? objects[v] : null}));
    }, [data, objects]);

    const filteredRows = useMemo(() => {
        const regExp = new RegExp(regexpQuote(searchString || ''), 'i');
        return rows.filter((object: any) => object[0].match(regExp));
    }, [rows, searchString]);

    const getColumns = (): GridColDef[] => [
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
                if (params.row[1]) {
                    return <JsonRenderer key={params.id} value={params.row[1]} />;
                }

                return (
                    <>
                        <Button onClick={() => handleLoadObject(params.row[0])}>Load</Button>
                        <Link href={'view?class=' + params.row[0]}>View</Link>
                    </>
                );
            },
        },
    ];

    return (
        <>
            <h2>{'Container'}</h2>
            <FilterInput onChange={setSearchString} />
            <DataTable rows={filteredRows as GridValidRowModel[]} getRowId={(row) => row[0]} columns={getColumns()} />
        </>
    );
};
