import {ContentCut, GitHub, Refresh} from '@mui/icons-material';
import {
    Breadcrumbs,
    CssBaseline,
    Divider,
    Link,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
} from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {ErrorFallback} from '@yiisoft/yii-dev-panel-sdk/Component/ErrorFallback';
import {ScrollTopButton} from '@yiisoft/yii-dev-panel-sdk/Component/ScrollTop';
import {YiiIcon} from '@yiisoft/yii-dev-panel-sdk/Component/SvgIcon/YiiIcon';
import {Config} from '@yiisoft/yii-dev-panel-sdk/Config';
import {NotificationSnackbar} from '@yiisoft/yii-dev-panel/Application/Component/NotificationSnackbar';
import * as React from 'react';
import {Fragment, useEffect} from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import {Outlet} from 'react-router';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {useBreadcrumbs} from '@yiisoft/yii-dev-panel/Application/Component/Breadcrumbs';

// TODO: replace with context and provider
const pages = [
    {name: 'Gii', link: '/gii'},
    {name: 'Debug', link: '/debug'},
    {
        name: 'Config',
        items: [
            {name: 'Configuration', link: '/inspector/config'},
            {name: 'Events', link: '/inspector/events'},
            {name: 'Routes', link: '/inspector/routes'},
        ],
    },
    {
        name: 'Inspector',
        items: [
            {name: 'Tests', link: '/inspector/tests'},
            {name: 'Analyse', link: '/inspector/analyse'},
            {name: 'File Explorer', link: '/inspector/files'},
            {name: 'Translations', link: '/inspector/translations'},
            {name: 'Commands', link: '/inspector/commands'},
            {name: 'Database', link: '/inspector/database'},
            {name: 'Cache', link: '/inspector/cache'},
            {name: 'Git', link: '/inspector/git'},
            {name: 'PHP Info', link: '/inspector/phpinfo'},
            {name: 'Composer', link: '/inspector/composer'},
            {name: 'Opcache', link: '/inspector/opcache'},
        ],
    },
    {name: 'Open API', link: '/open-api'},
    {name: 'Frames', link: '/frames'},
    // Uncomment to debug shared components
    // {name: 'Shared', link: '/shared'},
];

const repositoryUrl = 'https://github.com/yiisoft/yii-dev-panel';

export const Layout = React.memo(({children}: React.PropsWithChildren) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const onRefreshHandler = () => {
        if ('location' in window) {
            window.location.reload();
        }
    };
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const [openItems, setOpenItems] = React.useState(new Map());

    const handleToggleChildren = (object: Object) => () => {
        setOpenItems((prevMap) => {
            const newMap = new Map(prevMap);
            newMap.set(object, !(prevMap.has(object) && prevMap.get(object)));
            return newMap;
        });
    };

    const DrawerList = (
        <Box
            // onClick={toggleDrawer(false)}
            sx={{
                width: 280,
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1,
            }}
        >
            <Typography variant="h6">
                <Link href={'/'} sx={{display: 'inline-block', height: '100%', mx: 2, my: 2}}>
                    <YiiIcon />
                </Link>
                <Link
                    href={'/'}
                    sx={{
                        textDecoration: 'none',
                    }}
                >
                    Yii Dev Panel
                </Link>
            </Typography>
            <List>
                {pages.map((parentPage, index) => (
                    <Fragment key={parentPage.name}>
                        <ListItem key={parentPage.name} disablePadding>
                            <ListItemButton
                                {...('link' in parentPage
                                    ? {href: parentPage.link}
                                    : {onClick: handleToggleChildren(parentPage)})}
                            >
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                <ListItemText
                                    primary={parentPage.name}
                                    secondary={String(openItems.has(parentPage) && openItems.get(parentPage))}
                                />
                                {'items' in parentPage && parentPage.items.length > 0 && (
                                    <ListItemSecondaryAction>
                                        {openItems.has(parentPage) && openItems.get(parentPage) ? (
                                            <ExpandLess />
                                        ) : (
                                            <ExpandMore />
                                        )}
                                    </ListItemSecondaryAction>
                                )}
                            </ListItemButton>
                        </ListItem>
                        {'items' in parentPage && parentPage.items.length > 0 && (
                            <Collapse
                                in={openItems.has(parentPage) && openItems.get(parentPage)}
                                timeout="auto"
                                unmountOnExit={false}
                            >
                                <List component="div" disablePadding>
                                    {parentPage.items.map((page, index) => (
                                        <Fragment key={page.name}>
                                            <ListItemButton href={page.link} sx={{pl: 4}}>
                                                <ListItemIcon>
                                                    <InboxIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={page.name} />
                                            </ListItemButton>
                                        </Fragment>
                                    ))}
                                </List>
                            </Collapse>
                        )}
                    </Fragment>
                ))}
            </List>
            <Divider />
            <List sx={{mt: 'auto'}}>
                <ListItem disablePadding>
                    <ListItemButton onClick={onRefreshHandler}>
                        <ListItemIcon>
                            <Refresh fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Refresh page</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton href={repositoryUrl} target="_blank">
                        <ListItemIcon>
                            <GitHub fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Open Github</ListItemText>
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ContentCut fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>
                            Build <b>{Config.buildVersion}</b>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );
    const {setBreadcrumbs} = useBreadcrumbs();

    useEffect(() => {
        setBreadcrumbs({type: 'SET_BREADCRUMB', payload: []});
    }, []);

    return (
        <>
            <CssBaseline />
            <Drawer open={open} onClose={toggleDrawer(false)}>
                {DrawerList}
            </Drawer>
            <NotificationSnackbar />
            <Container>
                <MyBreadcrumbs toggleDrawer={toggleDrawer} />
                <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[window.location.pathname]}>
                    <Outlet />
                </ErrorBoundary>
            </Container>
            {children}
            <ScrollTopButton bottomOffset={!!children} />
        </>
    );
});

type MyBreadcrumbsType = {
    toggleDrawer: (open: boolean) => () => void;
};
const MyBreadcrumbs = ({toggleDrawer}: MyBreadcrumbsType) => {
    const {breadcrumbs} = useBreadcrumbs();

    return (
        <Breadcrumbs sx={{my: 2}}>
            <Button onClick={toggleDrawer(true)}>Open menu</Button>
            <Link underline="hover" color="inherit" href="/">
                Main
            </Link>
            {breadcrumbs.map((item) => (
                <Link underline="hover" color="inherit" href={item}>
                    {item}
                </Link>
            ))}
        </Breadcrumbs>
    );
};
