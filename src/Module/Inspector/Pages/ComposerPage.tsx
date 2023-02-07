import * as React from 'react';
import {useGetComposerQuery} from '../API/Inspector';
import {Button, Divider, List, ListItem, ListItemSecondaryAction, Tab, Tabs, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import {JsonRenderer} from '../../../Component/JsonRenderer';
import ListItemText from '@mui/material/ListItemText';

type TabPanelProps = {
    children?: React.ReactNode;
    index: number;
    value: number;
};

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
export const ComposerPage = () => {
    const getComposerQuery = useGetComposerQuery();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{width: '100%'}}>
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <Tabs value={value} onChange={handleChange}>
                    <Tab label="Packages" />
                    <Tab label="composer.json" />
                    <Tab label="composer.lock" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <List>
                    <Divider>Require</Divider>
                    {getComposerQuery.data &&
                        Object.entries(getComposerQuery.data.json.require).map(([name, version], index) => (
                            <ListItem disablePadding sx={{display: 'block'}}>
                                <ListItemText primary={name} secondary={version} />
                                <ListItemSecondaryAction>
                                    <Button color="primary">Switch</Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    <Divider>Require Dev</Divider>
                    {getComposerQuery.data &&
                        Object.entries(getComposerQuery.data.json['require-dev']).map(([name, version], index) => (
                            <ListItem disablePadding sx={{display: 'block'}}>
                                <ListItemText primary={name} secondary={version} />
                                <ListItemSecondaryAction>
                                    <Button color="primary">Switch</Button>
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                </List>
            </TabPanel>
            <TabPanel value={value} index={1}>
                {getComposerQuery.data && <JsonRenderer value={getComposerQuery.data.json} />}
            </TabPanel>
            <TabPanel value={value} index={2}>
                {getComposerQuery.data && <JsonRenderer value={getComposerQuery.data.lock} />}
            </TabPanel>
        </Box>
    );
};
