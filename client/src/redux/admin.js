import { createSlice} from '@reduxjs/toolkit';

export const adminSlice = createSlice({
    name:"adminDetails",
    initialState:{value:{
        isAdminAuth:false
    }},
    reducers:{
            adminlogin:(state, action)=>{
            state.value= {...action.payload,
            isAdminAuth:true}
        },
        adminlogout: (state)=>{
            state.value={
                isAdminAuth:false,
                admin:null
            }
        }
    }
});
export const {adminlogin,adminlogout} = adminSlice.actions;
export default adminSlice.reducer;
