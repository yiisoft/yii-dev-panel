import * as React from 'react';
import {useEffect, useRef} from 'react';
import {CSSObject, styled, Theme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Avatar, Link} from '@mui/material';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export type LinkProps = {
    text: string;
    icon: React.ReactElement;
    href: string;
};

type MenuPanelProps = {
    open?: boolean;
    links: LinkProps[];
    activeLink?: string;
    children: React.ReactNode;
};

export function MenuPanel(props: MenuPanelProps) {
    const [open, setOpen] = React.useState(!!props.open);

    console.log(props.activeLink, props.links);
    useEffect(() => {
        setOpen(!!props.open);
    }, [props.open]);

    const {links, children} = props;

    const toggleHandler = () => {
        setOpen((v) => !v);
    };

    const containerRef = useRef();

    return (
        <Box sx={{display: 'flex', position: 'relative', flexWrap: 'nowrap'}} ref={containerRef}>
            <Drawer
                variant="permanent"
                open={open}
                container={containerRef.current}
                PaperProps={{
                    sx: {position: 'relative'},
                }}
                sx={{flex: '1 1 auto'}}
            >
                <List>
                    <ListItem disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            onClick={toggleHandler}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'flex-end' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {open ? <ChevronLeftIcon/> : <MenuIcon/>}
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    {links.map((link, index) => (
                        <ListItem key={index} disablePadding sx={{display: 'block'}}>
                            <ListItemButton
                                component={Link}
                                href={link.href}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            bgcolor: props.activeLink === link.text ? 'secondary.main' : 'primary.main',
                                            fontSize: 14,
                                        }}
                                    >
                                        {link.text.substring(0, 3)}
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText primary={link.text} hidden={!open}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box sx={{flex: '1 1 100%', p: 1}}>{children}</Box>
        </Box>
    );
}
