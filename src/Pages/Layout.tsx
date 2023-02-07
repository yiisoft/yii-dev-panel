import * as React from 'react';
import {Fragment} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {IconButton, Link, LinkTypeMap, ListItemIcon, ListItemText, Menu, MenuItem, styled} from '@mui/material';
import {Outlet} from 'react-router';
import {ErrorBoundary} from 'react-error-boundary';
import {YiiIcon} from '../Component/SvgIcon/YiiIcon';
import {ErrorFallback} from '../Component/ErrorFallback';
import {ContentCut, GitHub} from '@mui/icons-material';
import AdbIcon from '@mui/icons-material/Adb';
import {OverrideProps} from '@mui/material/OverridableComponent';

// TODO: replace with context and provider
const pages = [
    {name: 'Gii', link: '/gii'},
    {name: 'Debug', link: '/debug'},
    {
        name: 'Inspector',
        link: '#',
        items: [
            {name: 'Routes', link: '/inspector/routes'},
            {name: 'Parameters', link: '/inspector/parameters'},
            {name: 'Configuration', link: '/inspector/configuration'},
            {name: 'Container', link: '/inspector/container'},
            {name: 'Tests', link: '/inspector/tests'},
            {name: 'Analyse', link: '/inspector/analyse'},
            {name: 'File Explorer', link: '/inspector/files'},
            {name: 'Translations', link: '/inspector/translations'},
            {name: 'Commands', link: '/inspector/commands'},
            {name: 'Database', link: '/inspector/database'},
            {name: 'PHP Info', link: '/inspector/phpinfo'},
            {name: 'Composer', link: '/inspector/composer'},
        ],
    },
];
const StyledLink = styled(Link)(({theme}) => {
    return {
        margin: theme.spacing(2, 1),
        color: 'white',
    };
});

type NavLinkType = OverrideProps<LinkTypeMap, 'a'> & {
    name: string;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

const NavLink = (props: NavLinkType) => {
    const {href, name, onClick, ...other} = props;
    if (!href) {
        return (
            <StyledLink
                onClick={(e) => {
                    e.preventDefault();
                    if (onClick) {
                        return onClick(e);
                    }
                    return false;
                }}
                {...other}
            >
                {name}
            </StyledLink>
        );
    }
    return (
        <StyledLink href={href} {...other}>
            {name}
        </StyledLink>
    );
};

const buildVersion = 'REACT_APP_BUILD_ID' in process.env ? '#' + process.env.REACT_APP_BUILD_ID : 'development';
const repositoryUrl = 'https://github.com/xepozz/yii-dev-panel';

export const Layout = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<Record<string, null | HTMLElement>>({});

    const handleOpenUserMenu = (key: string, event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser({...anchorElUser, [key]: event.currentTarget});
    };

    const handleCloseUserMenu = (key: string) => {
        const newAnchors = {...anchorElUser};
        delete newAnchors[key];
        setAnchorElUser(newAnchors);
    };

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar position="static" color="primary">
                <Container>
                    <Toolbar disableGutters>
                        <Link href={'/'}>
                            <YiiIcon sx={{display: 'flex', mr: 1}} />
                        </Link>
                        <Typography variant="h6">
                            <Link
                                href={'/'}
                                sx={{
                                    color: 'white',
                                    textDecoration: 'none',
                                }}
                            >
                                Yii Dev Panel
                            </Link>
                        </Typography>

                        <Box sx={{flexGrow: 1, display: 'flex'}}>
                            {pages.map((page) => {
                                if (!page.items) {
                                    return <NavLink key={page.name} name={page.name} href={page.link} />;
                                }
                                const key = page.name;
                                return (
                                    <Fragment key={page.name}>
                                        <NavLink name={page.name} onClick={handleOpenUserMenu.bind(this, key)} />
                                        <Menu
                                            anchorEl={anchorElUser[key]}
                                            keepMounted
                                            open={Boolean(anchorElUser[key])}
                                            onClose={handleCloseUserMenu.bind(this, key)}
                                        >
                                            {page.items.map((item) => (
                                                <MenuItem
                                                    key={item.name}
                                                    href={item.link}
                                                    onClick={handleCloseUserMenu.bind(this, key)}
                                                    component={Link}
                                                >
                                                    {item.name}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </Fragment>
                                );
                            })}
                        </Box>
                        <div>
                            <IconButton size="large" onClick={handleMenu} color="inherit">
                                <AdbIcon />
                            </IconButton>
                            <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                                <MenuItem component={Link} href={repositoryUrl} target="_blank">
                                    <ListItemIcon>
                                        <GitHub fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>Open Github</ListItemText>
                                </MenuItem>
                                <MenuItem component="span" disableTouchRipple disableRipple>
                                    <ListItemIcon>
                                        <ContentCut fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Build <b>{buildVersion}</b>
                                    </ListItemText>
                                </MenuItem>
                            </Menu>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container>
                <ErrorBoundary FallbackComponent={ErrorFallback} resetKeys={[window.location.pathname]}>
                    <Outlet />
                </ErrorBoundary>
            </Container>
        </>
    );
};
