// import { map } from "lodash";
import { quanLyPhimService } from "../../../service/QuanLyPhimService";
import { SET_DANH_SACH_PHIM, SET_THONG_TIN_FILM } from "../QuanLyPhimTypes";

export const layDanhSachPhimAction = (tenPhim='') => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);

      dispatch({
        type: SET_DANH_SACH_PHIM,
        arrFilms: result.data.content,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const themPhimUploadHinhAnhAction = (formData) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.themPhimUploadHinhAnh(formData);
      alert("Thêm Phim thành công");
      console.log("result", result.data.content);
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layThongTinPhim(maPhim);
      dispatch({
        type: SET_THONG_TIN_FILM,
        thongTinPhim: result.data.content,
      });
    } catch (error) {
      console.log(error.response?.data);
    }
  };
};


export const capNhatPhimLoadAction = (formData) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.capNhatPhimLoad(formData);
            alert("Cập nhật phim thành công")
            console.log(result.data.content)
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}
export const xoaPhimAction = (maPhim) => {
    return async (dispatch) => {
        try {
            const result = await quanLyPhimService.xoaPhim(maPhim);
            // alert("Xóa Phim thành công")
            dispatch(layDanhSachPhimAction())
            console.log(result.data.content)
        } catch (error) {
            console.log(error.response?.data);
        }
    }
}