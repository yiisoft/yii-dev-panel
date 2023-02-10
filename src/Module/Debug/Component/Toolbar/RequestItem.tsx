import {Button} from '@mui/material';
import React from 'react';
import {DebugEntry} from '../../API/Debug';
import {OverridableStringUnion} from '@mui/types';
import {ButtonPropsColorOverrides} from '@mui/material/Button/Button';

type MuiColor = OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides
>;
const buttonColor = (status: number): MuiColor => {
    switch (true) {
        case status >= 400:
            return 'error';
        case status >= 300:
            return 'warning';
        case status >= 200:
            return 'success';
    }
    return 'info';
};

type RequestItemProps = {
    data: DebugEntry;
};
export const RequestItem = ({data}: RequestItemProps) => {
    return (
        <Button
            color={buttonColor(data.response.statusCode)}
            variant="contained"
            sx={{textTransform: 'none', borderRadius: 0}}
        >
            {data.request.method}&nbsp;
            {data.request.path}&nbsp;
            {String(data.response.statusCode)}
        </Button>
    );
};
