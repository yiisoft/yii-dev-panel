import {Link as RouterLink, LinkProps as RouterLinkProps} from 'react-router-dom';
import {LinkProps} from '@mui/material/Link';
import {createTheme} from '@mui/material';
import React from 'react';

const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, 'to'> & {href: RouterLinkProps['to']}>(
    (props, ref) => {
        const {href, ...other} = props;

        if (typeof href !== 'string' || href === '#') {
            return <a href={'#'} ref={ref} {...other} />;
        }

        if (href.startsWith('http://') || href.startsWith('https://')) {
            return <a href={href} ref={ref} {...other} />;
        }

        // Map href (MUI) -> to (react-router)
        return <RouterLink ref={ref} to={href} {...other} />;
    },
);

export const theme = createTheme({
    palette: {
        primary: {
            main: '#00617B',
        },
        secondary: {
            main: '#873C00',
        },
    },
    components: {
        MuiLink: {
            defaultProps: {
                component: LinkBehavior,
            } as LinkProps,
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior,
            },
        },
    },
});
