/* eslint-disable no-useless-constructor */
import { GROUPID } from "../util/setting/config";
import { baseService } from "./baseService";


export class  QuanLyPhimService extends baseService {
  constructor(){
    super();
  }
  layDanhSachPhim =(tenPhim='')=> {
    if(tenPhim.trim() !==''){
      return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID
      }&tenPhim=${tenPhim}`)
    }
    return this.get(`api/QuanLyPhim/LayDanhSachPhim?maNhom=${GROUPID
    }`)
  }
//chức năng thêm phim
  themPhimUploadHinhAnh = (formData)=> {
    return this.post(`api/QuanLyPhim/ThemPhimUploadHinh`, formData)
  }
// Chức năng edit
  layThongTinPhim = (maPhim) => {
    return this.get(`api/QuanLyPhim/LayThongTinPhim?MaPhim=${maPhim}`)
  }
  //Chức năng cập nhật
  capNhatPhimLoad = (formData) => {
    return this.post(`api/QuanLyPhim/CapNhatPhimUpload`, formData)
  }

  xoaPhim = (maPhim) => {
    return this.delete (`api/QuanLyPhim/XoaPhim?MaPhim=${maPhim}`)
  }
}
export const quanLyPhimService = new QuanLyPhimService();