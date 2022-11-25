import * as React from 'react';
import {useEffect, useMemo, useState} from 'react';
import {useLocation} from 'react-router';
import {Breadcrumbs, Link, Typography} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import {useSearchParams} from 'react-router-dom';
import {ErrorFallback} from '../../../Component/ErrorFallback';
import {GiiGenerator, useGetGeneratorsQuery} from '../API/Gii';
import {GeneratorStepper} from '../Component/GeneratorSteps/GeneratorStepper';
import {FullScreenCircularProgress} from '../../../Component/FullScreenCircularProgress';
import {LinkProps, MenuPanel} from '../../../Component/MenuPanel';
import {HelpOutline} from '@mui/icons-material';
import {InfoBox} from '../../../Component/InfoBox';

export const Layout = () => {
    const [selectedGenerator, setSelectedGenerator] = useState<GiiGenerator | null>(null);
    const [searchParams] = useSearchParams();
    const location = useLocation();

    const {data, isLoading} = useGetGeneratorsQuery();

    useEffect(() => {
        console.log('effect1');
        const selectedGeneratorId = searchParams.get('generator') || '';
        const selectedGenerator = (data || []).find((v) => v.id === selectedGeneratorId) || null;
        setSelectedGenerator(selectedGenerator);
    }, [searchParams, data]);

    const links: LinkProps[] = useMemo(() => {
        console.log('memo 1');
        return (data || []).map((generator, index) => ({
            text: generator.name,
            href: '/gii?generator=' + generator.id,
            icon: index % 2 === 0 ? <InboxIcon /> : <MailIcon />,
        }));
    }, [data]);

    if (isLoading) {
        console.log('loading 1');
        return <FullScreenCircularProgress />;
    }

    console.log('render');
    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" sx={{my: 2}}>
                <Link underline="hover" color="inherit" href="/gii">
                    Gii
                </Link>
                {!!selectedGenerator && (
                    <Typography component="span" color="text.primary">
                        {selectedGenerator.name}
                    </Typography>
                )}
            </Breadcrumbs>
            <MenuPanel links={links} open={!selectedGenerator} activeLink={selectedGenerator?.id}>
                {selectedGenerator ? (
                    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[location.pathname]}>
                        <GeneratorStepper generator={selectedGenerator} />
                    </ErrorBoundary>
                ) : (
                    <InfoBox
                        title="No one generator is chosen"
                        text="Select a generator from the left side panel to see more options"
                        severity="info"
                        icon={<HelpOutline />}
                    />
                )}
            </MenuPanel>
        </>
    );
};
