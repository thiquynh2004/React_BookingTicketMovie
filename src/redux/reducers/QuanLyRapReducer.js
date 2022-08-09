import { SET_LAY_DANH_SACH_HE_THONG_RAP } from "../actions/types/QuanLyRapTypes"

const initialState =  {
    heThongRapChieu :[]
}

export const QuanLyRapReducer = (state= initialState, action) => {
    switch (action.type) {
        case SET_LAY_DANH_SACH_HE_THONG_RAP: {
            state.heThongRapChieu = action.heThongRapChieu;
            return { ...state}
        }
        default:
            return { ...state}
            break;
    }
}