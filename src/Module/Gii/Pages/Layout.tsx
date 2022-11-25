import * as React from 'react';
import {useEffect, useState} from 'react';
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

    const selectedGeneratorId = searchParams.get('generator') || '';
    const {data, isLoading} = useGetGeneratorsQuery();
    const generators = data || [];

    useEffect(() => {
        const selectedGenerator = generators.find((v) => v.id === selectedGeneratorId) || null;
        setSelectedGenerator(selectedGenerator);
    }, [selectedGeneratorId, data]);

    if (isLoading) {
        return <FullScreenCircularProgress />;
    }

    console.log(selectedGenerator);

    const links: LinkProps[] = [];
    generators.map((generator, index) => {
        links.push({
            text: generator.name,
            href: '/gii?generator=' + generator.id,
            icon: index % 2 === 0 ? <InboxIcon /> : <MailIcon />,
        });
    });

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
            <MenuPanel links={links} open={!selectedGenerator}>
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
