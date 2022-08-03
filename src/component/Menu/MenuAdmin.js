import Sider from "antd/lib/layout/Sider";
import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "antd";
import {FileOutlined,FileAddOutlined,UsergroupAddOutlined,PlaySquareOutlined,UserOutlined} from '@ant-design/icons'
import "./menu.scss";


export default function MenuAdmin() {
  return (
    <div className="menu-admin">
      <div className="logo">
        <h1>Admin</h1>
      </div>

      <Sider style={{ minHeight: "100vh" }}>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.SubMenu className="sub-menu" key="sub1" mode="inline" icon= {<FileOutlined />} title="Films">
              <Menu.Item key='1' icon={<FileOutlined />} title='Films'>
                <NavLink to='/admin/films' className ="nav-link-item">Films</NavLink>
              </Menu.Item>
              <Menu.Item className="sub-menu" key='1.1' icon={<FileAddOutlined />}>
                <NavLink to='/admin/films/add-film' className ="nav-link-item">Add films</NavLink>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu className="sub-menu" key="sub2" mode="inline" icon= {<PlaySquareOutlined />} title='Show time'>
              <Menu.Item key='2.1' icon={<PlaySquareOutlined />}>
                <NavLink to="/admin/films/show-time" className ="nav-link-item">Create show time</NavLink>
              </Menu.Item>
              <Menu.Item className="sub-menu" key='2.2' icon={<FileAddOutlined />} >
                <NavLink to='/admin/films/cinema-management' className ="nav-link-item">Cinema management</NavLink>
              </Menu.Item>
            </Menu.SubMenu>

            <Menu.SubMenu className="sub-menu" key="sub3" mode="inline" icon= {<UserOutlined />} title='Users'>
              <Menu.Item key='3.1' icon={<UserOutlined />} title='Films'>
                <NavLink to="/admin/users" className ="nav-link-item">List users</NavLink>
              </Menu.Item>
              <Menu.Item key='3.2' icon={<UsergroupAddOutlined />} title='Add films'>
                <NavLink to="/admin/user/add-user" className ="nav-link-item">Add user </NavLink>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
      </Sider>
    </div>
  );
}
