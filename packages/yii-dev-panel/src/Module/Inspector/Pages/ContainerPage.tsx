import * as React from 'react';
import {useCallback, useContext, useEffect, useMemo} from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetClassesQuery, useLazyGetObjectQuery} from '@yiisoft/yii-dev-panel/Module/Inspector/API/Inspector';
import {Button, IconButton, Tooltip} from '@mui/material';
import {JsonRenderer} from '@yiisoft/yii-dev-panel-sdk/Component/JsonRenderer';
import {DataTable} from '@yiisoft/yii-dev-panel-sdk/Component/Grid';
import {FilterInput} from '@yiisoft/yii-dev-panel-sdk/Component/Form/FilterInput';
import {regexpQuote} from '@yiisoft/yii-dev-panel-sdk/Helper/regexpQuote';
import clipboardCopy from 'clipboard-copy';
import {ContentCopy, OpenInNew} from '@mui/icons-material';
import {FullScreenCircularProgress} from '@yiisoft/yii-dev-panel-sdk/Component/FullScreenCircularProgress';
import {useSearchParams} from 'react-router-dom';
import {DataContext} from '@yiisoft/yii-dev-panel/Module/Inspector/Context/DataContext';
import {LoaderContext, LoaderContextProvider} from '@yiisoft/yii-dev-panel/Module/Inspector/Context/LoaderContext';

const TempComponent = (params: GridRenderCellParams) => {
    const {loader} = useContext(LoaderContext);
    if (params.row.value) {
        return <JsonRenderer key={params.id} value={params.value} />;
    }

    return <Button onClick={() => loader(params.row.id)}>Load</Button>;
};
const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Name',
        width: 200,
        renderCell: (params: GridRenderCellParams) => {
            const value = params.value;
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
        field: 'value',
        headerName: 'Value',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => <TempComponent {...params} />,
    },
];

export const ContainerPage = () => {
    const {data, isLoading} = useGetClassesQuery('');
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
            setObjects(
                data.map((row) => ({
                    id: row,
                    value: null,
                })),
            );
        }
    }, [isLoading]);

    const filteredRows: any = useMemo(() => {
        const regExp = new RegExp(regexpQuote(searchString || ''), 'i');
        return objects.filter((object: any) => object.id.match(regExp));
    }, [objects, searchString]);

    const onChangeHandler = useCallback(async (value: string) => {
        setSearchParams({filter: value});
    }, []);

    if (isLoading) {
        return <FullScreenCircularProgress />;
    }

    return (
        <>
            <h2>{'Container'}</h2>
            <FilterInput value={searchString} onChange={onChangeHandler} />
            <LoaderContextProvider loader={handleLoadObject}>
                <DataTable rows={filteredRows as GridValidRowModel[]} getRowId={(row) => row.id} columns={columns} />
            </LoaderContextProvider>
        </>
    );
};
