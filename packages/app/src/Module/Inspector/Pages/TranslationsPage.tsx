import * as React from 'react';
import {useCallback, useContext, useMemo, useState} from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetTranslationsQuery, usePutTranslationsMutation} from '@yii-dev-panel/app/Module/Inspector/API/Inspector';
import {JsonRenderer} from '@yii-dev-panel/sdk/Component/JsonRenderer';
import {DataTable} from '@yii-dev-panel/sdk/Component/Grid';
import {FullScreenCircularProgress} from '@yii-dev-panel/sdk/Component/FullScreenCircularProgress';
import {useSearchParams} from 'react-router-dom';
import {FilterInput} from '@yii-dev-panel/sdk/Component/Form/FilterInput';
import {regexpQuote} from '@yii-dev-panel/sdk/Helper/regexpQuote';
import {
    TranslationUpdaterContext,
    TranslationUpdaterContextProvider,
} from '@yii-dev-panel/app/Module/Inspector/Context/TranslationUpdaterContext';

const TempComponent = (params: GridRenderCellParams) => {
    const {updater} = useContext(TranslationUpdaterContext);
    return (
        <JsonRenderer
            editable
            onChange={(path, oldValue, newValue) => {
                updater(params.row[0], String(path[0]), String(path[1]), String(newValue));
            }}
            value={params.value}
        />
    );
};
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
        renderCell: (params: GridRenderCellParams) => <TempComponent {...params} />,
    },
];

export const TranslationsPage = () => {
    const {data, isLoading} = useGetTranslationsQuery();
    const [putTranslationsMutation] = usePutTranslationsMutation();
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

    const updateTranslationHandler = useCallback(
        (category: string, locale: string, translation: string, message: string) => {
            const object = {
                category,
                locale,
                translation,
                message,
            };
            console.log(object);
            putTranslationsMutation(object);
        },
        [],
    );
    if (isLoading) {
        return <FullScreenCircularProgress />;
    }
    return (
        <>
            <h2>{'Translations'}</h2>
            <FilterInput value={searchString} onChange={onChangeHandler} />
            <TranslationUpdaterContextProvider updater={updateTranslationHandler}>
                <DataTable rows={filteredRows as GridValidRowModel[]} getRowId={(row) => row[0]} columns={columns} />
            </TranslationUpdaterContextProvider>
        </>
    );
};
