import {OverridableStringUnion} from '@mui/types';
import {ButtonPropsColorOverrides} from '@mui/material/Button/Button';

export type MuiColor = OverridableStringUnion<
    'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
    ButtonPropsColorOverrides
>;
