import {createSlice} from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

export const debugSlice = createSlice({
    name: 'store.debug',
    initialState: {
        entry: null,
    },
    reducers: {
        changeEntryAction: (state, action) => {
            state.entry = action.payload
        },
    },
})

export const {changeEntryAction} = debugSlice.actions

type State = {[debugSlice.name]: ReturnType<typeof debugSlice.getInitialState>}
export const useDebugEntry = () => useSelector((state: State) => state[debugSlice.name].entry)