import * as React from 'react';
import {useMemo, useState} from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetParametersQuery} from '../API/Inspector';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import {DataTable} from '../../../Component/Grid';
import {FilterInput} from '../../../Component/Form/FilterInput';
import {regexpQuote} from '../../../Helper/regexpQuote';

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
    const {data} = useGetParametersQuery();
    const [searchString, setSearchString] = useState<string>('');

    const rows = useMemo(() => {
        const isArray = Array.isArray(data);
        let rows = Object.entries(data || ([] as any));
        rows = rows.map((el) => ({0: el[0], 1: isArray ? Object.assign({}, el[1]) : el[1]})) as any;
        return rows;
    }, [data]);

    const filteredRows = useMemo(() => {
        const regExp = new RegExp(regexpQuote(searchString || ''), 'i');
        return rows.filter((object) => object[0].match(regExp));
    }, [rows, searchString]);

    return (
        <>
            <h2>{'Parameters'}</h2>
            <FilterInput onChange={setSearchString} />
            <div style={{height: 400, width: '100%'}}>
                <DataTable rows={filteredRows as GridValidRowModel[]} getRowId={(row) => row[0]} columns={columns} />
            </div>
        </>
    );
};
