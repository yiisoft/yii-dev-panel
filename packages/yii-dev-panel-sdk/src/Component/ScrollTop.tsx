import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {Fab} from '@mui/material';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import * as React from 'react';

export const ScrollTopButton = React.memo(() => {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        ((event.target as HTMLDivElement).ownerDocument || document).querySelector('body')?.scrollIntoView({
            block: 'start',
            behavior: 'smooth',
        });
    };

    return (
        <Fade in={trigger}>
            <Box onClick={handleClick} role="presentation" sx={{position: 'fixed', bottom: 68, right: 16, zIndex: 100}}>
                <Fab size="small">
                    <KeyboardArrowUpIcon />
                </Fab>
            </Box>
        </Fade>
    );
});
