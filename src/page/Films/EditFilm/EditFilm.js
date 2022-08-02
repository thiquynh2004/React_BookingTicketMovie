/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
// import "antd/dist/antd.css";
import MenuAdmin from "../../../component/Menu/MenuAdmin";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  capNhatPhimLoadAction,
  layThongTinPhimAction,
  themPhimUploadHinhAnhAction,
} from "../../../redux/actions/types/QuanLyPhimActions";
import { GROUPID } from "../../../util/setting/config";
import { useParams } from "react-router-dom";

export default function EditFilm(props) {
  const [componentSize, setComponentSize] = useState("default");
  const [img, setImg] = useState("");
  const { thongTinPhim } = useSelector((state) => state.QuanLyPhimReducer);

  console.log("thongTinPhim", thongTinPhim);
  //Call Api : kết nối vớsi Redux thông qua useDispatch thông qua useEffect
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(layThongTinPhimAction(id));
  }, []);
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  //Hook
  const formik = useFormik({
    enableReinitialize: true, // thuộc tính chỉ nên sử dụng cho form edit
    initialValues: {
      maPhim: thongTinPhim.maPhim,
      tenPhim: thongTinPhim.tenPhim,
      trailer: thongTinPhim.trailer,
      moTa: thongTinPhim.moTa,
      ngayKhoiChieu: thongTinPhim.ngayKhoiChieu,
      dangChieu: thongTinPhim.dangChieu,
      sapChieu: thongTinPhim.sapChieu,
      hot: thongTinPhim.hot,
      danhGia: thongTinPhim.danhGia,
      hinhAnh: null,
      maNhom: GROUPID,
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
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      } 
      //Cập nhật phim 
      dispatch(capNhatPhimLoadAction(formData))
    },
  });

  const handleChangeDatePicker = (values) => {
    let ngayKhoiChieu = moment(values);
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
          <h1>Edit</h1>
          <Form
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
              <Input
                name="tenPhim"
                onChange={formik.handleChange}
                value={formik.values.tenPhim}
              />
            </Form.Item>
            <Form.Item label="Trailer">
              <Input
                name="trailer"
                onChange={formik.handleChange}
                value={formik.values.trailer}
              />
            </Form.Item>
            <Form.Item label="Mô tả">
              <Input
                name="moTa"
                onChange={formik.handleChange}
                value={formik.values.moTa}
              />
            </Form.Item>
            <Form.Item label="Ngày khởi chiếu">
              <DatePicker
                format={"YYYY/MM/DD"}
                onChange={handleChangeDatePicker}
                value={moment(formik.values.ngayKhoiChieu)}
              />
            </Form.Item>
            <Form.Item label="Đang Chiếu">
              <Switch
                onChange={handleChangeSwitch("dangChieu")}
                checked={formik.values.dangChieu}
              />
            </Form.Item>
            <Form.Item label="Sắp Chiếu">
              <Switch
                onChange={handleChangeSwitch("sapChieu")}
                checked={formik.values.sapChieu}
              />
            </Form.Item>
            <Form.Item label="Hot">
              <Switch
                onChange={handleChangeSwitch("hot")}
                checked={formik.values.hot}
              />
            </Form.Item>

            <Form.Item label="Đánh Giá">
              <InputNumber
                onChange={handleChangeInputNumber("danhGia")}
                value={formik.values.danhGia}
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
                src={img === "" ? thongTinPhim.hinhAnh : img}
                alt="hinhAnh"
                style={{ width: "200px", height: "200px" }}
              />
            </Form.Item>
            <Form.Item label="Cập nhật">
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
