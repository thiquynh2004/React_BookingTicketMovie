import React from "react";
import MenuAdmin from "../../../component/Menu/MenuAdmin";

export default function CinemaManagement() {
  return (
    <div>
      <div className="cinema-management">
        <MenuAdmin />
        <div className="content">
          <div className="container">
            <h1>Quản lý rạp chiếu phim </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
