/* eslint-disable no-useless-constructor */
import { GROUPID } from "../util/setting/config";
import { baseService } from "./baseService";


export class  QuanLyRapService extends baseService {
  constructor(){
    super();
  }
  layDanhSachHeThongRap = () => {
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap?maNhom=${GROUPID}`);
}
  layThongTinHeThongRap = () => {
    return this.get(`api/QuanLyRap/LayThongTinHeThongRap`)
  }
  layThongTinCumRapTheoHeThong = (maHeThongRap) => {
    return this.get(`api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`)
  }
  layThongTinLichChieuPhim = (maPhim) => {
    return this.get(`api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`)
  }
}
export const quanLyRapService = new QuanLyRapService();