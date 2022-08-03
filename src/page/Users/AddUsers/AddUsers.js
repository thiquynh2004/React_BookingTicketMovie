/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-template-curly-in-string */
import { Button, Form, Input, message, Select } from "antd";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuAdmin from "../../../component/Menu/MenuAdmin";
import {layDanhSachLoaiNguoiDungAction,themNguoiDungAction,} from "../../../redux/actions/types/QuanLyNguoiDungActions";
import { GROUPID } from "../../../util/setting/config";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
export default function AddUsers() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { arrLoaiNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  console.log("arrLoaiNguoiDung", arrLoaiNguoiDung);
  useEffect(() => {
    dispatch(layDanhSachLoaiNguoiDungAction());
  }, []);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      hoTen: "",
      email: "",
      soDt: "",
      matKhau: "",
      maLoaiNguoiDung:"",
    },
    // "taiKhoan": "string",
    // "matKhau": "string",
    // "email": "string",
    // "soDt": "string",
    // "maNhom": "string",
    // "maLoaiNguoiDung": "string",
    // "hoTen": "string"
    onSubmit: (values) => {
      console.log("value", values);
      values.maNhom = GROUPID;
      dispatch(themNguoiDungAction(values));
      message.success({
        content: "Thêm người dùng thành công",
        className: "message",
        style:{
          marginTop: '10vh',
          width: '40px',
          height: '40px',
        }
      })
      setTimeout(() => {
        navigate("/admin/users")
        // history is available by design in this.props when using react-router
     }, 3000)
     
    },
  });

  const handleChangeMaLoaiNguoiDung = (value) => {
    formik.setFieldValue("maLoaiNguoiDung", value);
  };
  // const handleChangeInputNumber = (name) => {
  //   return (value) => {
  //     formik.setFieldValue(name, value);
  //   }
  // }

  const validateMessages = {
    required: "${label} không được để trống",
    types: {
      email: "${label} không đúng định dạng",
    },
  };

  return (
    <div className="add-users">
      <MenuAdmin />
      <div className="content">
        <div className="container">
          <h1>Thêm tài khoản</h1>
          <Form
            {...layout}
            name="nest-messages"
            onSubmitCapture={formik.handleSubmit}
            validateMessages={validateMessages}
            style={{ width: "50%", marginTop: "40px" }}
          >
            <Form.Item
              name="maLoaiNguoiDung"
              label="Mã loại người dùng"
              rules={[
                {
                  required: true,
                  message: "Không được để trống",
                },
              ]}
            >
              <Select
                placeholder="Chọn mã loại người dùng"
                options={arrLoaiNguoiDung?.map((arrLoaiNguoiDung, index) => ({
                  label: arrLoaiNguoiDung.tenLoai,
                  value: arrLoaiNguoiDung.maLoaiNguoiDung,
                }))}
                onChange={handleChangeMaLoaiNguoiDung}
              ></Select>
            </Form.Item>
            <Form.Item
              name="taiKhoan"
              label="Tài khoản"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="taiKhoan" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item
              name="hoTen"
              label="Họ tên"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input name="hoTen" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                },
              ]}
            >
              <Input name="email" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item
              name="soDt"
              label="Số điện thoại"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input
                name="soDt"
                onChange={formik.handleChange}
                style={{
                  width: "100%",
                }}
              />
            </Form.Item>

            <Form.Item
              name="matKhau"
              label="Mật khẩu"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password name="matKhau" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
