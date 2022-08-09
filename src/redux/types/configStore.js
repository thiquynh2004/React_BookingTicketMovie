import { configureStore } from "@reduxjs/toolkit";
import { QuanLyPhimReducer } from "../reducers/QuanLyPhimReducer";
// import userReducer from "../reducers/UserManagementReducer";
import {QuanLyNguoiDungReducer} from "../reducers/QuanLyNguoiDungReducer"
import {QuanLyRapReducer} from "../reducers/QuanLyRapReducer"

const store = configureStore({ 
     reducer:{
        QuanLyPhimReducer,
        QuanLyNguoiDungReducer,
        QuanLyRapReducer,
     }
});
export default store;