import {createSlice, SliceCaseReducers} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';
import {DebugEntry} from '@yiisoft/yii-dev-panel-sdk/API/Debug/Debug';

type StateType = {
    entry: DebugEntry;
};
const initialState: StateType = {
    entry: null,
};
export const debugSlice = createSlice({
    name: 'store.debug',
    initialState: initialState,
    reducers: {
        changeEntryAction: (state, action) => {
            state.entry = action.payload;
        },
    },
});

export const {changeEntryAction} = debugSlice.actions;

type State = {[debugSlice.name]: ReturnType<typeof debugSlice.getInitialState>};
export const useDebugEntry = (): DebugEntry | null => useSelector((state: State) => state[debugSlice.name]?.entry);
