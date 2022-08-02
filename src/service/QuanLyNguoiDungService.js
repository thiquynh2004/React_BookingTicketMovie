/* eslint-disable no-useless-constructor */
// import { GROUPID } from "../util/setting/config";
// import { GROUPID } from "../util/setting/config";
import { baseService } from "./baseService";


export class  QuanLyNguoiDungService extends baseService {
  constructor(){
    super();
  }
  dangNhap =(thongTinDangNhap)=> {
    return this.post(`api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap)

  }
}
export const quanLyNguoiDungService = new QuanLyNguoiDungService();