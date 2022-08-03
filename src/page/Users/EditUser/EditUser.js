import { Tabs } from "antd";
import React from "react";
import MenuAdmin from "../../../component/Menu/MenuAdmin";
import BookingHistory from "./BookingHistory";
import Edit from "./Edit";
const { TabPane } = Tabs;

const onChange = (key) => {};
export default function EditUser() {

  return (
    <div>
      <MenuAdmin />
      <div className="content">
        <div className="container">
          <h1>Thông tin cá nhân</h1>
          <Tabs defaultActiveKey="1" onChange={onChange}>
            <TabPane tab="Chỉnh sửa thông tin" key="1">
              <Edit />
            </TabPane>
            <TabPane tab="Lịch sử đặt vé" key="2">
              <BookingHistory />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
