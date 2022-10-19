import * as React from 'react';
import {useState} from 'react';
import {GridColDef, GridColumns, GridRenderCellParams, GridValidRowModel} from '@mui/x-data-grid';
import {useLazyGetCommandQuery} from "../../../API/Inspector";
import {Accordion, AccordionDetails, AccordionSummary, Button, Link} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import {DataTable} from "../../../Component/Grid";

const columns: GridColDef[] = [
    {
        field: 'file_name', headerName: 'File', width: 200,
        renderCell: (params: GridRenderCellParams) => {
            return <span style={{wordBreak: 'break-all'}}>
                {params.value}#{params.row.line_from}–{params.row.line_to}
            </span>

        }
    },
    {
        field: 'message', headerName: 'Message', flex: 1,
        renderCell: (params: GridRenderCellParams) => {
            return <>
                <b><Link href={params.row.link} target="_blank">{params.row.type}</Link></b>:&nbsp;
                {params.row.message}
            </>

        }
    },
];

function renderGrid(data: any) {
    return <DataTable
        rows={data as GridValidRowModel[]}
        columns={columns as GridColumns}
    />;
}

export const PsalmPage = () => {
    const [commandQuery, commandQueryInfo] = useLazyGetCommandQuery();
    const [errorRows, setErrorRows] = useState<any[]>([])
    const [infoRows, setInfoRows] = useState<any[]>([])

    async function runPsalmHandler() {
        const data = await commandQuery('analyse/psalm');
        const resultInfoRows: any = []
        const resultErrorRows: any = []

        let tempObject = {
            id: 0,
            file_name: '',
            file_path: '',
            line_from: '',
            line_to: '',
            type: '',
            message: '',
            link: '',
        }
        let id = 0;
        for (let event of (data.data as any)) {
            id++
            tempObject = {
                id,
                file_name: event.file_name,
                file_path: event.file_path,
                line_from: event.line_from,
                line_to: event.line_to,
                type: event.type,
                message: event.message,
                link: event.link,
            }
            if (event.severity === 'info') {
                resultInfoRows.push(tempObject)
                continue;
            }
            if (event.severity === 'error') {
                resultErrorRows.push(tempObject)

            }

        }
        setInfoRows(resultInfoRows);
        setErrorRows(resultErrorRows);
    }

    const [expanded, setExpanded] = React.useState<string[]>([]);

    const handleChange = (panel: string) => (event: React.SyntheticEvent) => {
        setExpanded(v => v.includes(panel) ? v.filter((v) => v !== panel) : v.concat(panel));
    };

    return (
        <>
            <h2>{'Psalm'}</h2>
            <Button onClick={runPsalmHandler}>Run Psalm</Button>
            {commandQueryInfo.isSuccess && (
                <>
                    <Accordion key="panel1" expanded={expanded.includes('panel1')} onChange={handleChange('panel1')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography sx={{width: '33%', flexShrink: 0}}>Info ({infoRows.length})</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {renderGrid(infoRows)}
                        </AccordionDetails>
                    </Accordion>
                    <Accordion key="panel2" expanded={expanded.includes('panel2')} onChange={handleChange('panel2')}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography sx={{width: '33%', flexShrink: 0}}>Errors ({errorRows.length})</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {renderGrid(errorRows)}
                        </AccordionDetails>
                    </Accordion>
                </>
            )}
        </>
    );
}
