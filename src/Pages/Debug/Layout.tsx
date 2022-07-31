import * as React from 'react';
import {Outlet} from "react-router";
import {Autocomplete, TextField} from "@mui/material";
import {useGetDebugQuery} from "../../API/Debug";
import format from 'date-fns/format'
import {fromUnixTime} from "date-fns";
import {useDispatch} from "react-redux";
import {changeEntryAction} from "../../Provider/Debug/DebugEntryContext";

function formatDate(unixTimeStamp: number) {
    return format(fromUnixTime(unixTimeStamp), 'do MMM hh:mm:ss');
}

export const DebugLayout = () => {
    const dispatch = useDispatch()
    const {data, isLoading} = useGetDebugQuery('');

    if (isLoading) {
        return <>Loading..</>
    }

    function getOptions(entry: any) {
        if ('console' in entry) {
            return [formatDate(entry.console.request.startTime), entry.command.input].join(' ')
        }
        if ('web' in entry) {
            return [formatDate(entry.web.request.startTime), entry.request.method, entry.request.path].join(' ')
        }
        return entry.id
    }

    return (
        <>
            <Autocomplete
                freeSolo
                options={data!.data}
                getOptionLabel={getOptions}
                renderInput={(params) => <TextField {...params} label="freeSolo"/>}
                onChange={(event, value) => dispatch(changeEntryAction(value))}
            />
            {/*<Provider context={MyContext} store={store}>*/}
            <Outlet/>
            {/*</Provider>*/}
        </>
    );
};
