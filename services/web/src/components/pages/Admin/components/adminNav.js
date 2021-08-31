import {
  FolderOpenOutlined,
  FolderOutlined,
  UserAddOutlined,
  UserOutlined,
  DownOutlined,
  LineChartOutlined,
  WarningFilled,
} from '@ant-design/icons';

import ArchiveIcon from '@material-ui/icons/Archive';

import { Menu, Dropdown, Button } from 'antd';

import styles from '../../../../styles/pages/admin.module.css';

const AdminNav = props => {
  const { activeComponent, handleClick } = props;

  const menu = (
    <Menu onClick={handleClick} selectedKeys={activeComponent.current}>
      <Menu.Item key="requests" icon={<FolderOpenOutlined />}>
        Manage All Requests
      </Menu.Item>
      <Menu.Item key="yourRequests" icon={<FolderOutlined />}>
        Your Assigned Requests
      </Menu.Item>
      <Menu.Item key="archive" icon={<FolderOutlined />}>
        Completed Requests
      </Menu.Item>

      <Menu.Item key="organizations" icon={<LineChartOutlined />}>
        Manage Organizations
      </Menu.Item>

      <Menu.Item key="user" icon={<UserOutlined />}>
        Manage Users
      </Menu.Item>
      <Menu.Item key="prgMgr" icon={<UserAddOutlined />}>
        Create new user
      </Menu.Item>
      <Menu.Item key="payments" icon={<FolderOutlined />}>
        Payments
      </Menu.Item>
      <Menu.Item key="analytics" icon={<LineChartOutlined />}>
        Analytics
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} className={styles.dropdown}>
      <Button type="primary">
        Navigate <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default AdminNav;
