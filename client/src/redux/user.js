import {createSlice} from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name:"userDetails",
    initialState:{value:{
        isUserAuth:false
    }},
    reducers:{
        login:(state,action)=>{
            state.value={...action.payload,
            isUserAuth:true}
        },
        logout:(state)=>{
            state.value={
                isUserAuth:false,
                user:null
            }
        }
    }
})

export const {login,logout} = userSlice.actions;
export default userSlice.reducer