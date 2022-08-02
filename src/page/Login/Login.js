import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import "./login.scss";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { dangNhapAction } from "../../redux/actions/types/QuanLyNguoiDungActions";

export default function Login() {
  const dispatch = useDispatch();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("userLogin", userLogin);

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      const action = dangNhapAction(values);
      dispatch(action);
      console.log("values", values);
    },
  });

  return (
    <div className="login">
      <div className="container">
        <h1>Hi, Welcome to Booking Movie Admin</h1>

        <Form
          onSubmitCapture={formik.handleSubmit}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            placeholder="Enter your username"
            name="taiKhoan"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input name="taiKhoan" onChange={formik.handleChange} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="matKhau"
            placeholder="Enter your password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password name="matKhau" onChange={formik.handleChange} />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
