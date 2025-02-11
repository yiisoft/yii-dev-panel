import {Button, LinearProgress, Stack, Tab, Tabs, Typography} from '@mui/material';
import Box from '@mui/material/Box';
import {CodeHighlight} from '@yiisoft/yii-dev-panel-sdk/Component/CodeHighlight';
import {JsonRenderer} from '@yiisoft/yii-dev-panel-sdk/Component/JsonRenderer';
import {useGetMergePlanQuery} from '@yiisoft/yii-dev-panel/Module/Inspector/API/Inspector';
import * as React from 'react';
import {SyntheticEvent, useEffect, useMemo, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

type TabPanelProps = {
    children?: React.ReactNode;
    index: string;
    value: string;
};

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel" hidden={value !== index} {...other}>
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}
export const ConfigManagementPage = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const searchString = searchParams.get('filter') || '';
    const mergePlanQuery = useGetMergePlanQuery();
    const [env, setEnv] = useState<string>('');
    const [group, setGroup] = useState<string>('');
    const handleChangeEnv = (event: SyntheticEvent, newValue: string) => setEnv(newValue);
    const handleChangeGroup = (event: SyntheticEvent, newValue: string) => setGroup(newValue);
    const data = mergePlanQuery.data?.data;

    const envs = useMemo(() => {
        if (!mergePlanQuery.data || !data) {
            return [];
        }
        return Object.keys(data || {});
    }, [mergePlanQuery.isFetching]);

    const groups = useMemo(() => {
        if (!env || !data) {
            return [];
        }
        return Object.keys(data[env] || {});
    }, [data, env]);

    useEffect(() => {
        setGroup(groups[0] || '');
    }, [env]);
    useEffect(() => {
        setEnv(envs[0] || '');
    }, [data]);

    const handleReload = () => mergePlanQuery.refetch();

    return (
        <>
            <h2>{'Config Management'}</h2>
            {mergePlanQuery.isFetching && <LinearProgress />}
            {!mergePlanQuery.isFetching && (
                <Box>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
                        <Typography variant="h6" my={1}>
                            Path:{' '}
                        </Typography>
                        <Button onClick={handleReload}>Reload</Button>
                    </Stack>

                    <CodeHighlight language={'text/plain'} code={mergePlanQuery.data.path} showLineNumbers={false} />
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={env} onChange={handleChangeEnv}>
                            {envs.map((group) => (
                                <Tab label={group} value={group} key={group} />
                            ))}
                        </Tabs>
                    </Box>
                    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                        <Tabs value={group} onChange={handleChangeGroup}>
                            {groups.map((group) => (
                                <Tab label={group} value={group} key={group} />
                            ))}
                        </Tabs>
                    </Box>
                    <JsonRenderer value={env in data && group in data[env] ? data[env][group] : undefined} />
                </Box>
            )}
        </>
    );
};
