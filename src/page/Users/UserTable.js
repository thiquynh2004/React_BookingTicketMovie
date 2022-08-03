/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Input, message, Modal, Space, Table } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  layDanhSachNguoiDungAction,
  timKiemNguoiDungAction,
  xoaNguoiDung,
} from "../../redux/actions/types/QuanLyNguoiDungActions";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { confirm } = Modal;
const { Search } = Input;

export default function UserTable() {
  //Lấy dữ liệu từ API sau khi gọi action: sử dụng hook lấy dữ liệu về
  const { arrUserDefault } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();

  console.log("arrUserDefault", arrUserDefault);
  useEffect(() => {
    dispatch(layDanhSachNguoiDungAction());
  }, []);
  const data = arrUserDefault;
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  const onSearch = (value) => {
    console.log(value);
    dispatch(timKiemNguoiDungAction(value));
  };



  const columns = [
    {
      title: "Tài khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      filteredValue: filteredInfo.taiKhoan || null,
      onFilter: (value, record) => record.taiKhoan.includes(value),
      sorter: (a, b) => a.taiKhoan.length - b.taiKhoan.length,
      sortOrder: sortedInfo.columnKey === "taiKhoan" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Họ Tên",
      dataIndex: "hoTen",
      key: "hoTen",
      filteredValue: filteredInfo.hoTen || null,
      onFilter: (value, record) => record.hoTen.includes(value),
      sorter: (a, b) => a.hoTen.length - b.hoTen.length,
      sortOrder: sortedInfo.columnKey === "hoTen" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDT",
      key: "soDT",
    },
    {
      title: "Mã loại người dùng",
      dataIndex: "maLoaiNguoiDung",
      key: "maLoaiNguoiDung",
      filters: [
        {
          text: "KhachHang",
          value: "KhachHang",
        },
        {
          text: "QuanTri",
          value: "QuanTri",
        },
      ],
      filteredValue: filteredInfo.maLoaiNguoiDung || null,
      onFilter: (value, record) => record.maLoaiNguoiDung.includes(value),
      sorter: (a, b) => a.maLoaiNguoiDung.length - b.maLoaiNguoiDung.length,
      sortOrder:
        sortedInfo.columnKey === "maLoaiNguoiDung" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "",
      dataIndex: "taiKhoan",
      render: (text, users) => {
        return (
          <Fragment>
            <NavLink key={1}
              to={`/admin/users/edit/${users.taiKhoan}`}
              className="edit-user"
            >
              <EditOutlined />
            </NavLink>
            <span
              onClick={() => {
                confirm({
                  title: "Bạn có chắc muốn xóa tài khoản không?",
                  icon: <DeleteOutlined />,
                  content:
                    "Dữ liệu liên quan đến tài khoản này sẽ bị mất",
                  okText: "Yes",
                  okType: "danger",
                  cancelText: "No",

                  onOk() {
                      dispatch(xoaNguoiDung(users.taiKhoan));
                      message.success("Xóa người dùng thành công");
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

            {/* <NavLink
                to={`/admin/films/show-time/${films.maPhim}/${films.tenPhim}`}
                className="showTime-film"
                style={{ fontSize: "20px" , cursor: "pointer" }}
              >
              <CalendarOutlined />
              </NavLink> */}
          </Fragment>
        );
      },
    },
  ];
  return (
    <div className="user-table">
      <Search
        placeholder="Tìm kiếm tài khoản"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ margin: "20px 0" }}
      />
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        rowKey={"taiKhoan"}
      />
    </div>
  );
}
