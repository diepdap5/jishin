import { NotificationOutlined } from '@ant-design/icons';
import { Button, Dropdown, Layout, Menu, Badge } from 'antd';
import { useEffect, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
const { Header } = Layout;

const PageHeader = ({ title, alert = true }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setIsAuthenticated(true);
      setUserName(foundUser.name);
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    localStorage.clear();
  };

  const notificationMenu = (
    <Menu>
      <Menu.Item key="0">
        <Link to="/detail/noti">New earthquake announcement: Thai Binh, Viet Nam</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1" disabled>
        New earthquake announcement:Tokyo, Japan
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2" disabled>
        New earthquake announcement:New York, United States
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" disabled>
        New earthquake announcement:Mexico City, Mexico
      </Menu.Item>
    </Menu>
  );

  const unauthenticatedUserMenu = (
    <Menu>
      <Menu.Item key="0">
        <Login setIsAuthenticated={setIsAuthenticated} setUserName={setUserName} />
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <SignUp />
      </Menu.Item>
    </Menu>
  );

  const authenticatedUserMenu = (
    <Menu>
      <Menu.Item key="0" onClick={handleLogout}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="site-layout-sub-header-background"
      style={{
        padding: 0,
        textAlign: 'center',
        fontSize: '30px',
        color: 'black',
        background: '#FFE3F2'
      }}
    >
      <span>{title}</span>
      <Badge style={{ left: 340 }} count={alert ? 1 : 0}>
        <Dropdown overlay={notificationMenu} placement="bottomCenter">
          <Button style={{ left: 340 }} icon={<NotificationOutlined style={{ fontSize: '30px' }} />} size="small" type="text"></Button>
        </Dropdown>
      </Badge>
      {isAuthenticated ? (
        <Dropdown overlay={authenticatedUserMenu} placement="bottomCenter">
          <Button style={{ left: 350, fontSize: '30px' }} size="small" type="text">
            {userName}
          </Button>
        </Dropdown>
      ) : (
        <Dropdown overlay={unauthenticatedUserMenu} placement="bottomCenter">
          <Button
            style={{ left: 350, fontSize: '30px' }}
            icon={<AiOutlineUser style={{ fontSize: '30px' }} />}
            size="small"
            type="text"
          ></Button>
        </Dropdown>
      )}
    </Header>
  );
};

export default PageHeader;
