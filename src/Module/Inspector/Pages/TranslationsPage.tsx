import * as React from 'react';
import {useCallback, useMemo, useState} from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetTranslationsQuery} from '../API/Inspector';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import {DataTable} from '../../../Component/Grid';
import {FullScreenCircularProgress} from '../../../Component/FullScreenCircularProgress';
import {useSearchParams} from 'react-router-dom';
import {FilterInput} from '../../../Component/Form/FilterInput';
import {regexpQuote} from '../../../Helper/regexpQuote';

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

export const TranslationsPage = () => {
    const {data, isLoading} = useGetTranslationsQuery();
    // const [lazyLoadObject] = useLazyGetObjectQuery();
    const [objects, setObject] = useState<Record<string, any>>({});
    const [searchParams, setSearchParams] = useSearchParams();
    const searchString = searchParams.get('filter') || '';

    const handleLoadObject = async (id: string) => {
        // const result = await lazyLoadObject(id);
        // setObject((prev) => ({...prev, [id]: result.data}));
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
            <h2>{'Translations'}</h2>
            <FilterInput value={searchString} onChange={onChangeHandler} />
            <DataTable rows={filteredRows as GridValidRowModel[]} getRowId={(row) => row[0]} columns={columns} />
        </>
    );
};
