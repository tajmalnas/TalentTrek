import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    role: '',
}

export const roleSlice = createSlice({
    name: 'role',
    initialState: initialState,
    reducers: {
        setRole: (state, action) => {
            state.role = action.payload;
        }
    }
});

export const { setRole } = roleSlice.actions;

export default roleSlice.reducer;