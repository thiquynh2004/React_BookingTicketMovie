/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, DatePicker, Form, InputNumber, Radio, Select } from "antd";
import { quanLyRapService } from "../../service/QuanLyRapService";
import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import moment from "moment";
import { quanLyDatVeService } from "../../service/QuanLyDatVe";

export default function ShowTimeTable(props) {
  //tạo formik để map tất cả dữ liệu để post tạo lịch chiếu phim

  const { id } = useParams();
  
  const formik = useFormik({
    initialValues: {
      maPhim: id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      console.log('values', values);
      try {
        const result = await quanLyDatVeService.taoLichChieu(values);
        console.log('values', result)
      } catch (error) {
        console.log('error', error.response?.data);
      }
    },
  });
  const [state, setState] = useState({
    heThongRapChieu: [],
    cumRapChieu: [],
  });
  console.log(state.heThongRapChieu);
  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await quanLyRapService.layThongTinHeThongRap();
        setState({
          ...state,
          heThongRapChieu: result.data.content,
        });
      } catch (error) {
        console.error("error", error);
      }
    };
    fetchData();
  }, []);
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const handleChangeHeThongRap = async (values) => {
    //Call API lấy thông tin Rạp
    try {
      let result = await quanLyRapService.layThongTinCumRapTheoHeThong(values );
      console.log('result', values);

      //gán giá trị cụm rạp vào state.cumRapChieu
      setState({
        ...state, //giữ lại  tất cả thông tin của hệ thống rạp
        cumRapChieu: result.data.content, //thay đổi
      });
    } catch (error) {
      console.log("error", error.response?.data);
    }
    // console.log("maHeThongRap", values);
    
  };


  const handleChangeCumRap = (value) => {
    formik.setFieldValue("maRap", value);
  };


  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );

    console.log("values", moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };
  const onOk = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD/MM/YYYY hh:mm:ss")
    );

    console.log("values", moment(values).format("DD/MM/YYYY hh:mm:ss"));
  };
  const handleChangeInputNumber = (values) => {
    formik.setFieldValue("giaVe", values);
  };
  return (
    <>
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
        remember: true,
      }}
      onSubmitCapture={formik.handleSubmit}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{marginTop: '60px'}}
    >
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Hệ thống rạp">
        <Select
          options={state.heThongRapChieu?.map((heThongRap, index) => ({
            label: heThongRap.tenHeThongRap,
            value: heThongRap.tenHeThongRap,
          }))}
          onChange={handleChangeHeThongRap}
        />
      </Form.Item>
      <Form.Item label="Cụm rạp">
        <Select
          options={state.cumRapChieu?.map((cumRap, index) => ({
            label: cumRap.tenCumRap,
            value: cumRap.maCumRap,
          }))}
          onChange={handleChangeCumRap}
        />
      </Form.Item>

      <Form.Item label="Ngày chiếu giờ chiếu">
        <DatePicker
          format="DD/MM/YYYY hh:mm:ss"
          showTime
          onChange={onChangeDate}
          onOk={onOk}
        />
      </Form.Item>

      <Form.Item name="giaVe" label="Giá vé ">
        <InputNumber
          onChange={handleChangeInputNumber}
        />
      </Form.Item>
      <Form.Item label="Chức năng">
        <Button type="primary" shape="round" htmlType="submit">
          Tạo lịch chiếu
        </Button>
      </Form.Item>
    </Form>
    </>
  );
}
