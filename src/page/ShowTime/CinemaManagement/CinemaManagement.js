/* eslint-disable react-hooks/exhaustive-deps */
import { Card, Tabs } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import MenuAdmin from "../../../component/Menu/MenuAdmin";
import { layDanhSachHeThongRapAction } from "../../../redux/actions/types/QuanLyRapAction";
import "./cinema.scss";
const { TabPane } = Tabs;
const { Meta } = Card;

export default function CinemaManagement() {
  const dispatch = useDispatch();
  const { heThongRapChieu } = useSelector((state) => state.QuanLyRapReducer);
  console.log("Hệ thống rạp chiếu", heThongRapChieu);

  useEffect(() => {
    dispatch(layDanhSachHeThongRapAction());
  }, []);

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <div className="cinema-management">
      <MenuAdmin />

      <div className="content">
        <div className="container">
          <h1>Quản lý rạp chiếu phim</h1>
          <Tabs defaultActiveKey="1" onChange={onChange}>
            {heThongRapChieu?.map((heThongRap, index) => (
              <TabPane tab={heThongRap.tenHeThongRap} key={index}>
                <Tabs>
                  {heThongRap.lstCumRap?.map((lstCumRap, index) => (
                    <TabPane
                      tab={lstCumRap.tenCumRap}
                      key={index}
                      className="list-film"
                    >
                      {/* Load danh sách phim trên cụm rạp */}
                      {lstCumRap.danhSachPhim?.map((danhSachPhim, index) => (
                        <Card
                          hoverable
                          style={{
                            width: 240,
                          }}
                          cover={
                            <img
                              alt={danhSachPhim.tenPhim}
                              src={danhSachPhim.hinhAnh}
                              style={{ height: "260px" }}
                            />
                          }
                        >
                          <Meta
                            title={danhSachPhim.tenPhim}
                            description={lstCumRap.diaChi}
                          />

                          {danhSachPhim.lstLichChieuTheoPhim?.map(
                            (lstLichChieuTheoPhim, index) => (
                              <div className="list-showtime" >
                                <NavLink to="/" key={index}>
                                  {moment(
                                    lstLichChieuTheoPhim.ngayChieuGioChieu
                                  ).format("hh:mm A")}
                                </NavLink>
                              </div>
                            )
                          )}
                        </Card>
                      ))}
                    </TabPane>
                  ))}
                </Tabs>
              </TabPane>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
