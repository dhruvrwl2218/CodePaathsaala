import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
    islogin : false,
    Role : "",
    User_id : ""
}

const AuthSlice = createSlice({
    name : 'Auth',
    initialState,
    reducers : {
        login : (state,action)=>{
            state.islogin = true;
             console.log(action.payload)
             const {User_id,Role} = action.payload;
            state.Role = Role;
            state.User_id = User_id;  
            localStorage.setItem('AuthState', JSON.stringify(state));
        },
        logout :(state)=>{
            state.islogin = false;
            state.Role = "";
            state.User_id = "";
            localStorage.removeItem('AuthState');

        }
    }
})

export const {login,logout} = AuthSlice.actions;
export default AuthSlice.reducer;
export const islogin = state => state.Auth.islogin;