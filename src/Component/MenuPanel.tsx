import * as React from 'react';
import {useCallback, useEffect, useRef, useState} from 'react';
import {CSSObject, styled, Theme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Avatar, Link} from '@mui/material';
import {ChevronRight} from '@mui/icons-material';

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
        classes: 'opened',
    }),
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

const drawerStyles = {
    flex: '1 1 auto',
    '&.drawer-opened .MuiListItemButton-root .MuiListItemIcon-root': {
        mr: 3,
    },
    '& .MuiListItemButton-root .MuiListItemText-root': {
        display: 'none',
    },
    '&.drawer-opened .MuiListItemButton-root .MuiListItemText-root': {
        display: 'inline-block',
    },
    '& .MuiListItemButton-root .menu-opener': {
        transition: 'transform 0.3s',
    },
    '&.drawer-opened .MuiListItemButton-root .menu-opener': {
        transform: 'rotate(180deg)',
    },
};

type MenuPanelListProps = {
    onClick: () => void;
    linkProps: LinkProps[];
    activeLink?: string;
};

const MenuPanelList = React.memo((props: MenuPanelListProps) => {
    const {onClick, linkProps, activeLink} = props;
    return (
        <List>
            <ListItem disablePadding sx={{display: 'block'}}>
                <ListItemButton
                    onClick={onClick}
                    sx={{
                        minHeight: 48,
                        justifyContent: 'flex-end',
                        px: 2.5,
                    }}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: 'auto',
                            transition: 'margin-right 1s',
                            justifyContent: 'center',
                        }}
                    >
                        <ChevronRight className="menu-opener" />
                    </ListItemIcon>
                </ListItemButton>
            </ListItem>
            {linkProps.map((link, index) => (
                <ListItem key={index} disablePadding sx={{display: 'block'}}>
                    <ListItemButton
                        component={Link}
                        href={link.href}
                        sx={{
                            minHeight: 48,
                            justifyContent: 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <Avatar
                                variant="rounded"
                                sx={{
                                    bgcolor: activeLink === link.text ? 'secondary.main' : 'primary.main',
                                    fontSize: 14,
                                }}
                            >
                                {link.text.substring(0, 3)}
                            </Avatar>
                        </ListItemIcon>
                        <ListItemText primary={link.text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    );
});

const MenuPanel = React.memo((props: MenuPanelProps) => {
    const {links, children, activeLink} = props;

    const [open, setOpen] = useState(!!props.open);
    const containerRef = useRef();

    useEffect(() => {
        setOpen(!!props.open);
    }, [props.open]);

    const toggleHandler = useCallback(() => {
        setOpen((v) => !v);
    }, []);

    return (
        <Box sx={{display: 'flex', position: 'relative', flexWrap: 'nowrap'}} ref={containerRef}>
            <Drawer
                variant="permanent"
                className={open ? 'drawer-opened' : ''}
                open={open}
                container={containerRef.current}
                PaperProps={{
                    sx: {position: 'relative'},
                }}
                sx={drawerStyles}
            >
                <MenuPanelList onClick={toggleHandler} linkProps={links} activeLink={activeLink} />
            </Drawer>
            <Box sx={{flex: '1 1 100%', p: 1}}>{children}</Box>
        </Box>
    );
});

export {MenuPanel};
