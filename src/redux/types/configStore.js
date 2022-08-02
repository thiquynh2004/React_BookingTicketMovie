import { configureStore } from "@reduxjs/toolkit";
import { QuanLyPhimReducer } from "../reducers/QuanLyPhimReducer";
// import userReducer from "../reducers/UserManagementReducer";
import {QuanLyNguoiDungReducer} from "../reducers/QuanLyNguoiDungReducer"

const store = configureStore({ 
     reducer:{
        QuanLyPhimReducer,
        QuanLyNguoiDungReducer
     }
});
export default store;