import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    userid:"",
    modal:false,
    addmodal:false,
    editmodal:false,
    dealerid:[],
    userType:'',
    otp:'',
    resetkey:'',
    filter:{}
    
};

export const redu = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handletoken: (state, action) => {
            console.log(action.payload , "====>handletoken");
            
            state.token = action.payload;
        },
        handledata:(state,action)=>{
           state.datas=action.payload;
        },
        handleuserid:(state,action)=>{
      state.userid=action.payload;
        },
        handlemodal:(state,action)=>{
           state.modal=action.payload;
        },
        handleaddmodal:(state,action)=>{
            state.addmodal=action.payload
        },
        handleditmodal:(state,action)=>{
            state.editmodal=action.payload
        },
        handledealerid:(state,action)=>{
            state.dealerid=action.payload
        },
        handleuserType:(state,action)=>{
            state.userType=action.payload;
        },
        handleotp:(state,action)=>{
            state.otp=action.payload;
        },
        handleresetkey:(state,action)=>{
            state.resetkey=action.payload;
        },
        handlefilter:(state,action)=>{
            state.filter=action.payload;
        }
    }
});

export const { handletoken ,handledata,handleuserid,handlemodal,handleaddmodal,handleditmodal,handledealerid,handleuserType,handleresetkey,handlefilter} = redu.actions;
export default redu.reducer;
