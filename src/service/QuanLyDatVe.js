/* eslint-disable no-useless-constructor */
// import { GROUPID } from "../util/setting/config";
import { baseService } from "./baseService";


export class  QuanLyDatVeService extends baseService {
  constructor(){
    super();
  }
  taoLichChieu = (thongTinLichChieu) => {
return this.post(`api/QuanLyDatVe/TaoLichChieu`, thongTinLichChieu)
  }
}
export const quanLyDatVeService = new QuanLyDatVeService();