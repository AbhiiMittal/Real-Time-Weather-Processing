import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    token: null,
    isKelvin : null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.token = action.payload.token;
            state.currentUser = action.payload.user;
        },
        setTemp: (state, action) => {
            state.temp = action.payload;
        },
        resetUser: (state) => {
            state.currentUser = null;
            state.token = null;
        }
    },
});

export const { setUser, setTemp, resetUser } = userSlice.actions;

export default userSlice.reducer;