import { TOKEN, USER_LOGIN } from "../../util/setting/config";
import { DANG_NHAP_ACTION , SET_LAY_DANH_SẠCH_NGUOI_DUNG, SET_MA_LOAI_NGUOI_DUNG, SET_THONG_TIN_NGUOI_DUNG, SET_THONG_TIN_TIM_KIEM} from "../actions/types/QuanLyNguoiDungTypes";

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
  console.log(user);
}

const initialState = {
  userLogin: user,
  arrUsers: [],
  arrUserDefault: [],
  thongTinNguoiDung: {},
  arrLoaiNguoiDung: [],
  thongTinTimKiem: {},
};

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      const { thongTinDangNhap } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
      return { ...state, userLogin: thongTinDangNhap };
    }
    case SET_LAY_DANH_SẠCH_NGUOI_DUNG: {
      state.arrUsers = action.arrUsers;
      state.arrUserDefault = state.arrUsers;
      return {...state}

    }
    case SET_THONG_TIN_NGUOI_DUNG :{ 
      state.thongTinNguoiDung = action.thongTinNguoiDung;
      return {...state};
  }
    case SET_MA_LOAI_NGUOI_DUNG: {
      state.arrLoaiNguoiDung = action.arrLoaiNguoiDung;
      return {...state};
    } 
    case SET_THONG_TIN_TIM_KIEM: {
      state.thongTinTimKiem = action.thongTinDangNhap;
      return {...state};
    }
    default:
      return { ...state };
  }
};
