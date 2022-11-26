import * as React from 'react';
import {useMemo, useState} from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetClassesQuery, useLazyGetObjectQuery} from '../API/Inspector';
import {Button, IconButton, Tooltip} from '@mui/material';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import {DataTable} from '../../../Component/Grid';
import {FilterInput} from '../../../Component/Form/FilterInput';
import {regexpQuote} from '../../../Helper/regexpQuote';
import clipboardCopy from 'clipboard-copy';
import {ContentCopy, OpenInNew} from '@mui/icons-material';
import {FullScreenCircularProgress} from '../../../Component/FullScreenCircularProgress';

export const ContainerPage = () => {
    const {data, isLoading} = useGetClassesQuery('');
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
            renderCell: (params: GridRenderCellParams) => {
                const value = params.value as string;
                return (
                    <div style={{wordBreak: 'break-all'}}>
                        <Tooltip title="Copy">
                            <IconButton size="small" onClick={() => clipboardCopy(value)}>
                                <ContentCopy fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Examine as a container entry">
                            <IconButton size="small" target="_blank" href={'/inspector/container/view?class=' + value}>
                                <OpenInNew fontSize="small" />
                            </IconButton>
                        </Tooltip>
                        {value}
                    </div>
                );
            },
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
                    </>
                );
            },
        },
    ];

    if (isLoading) {
        return <FullScreenCircularProgress />;
    }

    return (
        <>
            <h2>{'Container'}</h2>
            <FilterInput onChange={setSearchString} />
            <DataTable rows={filteredRows as GridValidRowModel[]} getRowId={(row) => row[0]} columns={getColumns()} />
        </>
    );
};
