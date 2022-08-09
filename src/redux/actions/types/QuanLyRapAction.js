import { quanLyRapService } from "../../../service/QuanLyRapService";
import { SET_LAY_DANH_SACH_HE_THONG_RAP } from "./QuanLyRapTypes";

export const layDanhSachHeThongRapAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layDanhSachHeThongRap();
      console.log("result", result.data.content);
      if (result.status === 200) {
        dispatch({
          type: SET_LAY_DANH_SACH_HE_THONG_RAP,
          heThongRapChieu: result.data.content,
        });
      }
    } catch (errors) {
      console.log("errors", errors.response?.data);
    }
  };
};
