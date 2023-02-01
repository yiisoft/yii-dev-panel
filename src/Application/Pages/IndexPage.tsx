import {
    Alert,
    Grid,
    IconButton,
    InputBase,
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {addFavoriteUrl, changeBaseUrl, removeFavoriteUrl} from '../Context/ApplicationContext';
import {useDispatch} from 'react-redux';
import {useSelector} from '../../store';
import {useLazyGetDebugQuery} from '../../Module/Debug/API/Debug';
import {useLazyGetGeneratorsQuery} from '../../Module/Gii/API/Gii';
import {useLazyGetParametersQuery} from '../../Module/Inspector/API/Inspector';
import {OpenInNew, Star, StarOutline} from '@mui/icons-material';

const defaultBackendUrl = process.env.REACT_APP_BACKEND_URL;

export function IndexPage() {
    const dispatch = useDispatch();
    const [debugQuery] = useLazyGetDebugQuery();
    const [inspectorQuery] = useLazyGetParametersQuery();
    const [giiQuery] = useLazyGetGeneratorsQuery();
    const baseUrl = useSelector((state) => state.application.baseUrl);
    const [url, setUrl] = useState<string>(String(baseUrl));
    // TODO remove direct access to modules API
    const initialStatus = {
        debug: false,
        inspector: false,
        gii: false,
    };
    const [status, setStatus] = useState<typeof initialStatus>(initialStatus);
    const favoriteUrls = useSelector((state) => state.application.favoriteUrls) as string[];

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

    const handleChangeUrl = async (url: string) => {
        setUrl(url);
        dispatch(changeBaseUrl(url));
        await checkStatus();
    };

    const onSubmitHandler = async (event: {preventDefault: () => void}) => {
        event.preventDefault();
        await handleChangeUrl(url);
    };

    useEffect(() => {
        checkStatus();
    }, []);

    return (
        <Grid container spacing={2}>
            <Grid md={6} xs={12}>
                <h2>Yii Dev Panel</h2>
                <Typography>
                    Default backend url is: <b>{defaultBackendUrl}</b>
                </Typography>
                <Typography>API Statuses:</Typography>
                {Object.entries(status).map((status, index) => (
                    <React.Fragment key={index}>
                        <Typography>
                            <span style={{textTransform: 'capitalize'}}>{status[0]}</span>:
                        </Typography>
                        {status[1] ? (
                            <Alert severity="success">connected</Alert>
                        ) : (
                            <Alert severity="error">not connected</Alert>
                        )}
                    </React.Fragment>
                ))}
                <Paper
                    component="form"
                    onSubmit={onSubmitHandler}
                    sx={{p: [0.5, 1], my: 2, display: 'flex', alignItems: 'center'}}
                >
                    <InputBase
                        sx={{ml: 1, flex: 1}}
                        placeholder={url}
                        value={url}
                        onChange={(event) => setUrl(event.target.value)}
                    />
                    <IconButton type="button" sx={{p: 2}} onClick={() => dispatch(addFavoriteUrl(url))}>
                        <StarOutline />
                    </IconButton>
                    <IconButton type="submit" sx={{p: 2}}>
                        <CheckIcon />
                    </IconButton>
                </Paper>
            </Grid>
            <Grid md={6} xs={12}>
                {favoriteUrls.length > 0 && (
                    <>
                        <h3>Favorites</h3>
                        <List>
                            {favoriteUrls.map((url, index) => (
                                <ListItem key={index}>
                                    <ListItemText>{url}</ListItemText>
                                    <ListItemSecondaryAction>
                                        <IconButton target="_blank" href={url}>
                                            <OpenInNew />
                                        </IconButton>
                                        <IconButton
                                            type="submit"
                                            sx={{p: 2}}
                                            onClick={() => dispatch(removeFavoriteUrl(url))}
                                        >
                                            <Star />
                                        </IconButton>
                                        <IconButton type="submit" sx={{p: 2}} onClick={() => handleChangeUrl(url)}>
                                            <CheckIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            </Grid>
        </Grid>
    );
}
