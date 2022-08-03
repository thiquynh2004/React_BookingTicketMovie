/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Image, Input, message, Modal} from "antd";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import MenuAdmin from "../../component/Menu/MenuAdmin";
import {
  capNhatThongTinNguoiDungAction,
  layDanhSachLoaiNguoiDungAction,
  layThongTinNguoiDungAction,
} from "../../redux/actions/types/QuanLyNguoiDungActions";
import { GROUPID } from "../../util/setting/config";

export default function Profile() {
  // const navigate = useNavigate();
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  // const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  useEffect(() => {
    const action = layThongTinNguoiDungAction();
    dispatch(action);
  }, []);
  const { arrLoaiNguoiDung } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );
  console.log("arrLoaiNguoiDung", arrLoaiNguoiDung);
  useEffect(() => {
    dispatch(layDanhSachLoaiNguoiDungAction());
  }, []);
  console.log("data", thongTinNguoiDung);
  // const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

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

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: thongTinNguoiDung.taiKhoan,
      hoTen: thongTinNguoiDung.hoTen,
      maLoaiNguoiDung: thongTinNguoiDung.maLoaiNguoiDung,
      soDT: thongTinNguoiDung.soDT,
      email: thongTinNguoiDung.email,
      matKhau: thongTinNguoiDung.matKhau,
      maNhom: GROUPID,
    },
    onSubmit: (values) => {
      console.log("value", values);
      dispatch(capNhatThongTinNguoiDungAction(values));
      message.success(
        {
          content: "Thay đổi thông tin người dùng thành công",
          className: "message",
          style: {
            marginTop: "10vh",
            fontSize: "20px",
          },
        },
        setTimeout(() => {
          setVisible(false);
          // history is available by design in this.props when using react-router
        }, 3000)
      );
    },
  });
  return (
    <div className="profile-admin">
      <MenuAdmin />
      <div className="content">
        <div className="container">
          <h1>Thông tin cá nhân</h1>
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
              className="image-profile"
              style={{
                width: "30%",
              }}
            >
              <Image
                width={250}
                src="data:image/png;base64,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"
              />
            </div>
            <div
              className="info-detail"
              style={{
                width: "60%",
                backgroundColor: "#b6dbec",
                padding: "12px 20px",
              }}
            >
              <p>
                <i>Tài Khoản: </i> <b>{thongTinNguoiDung.taiKhoan}</b>
              </p>
              <p>
                <i>Họ tên: </i> <b>{thongTinNguoiDung.hoTen}</b>
              </p>
              <p>
                <i>Email: </i> <b>{thongTinNguoiDung.email}</b>
              </p>
              <p>
                <i>Số điện thoại: </i> <b>{thongTinNguoiDung.soDT}</b>
              </p>
              <p>
                <i>Nhóm: </i> <b>{thongTinNguoiDung.maNhom}</b>
              </p>
              <p>
                <i>Mã người dùng: </i>{" "}
                <b>{thongTinNguoiDung.maLoaiNguoiDung}</b>
              </p>
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
      </div>
    </div>
  );
}
