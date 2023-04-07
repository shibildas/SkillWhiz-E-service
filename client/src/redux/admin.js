import { createSlice} from '@reduxjs/toolkit';

export const adminSlice = createSlice({
    name:"adminDetails",
    initialState:{value:{}},
    reducers:{
            adminlogin:(state, action)=>{
            state.value= action.payload;
        }
    }
});
export const {adminlogin} = adminSlice.actions;
export default adminSlice.reducer;
