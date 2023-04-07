import { createSlice} from '@reduxjs/toolkit';

export const expertSlice = createSlice({
    name:"expertDetails",
    initialState:{value:{}},
    reducers:{
            expertlogin:(state, action)=>{
            state.value= action.payload;
        }
    }
});
export const {expertlogin} = expertSlice.actions;
export default expertSlice.reducer;
