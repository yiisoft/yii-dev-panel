import * as React from 'react';
import {useEffect, useMemo, useState} from 'react';
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

const Layout = () => {
    const [selectedGenerator, setSelectedGenerator] = useState<GiiGenerator | null>(null);
    const [searchParams] = useSearchParams();

    const {data, isLoading} = useGetGeneratorsQuery();

    useEffect(() => {
        const selectedGeneratorId = searchParams.get('generator') || '';
        const selectedGenerator = (data || []).find((v) => v.id === selectedGeneratorId) || null;
        setSelectedGenerator(selectedGenerator);
    }, [searchParams, isLoading]);

    const links: LinkProps[] = useMemo(
        () =>
            (data || []).map((generator, index) => ({
                text: generator.name,
                href: '/gii?generator=' + generator.id,
                icon: index % 2 === 0 ? <InboxIcon /> : <MailIcon />,
            })),
        [data],
    );

    if (isLoading) {
        return <FullScreenCircularProgress />;
    }

    return (
        <>
            <Breadcrumbs sx={{my: 2}}>
                <Link underline="hover" color="inherit" href="/gii">
                    Gii
                </Link>
                {!!selectedGenerator && (
                    <Typography component="span" color="text.primary">
                        {selectedGenerator.name}
                    </Typography>
                )}
            </Breadcrumbs>
            {links.length === 0 ? (
                <InfoBox
                    title="Gii generators are empty"
                    text={
                        <>
                            <Typography>Gii is not configured or it does not have any generators.</Typography>
                            <Typography>
                                Make sure Gii is active and its configuration has at least one active generator.&nbsp;
                                <Link href="/inspector/parameters?filter=yiisoft/yii-gii">Open parameters.</Link>
                            </Typography>
                        </>
                    }
                    severity="info"
                    icon={<HelpOutline />}
                />
            ) : (
                <MenuPanel links={links} open={!selectedGenerator} activeLink={selectedGenerator?.name}>
                    {selectedGenerator ? (
                        <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[window.location.pathname]}>
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
            )}
        </>
    );
};
Layout.whyDidYouRender = true;

export {Layout};
