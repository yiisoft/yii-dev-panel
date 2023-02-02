import * as React from 'react';
import {useCallback} from 'react';
import {Button, CircularProgress, Divider, List, ListItem, ListItemSecondaryAction, ListItemText} from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {useCheckoutMutation, useCommandMutation, useGetSummaryQuery} from '../API/GitApi';
import {CodeHighlight} from '../../../Component/CodeHighlight';
import {CheckoutDialog} from '../Component/Git/CheckoutDialog';
import {GetApp, Refresh, Sync} from '@mui/icons-material';

export const GitPage = () => {
    const getSummaryQuery = useGetSummaryQuery();
    const [checkoutMutation, checkoutInfo] = useCheckoutMutation();
    const [commandMutation, commandInfo] = useCommandMutation();

    const [open, setOpen] = React.useState(false);

    const onOpenDialogHandler = () => setOpen(true);
    const onCancelDialogHandler = () => setOpen(false);
    const onCheckoutHandler = useCallback(async ({branch}: {branch: string}) => {
        await checkoutMutation({branch});
        setOpen(false);
    }, []);
    const onPullHandler = useCallback(() => commandMutation({command: 'pull'}), []);
    const onFetchHandler = useCallback(() => commandMutation({command: 'fetch'}), []);
    const onRefreshHandler = () => getSummaryQuery.refetch();

    return (
        <>
            <h2>{'Git'}</h2>
            {getSummaryQuery.isSuccess && (
                <>
                    <Box>
                        <Box display="flex">
                            <Button
                                variant="outlined"
                                onClick={onRefreshHandler}
                                color={getSummaryQuery.isSuccess ? 'primary' : 'error'}
                                disabled={getSummaryQuery.isFetching}
                                startIcon={<Refresh />}
                                endIcon={
                                    getSummaryQuery.isFetching ? <CircularProgress size={24} color="info" /> : null
                                }
                            >
                                Refresh
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{marginLeft: 'auto'}}
                                onClick={onPullHandler}
                                color={commandInfo.isSuccess || commandInfo.isUninitialized ? 'primary' : 'error'}
                                disabled={commandInfo.isLoading}
                                startIcon={<GetApp />}
                                endIcon={
                                    commandInfo.isLoading && commandInfo.originalArgs?.command === 'pull' ? (
                                        <CircularProgress size={24} color="info" />
                                    ) : null
                                }
                            >
                                Pull
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={onFetchHandler}
                                color={commandInfo.isSuccess || commandInfo.isUninitialized ? 'primary' : 'error'}
                                disabled={commandInfo.isLoading}
                                startIcon={<Sync />}
                                endIcon={
                                    commandInfo.isLoading && commandInfo.originalArgs?.command === 'fetch' ? (
                                        <CircularProgress size={24} color="info" />
                                    ) : null
                                }
                            >
                                Fetch
                            </Button>
                        </Box>
                        <List>
                            <ListItem>
                                <ListItemText primary="Branch" secondary={getSummaryQuery.data.currentBranch} />
                                <ListItemSecondaryAction>
                                    <Button onClick={onOpenDialogHandler} color="primary">
                                        Checkout
                                    </Button>
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
                                {/*<ListItemSecondaryAction>*/}
                                {/*    <Button color="primary">Show log</Button>*/}
                                {/*</ListItemSecondaryAction>*/}
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
                    </Box>
                    <CheckoutDialog
                        open={open}
                        onCancel={onCancelDialogHandler}
                        onCheckout={onCheckoutHandler}
                        branches={getSummaryQuery.data.branches}
                        currentBranch={getSummaryQuery.data.currentBranch}
                    />
                </>
            )}
        </>
    );
};
