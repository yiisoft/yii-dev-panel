import {CircularProgress} from '@mui/material';
import * as React from 'react';

export const FullScreenCircularProgress = ({indicatorSize = 40}: {indicatorSize?: number}) => {
    return (
        <CircularProgress
            size={indicatorSize}
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: `${-indicatorSize / 2}px`,
                marginLeft: `${-indicatorSize / 2}px`,
            }}
        />
    );
};
