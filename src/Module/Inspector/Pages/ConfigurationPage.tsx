import * as React from 'react';
import {useCallback, useMemo, useState} from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetConfigurationQuery, useLazyGetObjectQuery} from '../API/Inspector';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import {Button, IconButton, Tooltip} from '@mui/material';
import {DataTable} from '../../../Component/Grid';
import {regexpQuote} from '../../../Helper/regexpQuote';
import {FilterInput} from '../../../Component/Form/FilterInput';
import {ContentCopy, DataObject} from '@mui/icons-material';
import clipboardCopy from 'clipboard-copy';
import {FullScreenCircularProgress} from '../../../Component/FullScreenCircularProgress';
import {useSearchParams} from 'react-router-dom';

export const ConfigurationPage = () => {
    const {data, isLoading} = useGetConfigurationQuery('web');
    const [lazyLoadObject] = useLazyGetObjectQuery();
    const [objects, setObject] = useState<Record<string, any>>({});
    const [searchParams, setSearchParams] = useSearchParams();
    const searchString = searchParams.get('filter') || '';

    const columns: GridColDef[] = [
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
                            <IconButton size="small" href={'/inspector/container/view?class=' + value}>
                                <DataObject fontSize="small" />
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

    const rows = useMemo(() => {
        const isArray = Array.isArray(data);
        const rows = Object.entries(data || ([] as any));
        return rows.map((el) => ({0: el[0], 1: isArray ? Object.assign({}, el[1]) : el[1]}));
    }, [data]);

    const filteredRows = useMemo(() => {
        const regExp = new RegExp(regexpQuote(searchString || ''), 'i');
        return rows.filter((object) => object[0].match(regExp));
    }, [rows, searchString]);

    const onChangeHandler = useCallback(async (value: string) => {
        setSearchParams({filter: value});
    }, []);

    if (isLoading) {
        return <FullScreenCircularProgress />;
    }

    return (
        <>
            <h2>Configuration</h2>
            <FilterInput value={searchString} onChange={onChangeHandler} />
            <DataTable rows={filteredRows as GridValidRowModel[]} getRowId={(row) => row[0]} columns={columns} />
        </>
    );
};
