import {EmojiObjects, Settings} from '@mui/icons-material';
import {TabContext, TabPanel} from '@mui/lab';
import {IconButton, Link, Stack, Tab, Tabs, Typography, useTheme} from '@mui/material';
import {InfoBox} from '@yiisoft/yii-dev-panel-sdk/Component/InfoBox';
import {SettingsDialog} from '@yiisoft/yii-dev-panel/Module/Frames/Component/SettingsDialog';
import {useFramesEntries} from '@yiisoft/yii-dev-panel/Module/Frames/Context/Context';
import * as React from 'react';
import {useEffect, useState} from 'react';

type ErrorResolutionBoxProps = {
    url: string;
};
const ErrorResolutionBox = ({url}: ErrorResolutionBoxProps) => {
    return (
        <InfoBox
            title={`"${url}" is inaccessible`}
            text={
                <>
                    <Typography>Having problems with X-Frame-Options or CORS?</Typography>
                    <Typography>
                        Configure response headers to prevent browser blocking the requests to external resources or set
                        up a proxy server.
                    </Typography>
                    <Typography>
                        Read more about blocking external resources:
                        <ul>
                            <li>
                                <Link
                                    href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options"
                                    target="_blank"
                                >
                                    X-Frame-Options
                                </Link>
                            </li>
                            <li>
                                <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS" target="_blank">
                                    CORS
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/Sources"
                                    target="_blank"
                                >
                                    Content-Security-Policy
                                </Link>
                            </li>
                        </ul>
                    </Typography>
                </>
            }
            severity="info"
            icon={<EmojiObjects />}
        />
    );
};

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

    const apiEntries = useFramesEntries();

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
                    {Object.keys(apiEntries).length === 0 ? (
                        <NoEntries />
                    ) : (
                        <>
                            {Object.entries(apiEntries).map(([name, url], index) => (
                                <TabPanel key={index} value={name} className={theme.palette.mode}>
                                    {/*<iframe src={url} width="100%" height="1000px" />*/}
                                    <object data={url} width="100%" height="1000px" type="text/html">
                                        <ErrorResolutionBox url={url} />
                                    </object>
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
