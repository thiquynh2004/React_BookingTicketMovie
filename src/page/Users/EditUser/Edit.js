/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, Modal } from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  capNhatThongTinDanhSachNguoiDungAction,
  timKiemNguoiDungAction,
} from "../../../redux/actions/types/QuanLyNguoiDungActions";
import { GROUPID } from "../../../util/setting/config";

export default function Edit() {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const { arrUserDefault } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  console.log("arrUserDefault", arrUserDefault);
  const { taiKhoan } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(timKiemNguoiDungAction(taiKhoan));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: arrUserDefault[0].taiKhoan,
      hoTen: arrUserDefault[0].hoTen,
      maLoaiNguoiDung: arrUserDefault[0].maLoaiNguoiDung,
      soDT: arrUserDefault[0].soDT,
      email: arrUserDefault[0].email,
      matKhau: arrUserDefault[0].matKhau,
      maNhom: GROUPID,
    },
    onSubmit: (values) => {
      console.log("values", values);
      values.maNhom = GROUPID;
      dispatch(capNhatThongTinDanhSachNguoiDungAction(values));
    },
  });
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
    // form.resetFields();
  };
  return (
    <div>
      <div
        className="list-info"
        style={{
          fontSize: "20px",
          margin: "20px 0",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div
          className="info-detail"
          style={{
            padding: "12px 20px",
          }}
        >
          {arrUserDefault?.map((user, index) => (
            <div className="image-type">
              <p>
                <b>Tài Khoản: </b> {arrUserDefault[0].taiKhoan}
              </p>
              <p>
                <b>Họ tên: </b> {arrUserDefault[0].hoTen}
              </p>
              <p>
                <b>Email: </b> {arrUserDefault[0].email}
              </p>
              <p>
                <b>Số điện thoại: </b> {arrUserDefault[0].soDT}
              </p>
              <p>
                <b>Nhóm: </b> {GROUPID}
              </p>
              <p>
                <b>Mã người dùng: </b>{" "}
                <i>{arrUserDefault[0].maLoaiNguoiDung}</i>
              </p>
            </div>
          ))}

          <Button onClick={showModal}>Cập nhật</Button>
          <Modal
            footer={null}
            visible={visible}
            title="Chỉnh sửa thông tin cá nhân"
            // onOk={formik.handleSubmit}
            onCancel={handleCancel}
            onClick={handleOk}
          >
            <Form
              // form={form}
              onSubmitCapture={formik.handleSubmit}
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 14,
              }}
              layout="horizontal"
              initialValues={{
                size: componentSize,
              }}
              onValuesChange={onFormLayoutChange}
              size={componentSize}
            >
              <Form.Item label="Tên tài khoản">
                <Input
                  name="taiKhoan"
                  onChange={formik.handleChange}
                  value={formik.values.taiKhoan}
                />
              </Form.Item>
              <Form.Item label="Họ tên">
                <Input
                  name="hoTen"
                  value={formik.values.hoTen}
                  onChange={formik.handleChange}
                />
              </Form.Item>
              <Form.Item label="Email">
                <Input
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </Form.Item>
              <Form.Item label="Số điện thoại">
                <Input
                  name="soDT"
                  value={formik.values.soDT}
                  onChange={formik.handleChange}
                />
              </Form.Item>
              <Form.Item label="Mã nhóm">
                <Input value={GROUPID} />
              </Form.Item>

              <Form.Item label="">
                <Button htmlType="submit" type="primary">
                  Cập nhật
                </Button>
                <Button onClick={handleCancel}>Cancel</Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </div>
  );
}
