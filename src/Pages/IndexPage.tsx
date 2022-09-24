import {Box, IconButton, InputBase, Paper, Typography} from "@mui/material";
import React, {useState} from "react";
import CheckIcon from '@mui/icons-material/Check';
import {changeBaseUrl} from "../Provider/ApplicationContext";
import {useDispatch} from "react-redux";
import {useSelector} from "../store";

const defaultBackendUrl = process.env.REACT_APP_BACKEND_URL;

export function IndexPage() {
    const dispatch = useDispatch()
    const baseUrl = useSelector((state) => state.application.baseUrl);
    const [url, setUrl] = useState<string>(String(baseUrl));

    function handleChangeUrl(event: { preventDefault: () => void; }) {
        event.preventDefault();
        dispatch(changeBaseUrl(url))
    }

    return (
        <Box sx={{width: 500}}>
            <h2>Yii Dev Panel</h2>
            <Typography>
                Default backend url is: <b>{defaultBackendUrl}</b>
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
                    onChange={(event)=>setUrl(event.target.value)}
                />
                <IconButton type="submit" sx={{p: 2}}>
                    <CheckIcon/>
                </IconButton>
            </Paper>
        </Box>
    )
}
