import * as React from 'react';
import {useRef} from 'react';
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from '@mui/material';
import {Clear} from '@mui/icons-material';

export type FilterInputProps = {
    value?: string;
    onChange: (value: string) => void;
};
export const FilterInput = (props: FilterInputProps) => {
    const {onChange, value = ''} = props;
    const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    return (
        <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
            <InputLabel htmlFor="filter">Filter</InputLabel>
            <OutlinedInput
                id="filter"
                label="Filter"
                autoFocus
                defaultValue={value}
                onChange={(e) => {
                    clearTimeout(timeoutIdRef.current);
                    timeoutIdRef.current = setTimeout(() => {
                        onChange(e.target.value);
                    }, 200);
                }}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={() => onChange('')} edge="end">
                            <Clear />
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};
