import * as React from 'react';
import {useEffect, useState} from 'react';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import './dark.css';
import {IconButton, Stack, Tab, Tabs, TextField, Typography, useTheme} from '@mui/material';
import {TabContext, TabPanel} from '@mui/lab';
import {EmojiObjects, Settings} from '@mui/icons-material';
import {SettingsDialog} from '../Component/SettingsDialog';
import {useOpenApiEntries} from '../Context/Context';
import {InfoBox} from '../../../Component/InfoBox';

const NoEntries = React.memo(() => {
    return (
        <InfoBox
            title="No Open API entries found"
            text={
                <>
                    <Typography>Click on settings button and add new Open API entry.</Typography>
                </>
            }
            severity="info"
            icon={<EmojiObjects />}
        />
    );
});
export const Layout = () => {
    const [tab, setTab] = useState<string>('');
    const [settingsPopupOpen, setSettingsPopupOpen] = useState<boolean>(false);
    const handleChange = (event: any, value: string) => setTab(value);
    const theme = useTheme();

    const apiEntries = useOpenApiEntries();

    useEffect(() => {
        if (apiEntries && Object.keys(apiEntries).length) {
            setTab(Object.keys(apiEntries)[0]);
        }
    }, [apiEntries]);

    return (
        <>
            <TabContext value={tab}>
                <Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Tabs
                            value={tab}
                            onChange={handleChange}
                            scrollButtons="auto"
                            variant="scrollable"
                            allowScrollButtonsMobile
                            sx={{maxWidth: '100%'}}
                        >
                            {Object.keys(apiEntries).map((name, index) => (
                                <Tab key={index} label={name} value={name} wrapped />
                            ))}
                        </Tabs>
                        <IconButton onClick={() => setSettingsPopupOpen(true)}>
                            <Settings />
                        </IconButton>
                    </Stack>
                    <TextField disabled value={apiEntries[tab]} />
                    {Object.keys(apiEntries).length === 0 ? (
                        <NoEntries />
                    ) : (
                        <>
                            {Object.entries(apiEntries).map(([name, url], index) => (
                                <TabPanel key={index} value={name} className={theme.palette.mode}>
                                    <SwaggerUI url={url} />
                                </TabPanel>
                            ))}
                        </>
                    )}
                </Stack>
            </TabContext>
            {settingsPopupOpen && (
                <SettingsDialog
                    onClose={() => {
                        setSettingsPopupOpen(false);
                    }}
                />
            )}
        </>
    );
};
