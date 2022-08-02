import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import MenuAdmin from "../../component/Menu/MenuAdmin";

export default function Profile() {
  const { TabPane } = Tabs;

  const onChange = (key) => {
  };
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("userLogin", userLogin);
  return (
    <div>
      <MenuAdmin />
      <div className="content">
        <div className="container">
          <h1>Thông tin cá nhân</h1>

          <Tabs defaultActiveKey="1" onChange={onChange}>
            <TabPane tab="Thông tin chi tiết" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Chỉnh sửa thông tin" key="2">
              Content of Tab Pane 2
            </TabPane>
           
          </Tabs>
        </div>
      </div>
    </div>
  );
}
