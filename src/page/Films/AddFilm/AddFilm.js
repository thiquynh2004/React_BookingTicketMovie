/* eslint-disable no-unused-vars */
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Select,
  Switch,
} from "antd";
import React, { useState } from "react";
// import "antd/dist/antd.css";
import MenuAdmin from "../../../component/Menu/MenuAdmin";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch } from "react-redux";
import { themPhimUploadHinhAnhAction } from "../../../redux/actions/types/QuanLyPhimActions";
import { GROUPID } from "../../../util/setting/config";
import { useNavigate } from "react-router-dom";

export default function AddFilm() {
  const [form] = Form.useForm();
  const [componentSize, setComponentSize] = useState("default");
  const [img, setImg] = useState("");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Hook
  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: {},
      // maNhom: GROUPID
    },
    onSubmit: (values) => {
      console.log("values", values);
      values.maNhom = GROUPID;
      //tao doi tuong form data
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }

      //goi API gui cac gia tri formData tu formik
      dispatch(themPhimUploadHinhAnhAction(formData));
      form.resetFields();
      message.success(
        {
          content: "Thêm phim thành công rồi nè ",
          className: "message",
          style: {
            marginTop: "10vh",
            fontSize: "20px",
          },
        },
        setTimeout(() => {
         navigate("/admin/films")
          // setVisible(false);
          // history is available by design in this.props when using react-router
        }, 3000)
      );
    },
  });

  const handleChangeDatePicker = (value) => {
    let ngayKhoiChieu = moment(value).format("DD/MM/YYYY");
    formik.setFieldValue("ngayKhoiChieu", ngayKhoiChieu);
  };

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };
  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (event) => {
    let file = event.target.files[0];
    //tao doi tuong dọc file
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/gif" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        console.log(e.target.result);
        setImg(e.target.result);
      };
      formik.setFieldValue("hinhAnh", file);
    }
    console.log("file", file);
  };

  return (
    <div>
      <MenuAdmin />

      <div className="content">
        <div className="container">
          <h1>Thêm phim mới</h1>
          <Form
            form={form}
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
            <Form.Item label="Form Size" name="size">
              <Radio.Group>
                <Radio.Button value="small">Small</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="Tên phim">
              <Input name="tenPhim" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Trailer">
              <Input name="trailer" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Mô tả">
              <Input name="moTa" onChange={formik.handleChange} />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
              <DatePicker
                format={"DD/MM/YYYY"}
                onChange={handleChangeDatePicker}
              />
            </Form.Item>
            <Form.Item label="Đang Chiếu">
              <Switch onChange={handleChangeSwitch("dangChieu")} />
            </Form.Item>
            <Form.Item label="Sắp Chiếu">
              <Switch onChange={handleChangeSwitch("sapChieu")} />
            </Form.Item>
            <Form.Item label="Hot">
              <Switch onChange={handleChangeSwitch("hot")} />
            </Form.Item>
           

            <Form.Item label="Đánh Giá">
              <InputNumber
                onChange={handleChangeInputNumber("danhGia")}
                min={1}
                max={10}
              />
            </Form.Item>
            <Form.Item label="Hình Ảnh">
              <input
                type="file"
                onChange={handleChangeFile}
                accept="image/png, image/jpeg, image/jpg, image/gif"
              />
              <br />
              <img
                src={img}
                alt="hinhAnh"
                style={{ width: "200px", height: "200px" }}
              />
            </Form.Item>
            <Form.Item label="Thêm Phim">
            <Button type="primary" htmlType="submit">
                Thêm Phim
              </Button>
            </Form.Item>
            
          </Form>
        </div>
      </div>
    </div>
  );
}
