import * as React from 'react';
import {useEffect, useState} from 'react';
import {GridColDef, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useGetRoutesQuery} from '../API/Inspector';
import {DataTable} from '../../../Component/Grid';
import {IconButton, Tooltip, Typography} from '@mui/material';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import {FullScreenCircularProgress} from '../../../Component/FullScreenCircularProgress';
import clipboardCopy from 'clipboard-copy';
import {ContentCopy, OpenInNew} from '@mui/icons-material';
import {concatClassMethod} from '../../../Helper/classMethodConcater';

const columns: GridColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        width: 150,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <Typography component="span" sx={{wordBreak: 'break-word'}}>
                    {params.value}
                </Typography>
            );
        },
    },
    {
        field: 'method',
        headerName: 'method',
        width: 80,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <Typography component="span" sx={{wordBreak: 'break-word'}}>
                    {params.value}
                </Typography>
            );
        },
    },
    {
        field: 'pattern',
        headerName: 'Pattern',
        width: 300,
        renderCell: (params: GridRenderCellParams) => {
            return (
                <Typography component="span" sx={{wordBreak: 'break-word'}}>
                    {params.value}
                </Typography>
            );
        },
    },
    {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            const value = params.value;
            if (!Array.isArray(value)) {
                return value;
            }
            const className = value[0] as string;
            const methodName = value[1] as string;

            return (
                <div style={{wordBreak: 'break-all'}}>
                    <Tooltip title="Copy">
                        <IconButton
                            size="small"
                            onClick={() => clipboardCopy(concatClassMethod(className, methodName))}
                        >
                            <ContentCopy fontSize="small" />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Examine as a container entry">
                        <IconButton size="small" target="_blank" href={'/inspector/container/view?class=' + className}>
                            <OpenInNew fontSize="small" />
                        </IconButton>
                    </Tooltip>

                    <Typography component="span" sx={{wordBreak: 'break-word'}}>
                        {concatClassMethod(className.split('\\').pop() as string, methodName)}
                    </Typography>
                </div>
            );
        },
    },

    {
        field: 'middlewares',
        headerName: 'Middlewares',
        flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            return <JsonRenderer depth={0} value={params.value} />;
        },
    },
];

function collectGroupsAndRoutes(data: any): RouteType[] {
    const routes: RouteType[] = [];
    let i = 0;
    for (const route of data) {
        let action = undefined;
        if (Array.isArray(route.middlewares)) {
            const lastMiddleware = route.middlewares.at(-1);
            if (Array.isArray(lastMiddleware)) {
                action = [lastMiddleware[0], lastMiddleware[1]];
            }
        }
        for (const method of route.methods.filter((method: string) => !['OPTIONS', 'HEAD'].includes(method))) {
            routes.push({
                id: String(i++),
                name: route.name,
                pattern: route.pattern,
                method: method,
                middlewares: route.middlewares,
                action: action,
            });
        }
    }

    return routes.sort((one, two) => {
        return one.pattern.localeCompare(two.pattern);
    });
}

type RouteType = {
    id: string;
    name: string;
    pattern: string;
    method: string;
    middlewares: any[];
    action: string[] | undefined;
};

export const RoutesPage = () => {
    const {data, isLoading, isSuccess} = useGetRoutesQuery();
    const [routes, setRoutes] = useState<RouteType[]>([]);

    useEffect(() => {
        if (!isSuccess) {
            return;
        }
        const routes = collectGroupsAndRoutes(data);

        setRoutes(routes);
    }, [isSuccess, data]);

    if (isLoading) {
        return <FullScreenCircularProgress />;
    }

    return (
        <>
            <h2>{'Routes'}</h2>
            <DataTable rows={routes as GridValidRowModel[]} getRowId={(row) => row.id} columns={columns} />
        </>
    );
};
