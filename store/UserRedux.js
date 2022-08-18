import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginApi, apiGetCall, postCmdApi } from '../utility/site-apis'
import { toast } from 'react-toastify';
import Config from "../common/Config";

const initialState = {
    isFetching: false,
    error: null,
    user: null,
    token: null,
}

export const siteLogin = createAsyncThunk(
    'user/siteLogin',
    async (params, { rejectWithValue }) => {
        const response = await loginApi(`/api/method/${Config.frappe_custom_app}.authentication.login`, params)
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        if (response) {
            const user = await apiGetCall(`/api/resource/User/${response.user}`, { token: `token ${response.token}` })
            if (user.status === 'error') {
                return rejectWithValue(response.data)
            }
            let roles = []
            for (let item of user.roles) {
                roles.push(item.role)
            }
            response.roles = roles
            return { ...user, ...response }
        }
    }
)


export const signUpUser = createAsyncThunk(
    'user/signUpUser',
    async (params, { rejectWithValue }) => {
        const response = await postCmdApi({ cmd: 'frappe.core.doctype.user.user.sign_up', redirect_to: ' ', ...params })
        if (response.status === 'error') {
            return rejectWithValue(response.data)
        }
        return response.data.message
    }
)

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
            state.token = null
        },
    },
    extraReducers: {
        // siteLogin
        [siteLogin.pending]: (state) => {
            state.isFetching = true
            state.error = null
            state.token = null
            state.user = null
        },
        [siteLogin.rejected]: (state, action) => {
            state.isFetching = false
            state.error = action?.payload?.message
        },
        [siteLogin.fulfilled]: (state, action) => {
            state.isFetching = false
            state.error = null
            state.token = `token ${action?.payload?.token}`
            state.user = action?.payload
        },
        // Sign Up
        [signUpUser.pending]: (state) => {
            state.isFetching = true
            state.error = null
        },
        [signUpUser.rejected]: (state, action) => {
            state.isFetching = false
            state.error = action?.payload?.message
        },
        [signUpUser.fulfilled]: (state, action) => {
            toast.success(action?.payload[1] ? action?.payload[1] : `SignUp successfully`);
            state.isFetching = false
        },
    }

})

export const { logout } = counterSlice.actions
export default counterSlice.reducer