import { createSlice } from "@reduxjs/toolkit";

// import { save_tokens_constant } from "../constant.js";
import { signup_async } from "../services/authService";
import { asyncStatus } from "../../utils/asyncStatus";

let initialState = {
  data: null,
  signup_status: asyncStatus.IDLE,
  signup_error: null,
  login_status: asyncStatus.IDLE,
  login_error: null,
  userAuth: false,
  check_auth_status: asyncStatus.IDLE,
  check_auth_data: null,
  current_user:null,
  loading:false
};

const auth_slice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    setAuthStatePayload(state, {payload}) {
      state.userAuth = payload;
    },
    setAuthState(state, { payload }) {
      state.userAuth = payload;
      state.check_auth_status = asyncStatus.SUCCEEDED;
    },
    setCheckAuthStatus(state,{payload}){
      state.check_auth_status=payload
    },
    setSignupStatus(state,{payload}){
      state.signup_status=payload
    },
    setSignupError(state,{payload}){
      state.signup_error=payload
    },
    setLoginStatus(state,{payload}){
      state.login_status=payload
    },
    setLoginError(state,{payload}){
      state.login_error=payload
    },
    setCurrentUser(state,{payload}){
      state.current_user=payload
    },
    setLoading(state,{payload}){
      state.loading=payload
    }
  },
  extraReducers: (builder) => {
    // builder.addCase(signup_async.pending, (state, action) => {
    //   state.signup_status = asyncStatus.LOADING;
    // });
    // builder.addCase(signup_async.fulfilled, (state, { payload }) => {
    //   // console.log(payload);
    //   // if (payload.success) {
    //     state.userAuth = true;
    //     state.data = payload;
    //     state.signup_status = asyncStatus.SUCCEEDED;
    //     // localStorage.setItem(save_tokens_constant, payload.auth_token);
    //   // }
    // });
    // builder.addCase(signup_async.rejected, (state, { payload }) => {
    //   state.signup_status = asyncStatus.ERROR;
    //   state.userAuth = false;
    //   // state.user = null
    // });

    // builder.addCase(check_auth_async.pending, (state, action) => {
    //   state.check_auth_status = asyncStatus.LOADING;
    // });
    // builder.addCase(check_auth_async.fulfilled, (state, { payload }) => {
    //   console.log("paylodad", payload);
    //   // console.log(payload);
    //   if (payload.success) {
    //     state.check_auth_data = payload;
    //     state.check_auth_status = asyncStatus.SUCCEEDED;
    //     state.userAuth = payload.success;
    //   }
    // });
    // builder.addCase(check_auth_async.rejected, (state, actions) => {
    //   console.log("paylodad", actions.error);
    //   state.check_auth_status = asyncStatus.ERROR;
    //   state.check_auth_data = null;
    // });
  },
});

export default auth_slice.reducer;

export const { setAuthStatePayload,setCurrentUser,setLoading, setAuthState,setCheckAuthStatus,setSignupStatus,setSignupError,setLoginStatus,setLoginError } = auth_slice.actions;
