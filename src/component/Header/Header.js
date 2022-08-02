import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TOKEN, USER_LOGIN } from "../../util/setting/config";
import "./header.scss";
import _ from "lodash";
import { Button, Modal } from "antd";
import { FrownOutlined} from '@ant-design/icons';
const { confirm } = Modal;

export default function Header() {
  const navigate = useNavigate();
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const showLogOutConfirm = () => {
    confirm({
      title: 'Bạn có muốn đăng xuất không?',
      icon: <FrownOutlined />,
      // content: <FrownOutlined />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
  
      onOk() {
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(TOKEN);
        navigate("/");
        window.location.reload();
        console.log('OK');
      },
  
      onCancel() {
        console.log('Cancel');
      },
    });
  };
  const operations = (
    <Fragment>
      {!_.isEmpty(userLogin) ? (
        <Fragment>
          <Button
            // type="primary"
            size="large"
            onClick={() => {
              navigate("/admin/profile");
            }}
          >
            Hello ! {userLogin.taiKhoan}
          </Button>
          <Button
            type="ghost"
            size="large"
            onClick={showLogOutConfirm}
          >
            Đăng xuất
          </Button>
        </Fragment>
      ) : (
        ""
      )}
    </Fragment>
  );
  return (
    <div className="header">
      <div className="button-items">{operations}</div>
    </div>
  );
}
