import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name:"userDetails",
    initialState:{value:{}},
    reducers:{
        login:(state,action)=>{
            state.value=action.payload
        }
    }
})

export const {login} = userSlice.actions;
export default userSlice.reducer