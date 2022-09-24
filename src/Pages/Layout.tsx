import * as React from 'react';
import {Fragment} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Link, Menu, MenuItem} from "@mui/material";
import {Outlet, useLocation} from "react-router";
import {ErrorBoundary} from "react-error-boundary";
import {YiiIcon} from "../Component/SvgIcon/YiiIcon";

const pages = [
    {name: 'Gii', link: '#'},
    {name: 'Debug', link: '/debug'},
    {
        name: 'Inspector', link: '#', items: [
            {name: 'Routes', link: '/inspector/routes'},
            {name: 'Parameters', link: '/inspector/parameters'},
            {name: 'Configuration', link: '/inspector/configuration'},
            {name: 'Container', link: '/inspector/container'},
            {name: 'Tests', link: '/inspector/tests'},
            {name: 'Analyse', link: '/inspector/analyse'},
        ]
    },
];
const NavLink = (props: { link: string, name: string } & any) => {
    const {link, name, ...other} = props;
    return <Link
        href={link}
        sx={{my: 2, mx: 1, color: 'white', display: 'block'}}
        {...other}
    >
        {name}
    </Link>
}

export const Layout = () => {
    const location = useLocation();
    const [anchorElUser, setAnchorElUser] = React.useState<Record<string, null | HTMLElement>>({});

    const handleOpenUserMenu = (key: string, event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser({...anchorElUser, [key]: event.currentTarget});
    };

    const handleCloseUserMenu = (key: string, event: any) => {
        const newAnchors = {...anchorElUser}
        delete newAnchors[key]
        setAnchorElUser(newAnchors);
    };
    return (
        <>
            <AppBar position="static" color="primary">
                <Container>
                    <Toolbar disableGutters>
                        <Link href={'/'}>
                            <YiiIcon sx={{display: 'flex', mr: 1}}/>
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
                                        return <NavLink key={page.name} name={page.name} link={page.link}/>
                                    }
                                    let key = page.name;
                                    return <Fragment key={page.name}>
                                        <NavLink name={page.name} link={'#'} onClick={handleOpenUserMenu.bind(this, key)}/>
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
                                }
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container>
                <ErrorBoundary fallback={<>An error was occurred</>} resetKeys={[location.pathname]}>
                    <Outlet/>
                </ErrorBoundary>
            </Container>
        </>
    );
};
