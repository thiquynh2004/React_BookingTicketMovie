/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { Button, DatePicker, Input, message, Modal, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import MenuAdmin from "../../component/Menu/MenuAdmin";
import {
  layDanhSachPhimAction,
  xoaPhimAction,
} from "../../redux/actions/types/QuanLyPhimActions";
import moment from "moment";
import { Navigate, NavLink } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { USER_LOGIN } from "../../util/setting/config";
import "./films.scss";
const { confirm } = Modal;
const { Search } = Input;

export default function Films() {
  const { arrFilmDefault } = useSelector((state) => state.QuanLyPhimReducer);
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("arrFilmDefault", arrFilmDefault);

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const data = arrFilmDefault;
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const columns = [
    {
      title: "Id",
      dataIndex: "maPhim",
      key: "maPhim",
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortOrder: sortedInfo.columnKey === "maPhim" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Tên phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      filteredValue: filteredInfo.tenPhim || null,
      sorter: (a, b) => a.tenPhim.length - b.tenPhim.length,
      sortOrder: sortedInfo.columnKey === "tenPhim" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Hình ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text, films) => {
        return (
          <Fragment>
            <img
              src={films.hinhAnh}
              alt={films.name}
              style={{ width: "80px", height: "auto" }}
            />
          </Fragment>
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "moTa",
      render: (text, films) => {
        return (
          <Fragment>
            {films.moTa.length > 50
              ? films.moTa.substr(0, 50) + "..."
              : films.moTa}
          </Fragment>
        );
      },
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
      render: (text, films) => {
        return (
          <Fragment>
            <Space direction="vertical" size={12}>
              <DatePicker
                defaultValue={moment(films.ngayKhoiChieu)}
                format={dateFormatList}
              />
               {/* <DatePicker defaultValue={moment(films.ngayKhoiChieu, dateFormatList[0])} format={dateFormatList} /> */}
            </Space>
          </Fragment>
        );
      },
    },
    {
      title: "Hành động",
      dataIndex: "maPhim",
      render: (text, films) => {
        return (
          <Fragment>
            <NavLink
              to={`/admin/films/edit/${films.maPhim}`}
              className="edit-films"
              style={{ fontSize: "20px" }}
            >
              <EditOutlined />
            </NavLink>
            <span
              onClick={() => {
                confirm({
                  title: "Bạn có chắc muốn xóa phim không?",
                  icon: <DeleteOutlined />,
                  content:
                    "Dữ liệu liên quan đến phim sẽ không khôi phục lại được ",
                  okText: "Yes",
                  okType: "danger",
                  cancelText: "No",

                  onOk() {
                    dispatch(xoaPhimAction(films.maPhim));
                    message.success("Xóa phim thành công");
                    console.log("OK");
                  },

                  onCancel() {
                    console.log("Cancel");
                  },
                });
              }}
              className="delete-films"
              style={{
                fontSize: "20px",
                margin: "0 8px",
                color: "red",
                cursor: "pointer",
              }}
            >
              <DeleteOutlined />
            </span>

            <NavLink
              to={`/admin/films/show-time/${films.maPhim}/${films.tenPhim}`}
              className="showTime-film"
              style={{ fontSize: "20px", cursor: "pointer" }}
            >
              <CalendarOutlined />
            </NavLink>
          </Fragment>
        );
      },
    },
  ];

  const onSearch = (value) => {
    console.log(value);
    dispatch(layDanhSachPhimAction(value));
  };

  if (!localStorage.getItem(USER_LOGIN)) {
    alert("Không có quyền truy cập");
    return <Navigate to="/" />;
  }
  if (userLogin.maLoaiNguoiDung !== "QuanTri") {
    alert("Không có quyền truy cập");
    return <Navigate to="/" />;
  }

  return (
    <div className="films_management">
      <MenuAdmin />
      <div className="content">
        <div className="container">
          <h1>Quản lí phim</h1>
          <NavLink to="/admin/films/add-film">
            <Button className="btn add-film" style={{ margin: "10px 0" }}>
              Thêm Phim
            </Button>
          </NavLink>
          <Search
            placeholder="Tìm kiếm phim"
            enterButton="Search"
            size="large"
            onSearch={onSearch}
          />
          <Space
            style={{
              marginBottom: 16,
            }}
          ></Space>
          <Table
            columns={columns}
            dataSource={data}
            onChange={handleChange}
            rowKey={"maPhim"}
          />
        </div>
      </div>
    </div>
  );
}
