/* eslint-disable no-useless-constructor */
// import { GROUPID } from "../util/setting/config";
import { GROUPID } from "../util/setting/config";
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }
  dangNhap = (thongTinDangNhap) => {
    return this.post(`api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };

  layDanhSachNguoiDung = () => {
    return this.get(`api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${GROUPID}`
    );
  };
  //chức năng cập nhật cho user đăng nhập
  capNhatThongTinNguoiDung = (formData) => {
    return this.put(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, formData)
  }
  timKiemNguoiDung = (tuKhoa) => {
    return this.get(
      `api/QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=${GROUPID}&tuKhoa=${tuKhoa}`
    );
  };
  layThongTinNguoiDung = () => {
    return this.post("api/QuanLyNguoiDung/ThongTinTaiKhoan");
  };
  LayDanhSachLoaiNguoiDung = () => {
    return this.get(`api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung`);
  };
  themNguoiDung = (formData) => {
    return this.post(`api/QuanLyNguoiDung/ThemNguoiDung`, formData);
  }
  xoaNguoiDung = (taiKhoan) => {
    return this.delete(`api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`)
  }
  capNhatThongTinDanhSachNguoiDung =(formData) => {
    return this.post(`api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`, formData)
  }
}
export const quanLyNguoiDungService = new QuanLyNguoiDungService();
