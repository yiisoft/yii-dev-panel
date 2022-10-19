import * as React from 'react';
import {useEffect, useState} from 'react';
import {GridColDef, GridColumns, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetConfigurationQuery} from "../API/Inspector";
import {DataTable} from "../../../Component/Grid";
import {Typography} from "@mui/material";
import {JsonRenderer} from "../../../Component/JsonRenderer";

const groupsColumns: GridColDef[] = [
    {
        field: 'prefix', headerName: 'Prefix', width: 150,
        renderCell: (params: GridRenderCellParams) => {
            return <>
                {params.value}
            </>

        }
    },
    {
        field: 'routes', headerName: 'Routes', width: 700,
        renderCell: (params: GridRenderCellParams) => {
            return <>
                {params.value.map((route: any, index: number) => (
                    <Typography key={index} component="div">{route}</Typography>
                ))}
            </>

        }
    },
    {
        field: 'middlewares', headerName: 'Middlewares', width: 700,
        renderCell: (params: GridRenderCellParams) => {
            return <JsonRenderer depth={0} value={params.value} />
        }
    },
];

const routesColumns: GridColDef[] = [
    {
        field: 'name', headerName: 'Name', width: 150,
        renderCell: (params: GridRenderCellParams) => {
            return <>
                {params.value}
            </>

        }
    },
    {
        field: 'pattern', headerName: 'Pattern', width: 300,
        renderCell: (params: GridRenderCellParams) => {
            return <>
                [{params.row.methods.join('|')}]: {params.value}
            </>

        }
    },
    {
        field: 'middlewares', headerName: 'Middlewares', flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            return <JsonRenderer depth={0} value={params.value} />
        }
    },
];

function renderGrid(data: any, columns: GridColumns) {
    return <DataTable
        rows={data as GridValidRowModel[]}
        columns={columns}
    />;
}

function collectGroupsAndRoutes(data: any, groupPrefix: string, groups: object[], routes: object[], group?: any) {
    for (const datum of data) {
        if ('items' in datum) {
            const group = {
                'id': datum['$__id__$'],
                'prefix': groupPrefix + datum.prefix,
                'routes': datum.items.map((item: any) => item.methods + ': ' +item.pattern),
                'middlewares': datum.middlewareDefinitions || [],
            };
            groups.push(group)
            collectGroupsAndRoutes(datum.items, datum.prefix, groups, routes, group)
        } else {
            routes.push({
                'id': datum['$__id__$'],
                'name': datum.name,
                'pattern': groupPrefix + datum.pattern,
                'methods': datum.methods ?? [],
                'middlewares': [].concat(group?.middlewares || [], datum.middlewareDefinitions || []),
            })
        }

    }
}

export const RoutesPage = () => {
    const {data, isLoading, isSuccess} = useGetConfigurationQuery('routes');
    const [routes, setRoutes] = useState<any>([])
    const [groups, setGroups] = useState<any>([])

    useEffect(() => {
        if (!isSuccess) {
            return;
        }
        const routes: any = [];
        const groups: any = [];

        collectGroupsAndRoutes(data, '', groups, routes);

        setGroups(groups);
        setRoutes(routes);
    }, [isSuccess, data])

    if (isLoading) {
        return <>Loading..</>
    }

    return (
        <>
            <h2>{'Routes'}</h2>
            <h3>{'Groups'}</h3>
            {renderGrid(groups, groupsColumns)}
            <h3>{'Routes'}</h3>
            {renderGrid(routes, routesColumns)}
        </>
    );
}
