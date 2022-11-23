import * as React from 'react';
import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router';
import {
    Breadcrumbs,
    Grid,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from '@mui/material';
import {ErrorBoundary} from 'react-error-boundary';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import {useSearchParams} from 'react-router-dom';
import {ErrorFallback} from '../../../Component/ErrorFallback';
import {GiiGenerator, useGetGeneratorsQuery} from '../API/Gii';
import {GeneratorStepper} from '../Component/GeneratorSteps/GeneratorStepper';
import {FullScreenCircularProgress} from '../../../Component/FullScreenCircularProgress';

export const Layout = () => {
    const [selectedGenerator, setSelectedGenerator] = useState<GiiGenerator | null>(null);
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

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

    return (
        <>
            <Breadcrumbs aria-label="breadcrumb" sx={{my: 2}}>
                <Link underline="hover" color="inherit" href="/gii">
                    Gii
                </Link>
                {!!selectedGenerator && <Typography color="text.primary">{selectedGenerator.name}</Typography>}
            </Breadcrumbs>
            <Grid container>
                <Grid item xs={1} md={3}>
                    <List>
                        {generators.map((generator, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => navigate('?generator=' + generator.id)}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText>{generator.name}</ListItemText>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid item xs={11} md={9}>
                    <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[location.pathname]}>
                        {selectedGenerator ? (
                            <GeneratorStepper generator={selectedGenerator} />
                        ) : (
                            <>Select a generator to see more options</>
                        )}
                    </ErrorBoundary>
                </Grid>
            </Grid>
        </>
    );
};
