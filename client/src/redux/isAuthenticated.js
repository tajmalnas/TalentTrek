import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
}

export const isAuthenticatedSlice = createSlice({
    name: 'isAuthenticated',
    initialState: initialState,
    reducers: {
        setAuthenticate: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    }
});

export const { setAuthenticate } = isAuthenticatedSlice.actions;

export default isAuthenticatedSlice.reducer;