
import { history } from "../../../App";
import { quanLyNguoiDungService } from "../../../service/QuanLyNguoiDungService";
import {
  DANG_NHAP_ACTION,
  SET_LAY_DANH_SẠCH_NGUOI_DUNG,
  SET_MA_LOAI_NGUOI_DUNG,
  SET_THONG_TIN_NGUOI_DUNG,
} from "./QuanLyNguoiDungTypes";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
      }

      console.log("result", result);
      history.push("/admin");
    } catch (error) {
      console.error("error", error.response.data);
    }
  };
};

export const layThongTinTaiKhoanAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinTaiKhoan();
      console.log(result.data.content);
    } catch (error) {
      console.error("error", error.response?.data);
    }
  };
};

// export const layDanhSachNguoiDungAction = () => {
//   return async (dispatch) => {
//     try {
//       const result = await quanLyNguoiDungService.layDanhSachNguoiDung();
//       console.log(result.data.content);
//       dispatch({
//         type:  SET_THONG_TIN_TIM_KIEM,
//         thongTinTimKiem: result.data.content,
//       });
//     } catch (error) {
//       console.log("error", error.response?.data);
//     }
//   };
// };
export const layDanhSachNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layDanhSachNguoiDung();
      console.log(result.data.content);
      dispatch({
        type: SET_LAY_DANH_SẠCH_NGUOI_DUNG,
        arrUsers: result.data.content,
      });
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};
//Chức năng cập nhật tài khoản
export const capNhatThongTinNguoiDungAction= (formData) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTinNguoiDung(formData);
      console.log(result.data.content)
    } catch (error) {
      console.log('error', error.response?.data)
    }
  
  }
}

// export const timKiemNguoiDungAction = (tuKhoa) => {
//   return async (dispatch) => {
//     try {
//       const result = await quanLyNguoiDungService.timKiemNguoiDung(tuKhoa);
//       dispatch({
//         type: SET_THONG_TIN_TIM_KIEM,
//         thongTinTimKiem: result.data.content,
//       });
//       console.log(result.data.content);
//     } catch (error) {
//       console.log("error", error.response?.data);
//     }
//   };
// };
export const timKiemNguoiDungAction = (tuKhoa) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.timKiemNguoiDung(tuKhoa);
      dispatch({
        type: SET_LAY_DANH_SẠCH_NGUOI_DUNG,
        arrUsers: result.data.content,
      });
      console.log(result.data.content);
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const layDanhSachLoaiNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.LayDanhSachLoaiNguoiDung();
      dispatch({
        type: SET_MA_LOAI_NGUOI_DUNG,
        arrLoaiNguoiDung: result.data.content,
      });
      console.log(result.data.content);
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const layThongTinNguoiDungAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung(thongTinDangNhap);
      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }
      console.log("result", result);
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const themNguoiDungAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.themNguoiDung(formData);
    
      console.log("result", result.data.content);
      // history.push("/admin/users")
    } catch (error) {
      console.log("error", error.response?.data);
    }
  };
};

export const xoaNguoiDung = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.xoaNguoiDung(taiKhoan);
      dispatch(layDanhSachNguoiDungAction());
      console.log(result.data.content);
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};


export const capNhatThongTinDanhSachNguoiDungAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.capNhatThongTinDanhSachNguoiDung(formData)
      console.log(result.data.content)
    } catch (error) {
      console.log('error', error.response?.data)
    }
  }
}