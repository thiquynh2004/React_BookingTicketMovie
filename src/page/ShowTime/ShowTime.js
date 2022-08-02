/* eslint-disable react-hooks/exhaustive-deps */

import React from "react";
import { useParams } from "react-router-dom";
import MenuAdmin from "../../component/Menu/MenuAdmin";
import ShowTimeTable from "./ShowTimeTable";

export default function ShowTime(props) {
  const { tenPhim } = useParams();
  return (
    <div className="show-time-management">
      <MenuAdmin />

      <div className="content">
        <div className="container">
          <h1>
            Tạo lịch chiếu phim - <b style={{ color: "orange" }}>{tenPhim}</b>
          </h1>
          <ShowTimeTable />
        </div>
      </div>
    </div>
  );
}
