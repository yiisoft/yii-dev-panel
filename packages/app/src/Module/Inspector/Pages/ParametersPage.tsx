import * as React from 'react';
import {useCallback, useMemo} from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetParametersQuery} from '@yii-dev-panel/app/Module/Inspector/API/Inspector';
import {JsonRenderer} from '@yii-dev-panel/sdk/Component/JsonRenderer';
import {DataTable} from '@yii-dev-panel/sdk/Component/Grid';
import {FilterInput} from '@yii-dev-panel/sdk/Component/Form/FilterInput';
import {regexpQuote} from '@yii-dev-panel/sdk/Helper/regexpQuote';
import {useSearchParams} from 'react-router-dom';
import {FullScreenCircularProgress} from '@yii-dev-panel/sdk/Component/FullScreenCircularProgress';

const columns: GridColDef[] = [
    {field: '0', headerName: 'Name', width: 130},
    // { field: 'value', headerName: 'Value', width: 130 },
    {
        field: '1',
        headerName: 'Value',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => <JsonRenderer key={params.id} value={params.value} />,
    },
];

export const ParametersPage = () => {
    const {data, isLoading} = useGetParametersQuery();
    const [searchParams, setSearchParams] = useSearchParams();
    const searchString = searchParams.get('filter') || '';

    const rows = useMemo(() => {
        const isArray = Array.isArray(data);
        let rows = Object.entries(data || ([] as any));
        rows = rows.map((el) => ({0: el[0], 1: isArray ? Object.assign({}, el[1]) : el[1]})) as any;
        return rows;
    }, [data]);

    const filteredRows = useMemo(() => {
        const regExp = new RegExp(regexpQuote(searchString), 'i');
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
            <h2>{'Parameters'}</h2>
            <FilterInput value={searchString} onChange={onChangeHandler} />
            <div style={{width: '100%'}}>
                <DataTable rows={filteredRows as GridValidRowModel[]} getRowId={(row) => row[0]} columns={columns} />
            </div>
        </>
    );
};
