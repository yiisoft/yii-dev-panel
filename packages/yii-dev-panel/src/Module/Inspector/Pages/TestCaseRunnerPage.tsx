import {Check, ContentCopy, Error, FilePresent} from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import {Button, CircularProgress, IconButton, Tooltip, styled, TextField, Stack} from '@mui/material';
import Box from '@mui/material/Box';
import {GridColDef, GridColumns, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {DataTable} from '@yiisoft/yii-dev-panel-sdk/Component/Grid';
import {JsonRenderer} from '@yiisoft/yii-dev-panel-sdk/Component/JsonRenderer';
import {parseFilePathWithLineAnchor} from '@yiisoft/yii-dev-panel-sdk/Helper/filePathParser';
import {useRunCommandMutation} from '@yiisoft/yii-dev-panel/Module/Inspector/API/Inspector';
import clipboardCopy from 'clipboard-copy';
import {useCallback, useState} from 'react';
import Checkbox from '@mui/material/Checkbox';

const CenteredBox = styled(Box)({
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

const columns: GridColDef[] = [
    {
        field: 'checkbox',
        headerName: 'Order',
        width: 80,
        renderCell: (params: GridRenderCellParams) => (
            <CenteredBox key={params.id}>
                <Checkbox />
            </CenteredBox>
        ),
    },
    {
        field: 'name',
        headerName: 'Name',
        width: 300,
        renderCell: (params: GridRenderCellParams) => (
            <span key={params.id} style={{wordBreak: 'break-all'}}>
                {params.value}
            </span>
        ),
    },
    {
        field: 'parameters',
        headerName: 'Parameters',
        width: 150,
        renderCell: (params: GridRenderCellParams) => (
            <Stack direction={'column'}>
                <TextField placeholder={'Parameter 1'} />
                <TextField placeholder={'Parameter 2'} />
                <TextField placeholder={'Parameter 3'} />
            </Stack>
        ),
    },
    {
        field: 'status',
        headerName: 'Actions',
        width: 80,
        renderCell: (params: GridRenderCellParams) => (
            <CenteredBox key={params.id}>
                <Button onClick={() => null}>Run</Button>
            </CenteredBox>
        ),
    },
];

type CommandResponseType = {
    isSuccessful: boolean | undefined;
    errors: string[];
};
export const TestCaseRunnerPage = () => {
    const [rows, setRows] = useState<any[]>([
        {name: 'Create user'},
        {name: 'Login user'},
        {name: 'Open "contact" page'},
    ]);
    const [commandResponse, setCommandResponse] = useState<CommandResponseType | null>(null);

    const getRowIdCallback = useCallback((row: any) => row.name, []);

    return (
        <>
            <h2>{'Test case runner'}</h2>
            <Button onClick={() => null}>Run sequence</Button>
            <DataTable
                rows={rows as GridValidRowModel[]}
                getRowId={getRowIdCallback}
                columns={columns as GridColumns}
            />
        </>
    );
};
