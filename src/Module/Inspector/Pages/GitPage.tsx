import * as React from 'react';
import {useState} from 'react';
import {useLazyRunCommandQuery} from '../API/Inspector';
import {Button, CircularProgress, Divider, List, ListItem, ListItemSecondaryAction, ListItemText} from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useGetSummaryQuery} from '../API/GitApi';
import {CodeHighlight} from '../../../Component/CodeHighlight';

type CommandResponseType = {
    isSuccessful: boolean | undefined;
    errors: string[];
};
export const GitPage = () => {
    const getSummaryQuery = useGetSummaryQuery();
    const [commandQuery, commandQueryInfo] = useLazyRunCommandQuery();
    const [commandResponse, setCommandResponse] = useState<CommandResponseType | null>(null);

    const onRefreshHandler = () => {
        getSummaryQuery.refetch();
    };

    return (
        <>
            <h2>{'Git'}</h2>
            <Box>
                {getSummaryQuery.isSuccess && (
                    <>
                        <List>
                            <ListItem>
                                <ListItemText primary="Branch" secondary={getSummaryQuery.data.currentBranch} />
                                <ListItemSecondaryAction>
                                    <Button color="primary">Checkout</Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary={'Last commit: ' + getSummaryQuery.data.lastCommit.ref}
                                    secondary={
                                        <>
                                            {getSummaryQuery.data.lastCommit.message}&nbsp;
                                            <Typography
                                                sx={{display: 'inline'}}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                by {getSummaryQuery.data.lastCommit.author.name} (
                                                {getSummaryQuery.data.lastCommit.author.email})
                                            </Typography>
                                        </>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <Button color="primary">Show log</Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                            {getSummaryQuery.data.remotes.length > 0 &&
                                getSummaryQuery.data.remotes.map((remote, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={'Remote: ' + remote.name} secondary={remote.url} />
                                    </ListItem>
                                ))}
                        </List>
                        <Divider>Status</Divider>
                        <CodeHighlight
                            showLineNumbers={false}
                            language="plain/text"
                            code={getSummaryQuery.data.status.join('\n')}
                        />
                    </>
                )}

                <Button
                    onClick={onRefreshHandler}
                    color={getSummaryQuery.isSuccess ? 'primary' : 'error'}
                    disabled={getSummaryQuery.isFetching}
                    endIcon={getSummaryQuery.isFetching ? <CircularProgress size={24} color="info" /> : null}
                >
                    Refresh
                </Button>
            </Box>
        </>
    );
};
