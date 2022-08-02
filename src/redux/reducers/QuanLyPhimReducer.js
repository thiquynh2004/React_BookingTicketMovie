/* eslint-disable no-fallthrough */
import {
  SET_DANH_SACH_PHIM,
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
  SET_THONG_TIN_FILM,
} from "../actions/QuanLyPhimTypes";

const initialState = {
  arrFilms: [
    {
      maPhim: 1333,
      tenPhim: "Trainwreckk",
      biDanh: "trainwreckk",
      trailer: "https://www.youtube.com/embed/2MxnhBPoIx4",
      hinhAnh: "https://movienew.cybersoft.edu.vn/hinhanh/trainwreckk_gp05.jpg",
      moTa: "<p>Having thought that monogamy was never possible, a commitment-phobic career woman may have to face her fears when she meets a good guy.</p>",
      maNhom: "GP05",
      ngayKhoiChieu: "2021-01-11T00:00:00",
      danhGia: 10,
      hot: false,
      dangChieu: true,
      sapChieu: false,
    },
  ],
  dangChieu: true,
  sapChieu: true,
  arrFilmDefault: [],
  thongTinPhim: {},
};

export const QuanLyPhimReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DANH_SACH_PHIM: {
      state.arrFilms = action.arrFilms;
      state.arrFilmDefault = state.arrFilms;

      return { ...state };
    }
    case SET_PHIM_DANG_CHIEU: {
      state.dangChieu = !state.dangChieu;
      state.arrFilms = state.arrFilmDefault.filter(
        (films) => films.dangChieu === state.dangChieu
      );
      return {...state}
    }
    case SET_PHIM_SAP_CHIEU: {
      state.sapChieu = !state.sapChieu;
      state.arrFilms = state.arrFilmDefault.filter(
        (films) => films.sapChieu === state.sapChieu
      );
      return { ...state };
    }
    case SET_THONG_TIN_FILM:{
      state.thongTinPhim = action.thongTinPhim;
      return{ ...state}
    }
    default:
      return { ...state };
  }
};
