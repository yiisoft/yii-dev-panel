import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import AdbIcon from '@mui/icons-material/Adb';
import {Link, Menu, MenuItem} from "@mui/material";
import {Outlet} from "react-router";

const pages = [
    {name: 'Gii', link: '#'},
    {
        name: 'Debug', link: '#', items: [
            {name: 'Info', link: '/debug/info'},
        ]
    },
    {
        name: 'Inspector', link: '#', items: [
            {name: 'Parameters', link: '/inspector/parameters'},
            {name: 'Configuration', link: '/inspector/configuration'},
            {name: 'Container', link: '/inspector/container'},
        ]
    },
];
const NavLink = (props: { link: string, name: string } & any) => {
    const {link, name, ...other} = props;
    return <Link
        href={link}
        key={name}
        sx={{my: 2, mx: 1, color: 'white', display: 'block'}}
        {...other}
    >
        {name}
    </Link>
}

export const Layout = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<Record<string, null | HTMLElement>>({});

    const handleOpenUserMenu = (key: string, event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser({...anchorElUser, [key]: event.currentTarget});
    };

    const handleCloseUserMenu = (key:string) => {
        const newAnchors = {...anchorElUser}
        delete newAnchors[key]
        setAnchorElUser(newAnchors);
    };
    return (
        <>
            <AppBar position="static">
                <Container>
                    <Toolbar disableGutters>
                        <AdbIcon sx={{display: 'flex', mr: 1}}/>
                        <Typography variant="h6">
                            <Link
                                href={'/'}
                                sx={{
                                    my: 2,
                                    mx: 1,
                                    color: 'white',
                                    textDecoration: 'none',
                                }}
                            >
                                Yii
                            </Link>
                        </Typography>

                        <Box sx={{flexGrow: 1, display: 'flex'}}>
                            {pages.map((page) => {
                                    if (!page.items) {
                                        return <NavLink name={page.name} link={page.link}/>
                                    }
                                    let key = page.name;
                                    return <>
                                        <NavLink name={page.name} link={'#'} onClick={handleOpenUserMenu.bind(this, key)}/>
                                        <Menu
                                            anchorEl={anchorElUser[key]}
                                            keepMounted
                                            open={Boolean(anchorElUser[key])}
                                            onClose={handleCloseUserMenu.bind(this, key)}
                                        >
                                            {page.items.map((item) => (
                                                <MenuItem key={item.name} onClick={handleCloseUserMenu.bind(this, key)}>
                                                    <NavLink
                                                        name={item.name}
                                                        link={item.link}
                                                        onClick={handleOpenUserMenu.bind(this, key)}
                                                        sx={{display: 'block'}}
                                                    />
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </>
                                }
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>

            <Container>
                <Outlet/>
            </Container>
        </>
    );
};
