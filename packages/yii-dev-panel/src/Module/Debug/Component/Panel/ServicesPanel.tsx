import {TabContext, TabPanel} from '@mui/lab';
import TabList from '@mui/lab/TabList';
import {Tab, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import {GridColDef, GridValidRowModel} from '@mui/x-data-grid';
import {DataTable} from '@yiisoft/yii-dev-panel-sdk/Component/Grid';
import {concatClassMethod} from '@yiisoft/yii-dev-panel-sdk/Helper/classMethodConcater';
import {formatMillisecondsAsDuration} from '@yiisoft/yii-dev-panel-sdk/Helper/formatDate';
import {SyntheticEvent, useMemo, useState} from 'react';

type SummaryItemType = {
    class: string;
    method: string;
    count: number;
    successCount: number;
    times: number[];
};

type AllItemType = {
    service: string;
    class: string;
    method: string;
    time: number;
    success: number;
};

const summaryColumns: GridColDef<SummaryItemType>[] = [
    {
        field: 'class',
        headerName: 'Call',
        flex: 1,
        renderCell: ({row}) => {
            console.log('ro', row);
            return (
                <Typography component="span" sx={{wordBreak: 'break-word'}}>
                    {concatClassMethod(row.class, row.method)}
                </Typography>
            );
        },
    },
    {
        field: 'calls',
        headerName: 'Calls (Total / Error)',
        flex: 1,
        renderCell: ({row}) => {
            const errors = row.count - row.successCount;
            return (
                <>
                    {row.count} {errors > 0 && <> / {errors}</>}
                </>
            );
        },
    },
    {
        field: 'time',
        headerName: 'Time (Total / Avg)',
        flex: 1,
        renderCell: ({row}) => {
            const errors = row.count - row.successCount;
            console.log('row.times', row.times);
            const total = row.times.reduce((acc, v) => acc + v, 0);
            const milliseconds = total / row.times.length;
            return (
                <>
                    {formatMillisecondsAsDuration(total)} / {formatMillisecondsAsDuration(milliseconds)}
                </>
            );
        },
    },
];
const allColumns: GridColDef<AllItemType>[] = [
    {
        field: 'class',
        headerName: 'Call',
        width: 250,
        renderCell: ({row}) => {
            return (
                <Typography component="span" sx={{wordBreak: 'break-word'}}>
                    {concatClassMethod(row.class, row.method)}
                </Typography>
            );
        },
    },
    {
        field: 'time',
        headerName: 'Time',
        width: 250,
        renderCell: ({row}) => formatMillisecondsAsDuration(row.time),
    },
];

type Tabs = 'summary' | 'all';
type ServiceData = {
    service: string;
    class: string;
    method: string;
    arguments: any[];
    result: any;
    status: 'success' | 'error';
    error: null | string;
    timeStart: number;
    timeEnd: number;
};
type ServicesPanelProps = {
    data: ServiceData[];
};

export const ServicesPanel = ({data}: ServicesPanelProps) => {
    const [value, setValue] = useState<Tabs>('summary');

    const handleChange = (event: SyntheticEvent, newValue: Tabs) => {
        setValue(newValue);
    };

    const allRows = useMemo(() => {
        if (!Array.isArray(data)) {
            return [];
        }
        console.log('processing ', data);
        return data.map(
            (el) =>
                ({
                    service: el.service,
                    class: el.class,
                    method: el.method,
                    success: Number(el.status === 'success'),
                    time: el.timeEnd - el.timeStart,
                } as AllItemType),
        );
    }, [data]);

    const summaryRows = useMemo(() => {
        const result = {};
        for (const el of allRows) {
            const key = el.class + el.method;
            console.log('key', key);
            if (key in result) {
                result[key].count = result[key].count + 1;
                result[key].successCount = result[key].successCount + el.success;
                result[key].times = [...result[key].times, el.time];
            } else {
                result[key] = {
                    class: el.class,
                    method: el.method,
                    count: 1,
                    successCount: el.success,
                    times: [el.time],
                };
            }
        }
        // const res = [];
        // for (let [k, resultElement] of result) {
        //     res.push(k);
        // }
        //
        // console.group('start');
        // console.log([
        //     res,
        //     Array.from(result),
        //     Array.from(result.entries()),
        //     Array.from(result.values()),
        //     Array.from(result[Symbol.iterator]()),
        // ]);
        // console.groupEnd();
        return result;
    }, [allRows]);

    if (!data || data.length === 0) {
        return <>Nothing here</>;
    }
    console.log('summary', summaryRows);
    return (
        <TabContext value={value}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={handleChange}>
                    <Tab label={'Summary'} value={'summary'} />
                    <Tab label={'All'} value={'all'} />
                </TabList>
            </Box>
            <TabPanel value={'summary'} sx={{padding: '0'}}>
                <DataTable
                    getRowId={() => Math.random() * 1000}
                    rows={Object.values(summaryRows) as GridValidRowModel[]}
                    columns={summaryColumns}
                />
            </TabPanel>
            <TabPanel value={'all'} sx={{padding: '0'}}>
                <DataTable
                    getRowId={() => Math.random() * 1000}
                    rows={allRows as GridValidRowModel[]}
                    columns={allColumns}
                />
            </TabPanel>
        </TabContext>
    );
};
