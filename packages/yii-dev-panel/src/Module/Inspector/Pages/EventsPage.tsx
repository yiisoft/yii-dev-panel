import {OpenInNew} from '@mui/icons-material';
import {Button, IconButton, List, ListItem, Tooltip, Typography} from '@mui/material';
import {CodeHighlight} from '@yiisoft/yii-dev-panel-sdk/Component/CodeHighlight';
import {FullScreenCircularProgress} from '@yiisoft/yii-dev-panel-sdk/Component/FullScreenCircularProgress';
import {serializeCallable} from '@yiisoft/yii-dev-panel-sdk/Helper/callableSerializer';
import {ListenerType, useGetEventsQuery} from '@yiisoft/yii-dev-panel/Module/Inspector/API/Inspector';
import {useEffect, useState} from 'react';

export const EventsPage = () => {
    const {data, isLoading, isSuccess} = useGetEventsQuery();
    const [events, setEvents] = useState<ListenerType[]>([]);
    const [url, setUrl] = useState<string>('');

    useEffect(() => {
        if (!isSuccess) {
            return;
        }
        // const events = collectGroupsAndRoutes(data);
        console.log(data?.web);

        // @ts-ignore
        setEvents(Object.entries(data.web));
    }, [isSuccess, data]);

    // const onSubmitHandler = async (event: {preventDefault: () => void}) => {
    //     event.preventDefault();
    //     console.log('route', url);
    //
    //     // const result = await checkRouteQuery(url);
    //     // console.log(result.data);
    // };

    if (isLoading) {
        return <FullScreenCircularProgress />;
    }

    return (
        <>
            {/*<h2>{'Check route'}</h2>*/}
            {/*<Paper*/}
            {/*    component="form"*/}
            {/*    onSubmit={onSubmitHandler}*/}
            {/*    sx={{p: [0.5, 1], my: 2, display: 'flex', alignItems: 'center'}}*/}
            {/*>*/}
            {/*    <InputBase*/}
            {/*        sx={{ml: 1, flex: 1}}*/}
            {/*        placeholder={'/site/index, POST /auth/login, DELETE /user/1'}*/}
            {/*        value={url}*/}
            {/*        onChange={(event) => setUrl(event.target.value)}*/}
            {/*    />*/}
            {/*    <IconButton type="submit" sx={{p: 2}}>*/}
            {/*        <CheckIcon />*/}
            {/*    </IconButton>*/}
            {/*</Paper>*/}
            {/*<FormHelperText variant="outlined">*/}
            {/*    Add an HTTP verb in the beginning of the path such as GET, POST, PUT, PATCH and etc. to check different*/}
            {/*    methods. <br />*/}
            {/*    Default method is GET and it can be omitted.*/}
            {/*</FormHelperText>*/}

            <h2>{'Event listeners'}</h2>

            {events.map((event) => (
                <>
                    <Typography variant="subtitle2" component="h3">
                        {event[0]}
                        <Tooltip title="Open in File Explorer">
                            <IconButton size="small" target="_blank" href={`/inspector/files?class=${event[0]}`}>
                                <OpenInNew fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    </Typography>

                    <List>
                        {event[1].map((item: any) => (
                            <>
                                {Array.isArray(item) && (
                                    <Tooltip title="Open in File Explorer">
                                        <Button
                                            size="small"
                                            target="_blank"
                                            href={`/inspector/files?class=${item[0]}&method=${item[1]}`}
                                            endIcon={<OpenInNew fontSize="small" />}
                                        >
                                            Inspect method
                                        </Button>
                                    </Tooltip>
                                )}
                                <ListItem>
                                    <CodeHighlight
                                        language={'php'}
                                        code={serializeCallable(item)}
                                        showLineNumbers={false}
                                    />
                                </ListItem>
                            </>
                        ))}
                    </List>
                </>
            ))}
        </>
    );
};
