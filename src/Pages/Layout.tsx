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
    {name: 'Debug', link: '#'},
    {
        name: 'Inspector', link: '/inspector', items: [
            {name: 'Parameters', link: '/inspector/parameters'},
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
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
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
                                    return <>
                                        <NavLink name={page.name} link={'#'} onClick={handleOpenUserMenu}/>
                                        <Menu
                                            anchorEl={anchorElUser}
                                            keepMounted
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            {page.items.map((item) => (
                                                <MenuItem key={item.name} onClick={handleCloseUserMenu}>
                                                    <NavLink
                                                        name={item.name}
                                                        link={item.link}
                                                        onClick={handleOpenUserMenu}
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
