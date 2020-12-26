import { useState } from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import axios from 'axios';
// import fs from 'fs';
import writeJsonFile from 'write-json-file';

const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16
  }
};

const Login = ({ setIsAuthenticated, setUserName }) => {
  const [modalVisibility, setModalVisibility] = useState(false);

  const showModal = () => {
    setModalVisibility(true);
  };

  const handleOk = ({ email, password }) => {
    axios.get(`https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/user`).then((res) => {
      const users = res.data;
      const foundUser = users.find((user) => user.email === email && user.passsword === password);
      if (foundUser) {
        setIsAuthenticated(true);
        setUserName(foundUser.name);
        localStorage.setItem('user', JSON.stringify(foundUser));
        setModalVisibility(false);
        window.location.reload(false); 
      } else message.error('Invalid user');
    });
  };

  const handleCancel = (errorInfo) => {
    setModalVisibility(false);
  };

  return (
    <div>
      <span onClick={showModal}>ログイン</span>
      <Modal title="ログイン" visible={modalVisibility} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <Form {...layout} name="basic" onFinish={handleOk} onFinishFailed={handleCancel}>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your E-mail!'
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Login;
