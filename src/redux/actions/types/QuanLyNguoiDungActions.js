
import { history } from "../../../App";
import { quanLyNguoiDungService } from "../../../service/QuanLyNguoiDungService";
import { DANG_NHAP_ACTION } from "./QuanLyNguoiDungTypes";

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
  
      console.log('result',result)
      history.push("/admin")
    } catch (error) {
      console.error('error', error.response.data)
    }
  };
};
