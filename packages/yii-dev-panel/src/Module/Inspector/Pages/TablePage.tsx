import * as React from 'react';
import {useCallback, useEffect, useState} from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetTableQuery} from '@yiisoft/yii-dev-panel/Module/Inspector/API/Inspector';
import {DataTable} from '@yiisoft/yii-dev-panel-sdk/Component/Grid';
import {FullScreenCircularProgress} from '@yiisoft/yii-dev-panel-sdk/Component/FullScreenCircularProgress';
import {useParams} from 'react-router-dom';
import {Breadcrumbs, Link, Typography} from '@mui/material';

export const TablePage = () => {
    const {table} = useParams();
    const {data, isLoading} = useGetTableQuery(table);
    const [primaryKey, setPrimaryKey] = useState<string>('');
    const [columns, setColumns] = useState<GridColDef[]>([]);
    const [records, setRecords] = useState<GridValidRowModel[]>([]);

    useEffect(() => {
        if (data) {
            const columns = [];
            console.log(data);
            // @ts-ignore
            for (const column of data.columns) {
                console.log('column', column);
                columns.push({
                    field: column.name,
                    headerName: column.name,
                    flex: 1,
                    renderCell: (params: GridRenderCellParams) => (
                        <span style={{wordBreak: 'break-all', maxHeight: '100px', overflowY: 'hidden'}}>
                            {params.value}
                        </span>
                    ),
                });
            }
            // @ts-ignore
            setPrimaryKey(data.primaryKeys[0]);
            // @ts-ignore
            setRecords(data.records);
            setColumns(columns);
        }
    }, [isLoading]);

    const getRowIdCallback = useCallback((row: any) => row[primaryKey], [primaryKey]);

    if (isLoading) {
        return <FullScreenCircularProgress />;
    }

    return (
        <>
            <h2>
                <Breadcrumbs>
                    <Link underline="hover" color="inherit" href={'/inspector/database'}>
                        Database
                    </Link>
                    <Typography>{table}</Typography>
                </Breadcrumbs>
            </h2>
            <DataTable rows={records as GridValidRowModel[]} getRowId={getRowIdCallback} columns={columns} />
        </>
    );
};
