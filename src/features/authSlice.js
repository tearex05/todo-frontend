import {createSlice} from '@reduxjs/toolkit'

const initialState = {
	user: localStorage.getItem('user')
}


export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
	},
})

export default authSlice.reducer