import { createSlice} from '@reduxjs/toolkit';

export const expertSlice = createSlice({
    name:"expertDetails",
    initialState:{value:{
        isExpertAuth:false,
        
    }},
    reducers:{
            expertlogin:(state, action)=>{
            state.value= {...action.payload,
            isExpertAuth:true}
        },
        expertlogout: (state)=>{
            state.value={
                isExpertAuth:false,
                expert:null
            }
        }
    }
});
export const {expertlogin,expertlogout} = expertSlice.actions;
export default expertSlice.reducer;
