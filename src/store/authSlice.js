import { createSlice } from "@reduxjs/toolkit";

const intitalState = {
    status: false,
    userData: null
}

const authSlcie = createSlice({
    intitalState,
    reducers: {
        login: (state, action) => {
            state.status = true
            state.userData = action.payload
        },
        logout: (state) => {
            state.status = false
        }
    }
})

export const { login, logout } = authSlcie.actions
export default authSlcie.reducer 