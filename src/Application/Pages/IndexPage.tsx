import {Alert, Box, IconButton, InputBase, Paper, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {changeBaseUrl} from '../Context/ApplicationContext';
import {useDispatch} from 'react-redux';
import {useSelector} from '../../store';
import {useLazyGetDebugQuery} from '../../Module/Debug/API/Debug';
import {useLazyGetGeneratorsQuery} from '../../Module/Gii/API/Gii';
import {useLazyGetParametersQuery} from '../../Module/Inspector/API/Inspector';

const defaultBackendUrl = process.env.REACT_APP_BACKEND_URL;

export function IndexPage() {
    const dispatch = useDispatch();
    const [debugQuery] = useLazyGetDebugQuery();
    const [inspectorQuery] = useLazyGetParametersQuery();
    const [giiQuery] = useLazyGetGeneratorsQuery();
    const baseUrl = useSelector((state) => state.application.baseUrl);
    const [url, setUrl] = useState<string>(String(baseUrl));
    // TODO remove direct access to modules API
    let initialStatus = {
        debug: false,
        inspector: false,
        gii: false,
    };
    const [status, setStatus] = useState<typeof initialStatus>(initialStatus);

    async function checkStatus() {
        debugQuery()
            .then((response) => setStatus((s) => ({...s, debug: response.isSuccess})))
            .catch(() => setStatus((s) => ({...s, debug: false})));
        inspectorQuery()
            .then((response) => setStatus((s) => ({...s, inspector: response.isSuccess})))
            .catch(() => setStatus((s) => ({...s, inspector: false})));
        giiQuery()
            .then((response) => setStatus((s) => ({...s, gii: response.isSuccess})))
            .catch(() => setStatus((s) => ({...s, gii: false})));
    }

    async function handleChangeUrl(event: {preventDefault: () => void}) {
        event.preventDefault();
        dispatch(changeBaseUrl(url));
        await checkStatus();
    }

    useEffect(() => {
        checkStatus();
    }, []);

    return (
        <Box sx={{width: 500}}>
            <h2>Yii Dev Panel</h2>
            <Typography>
                Default backend url is: <b>{defaultBackendUrl}</b>
            </Typography>
            <Typography>
                API Statuses:
                {Object.entries(status).map((status) => (
                    <Typography>
                        <span style={{textTransform: 'capitalize'}}>{status[0]}</span>:
                        {status[1] ? (
                            <Alert severity="success">connected</Alert>
                        ) : (
                            <Alert severity="error">not connected</Alert>
                        )}
                    </Typography>
                ))}
            </Typography>
            <Paper
                component="form"
                onSubmit={handleChangeUrl}
                sx={{p: [0.5, 1], my: 2, display: 'flex', alignItems: 'center'}}
            >
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder={url}
                    value={url}
                    onChange={(event) => setUrl(event.target.value)}
                />
                <IconButton type="submit" sx={{p: 2}}>
                    <CheckIcon />
                </IconButton>
            </Paper>
        </Box>
    );
}
