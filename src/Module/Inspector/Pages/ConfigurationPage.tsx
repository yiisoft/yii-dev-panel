import * as React from 'react';
import {useCallback, useContext, useEffect, useMemo} from 'react';
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
import {LoaderContext, LoaderContextProvider} from '../Context/LoaderContext';
import {DataContext} from '../Context/DataContext';

const columns: GridColDef[] = [
    {
        field: 'id',
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
        field: 'value',
        headerName: 'Value',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            const {loader} = useContext(LoaderContext);
            if (typeof params.value === 'string') {
                if (!params.value.match(/^[\w\\]+$/i)) {
                    return <JsonRenderer value={params.value} />;
                }
                return (
                    <>
                        {params.value}
                        <Button onClick={() => loader(params.row.id)}>Load</Button>
                    </>
                );
            }
            return <JsonRenderer value={params.value} />;
        },
    },
];
export const ConfigurationPage = () => {
    const {data, isLoading} = useGetConfigurationQuery('web');
    const [lazyLoadObject] = useLazyGetObjectQuery();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchString = searchParams.get('filter') || '';

    const {objects, setObjects, insertObject} = useContext(DataContext);

    const handleLoadObject = useCallback(async (id: string) => {
        const result = await lazyLoadObject(id);
        if (result.data) {
            insertObject(id, result.data.object);
        }
    }, []);

    useEffect(() => {
        if (!isLoading && data) {
            const rows = Object.entries(data || ([] as any));
            const objects = rows.map((el) => ({id: el[0], value: el[1]}));

            setObjects(objects);
        }
    }, [isLoading]);

    const filteredRows = useMemo(() => {
        const regExp = new RegExp(regexpQuote(searchString || ''), 'i');
        return objects.filter((object) => object.id.match(regExp));
    }, [objects, searchString]);

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
            <LoaderContextProvider loader={handleLoadObject}>
                <DataTable rows={filteredRows as GridValidRowModel[]} getRowId={(row) => row.id} columns={columns} />
            </LoaderContextProvider>
        </>
    );
};
