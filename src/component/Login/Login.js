import React, { Component } from "react";
import { Button, Modal, Form, Input, Checkbox } from "antd";

class Login extends Component {
  state = {
    isLoginModalVisible: false
  };

  showModalLogin = () => {
    this.setState({
      isLoginModalVisible: true
    });
  };

  handleOkLogin = () => {
    this.setState({
      isLoginModalVisible: false
    });
  };

  handleCancelLogin = () => {
    this.setState({
      isLoginModalVisible: false
    });
  };

  layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 }
  };
  tailLayout = {
    wrapperCol: { offset: 8, span: 16 }
  };

  render() {
    return (
      <div>
        <Button
          style={{
            top: 10,
            width: 120,
            bottom: 10,
            background: "#81004B",
            border: "black"
          }}
          type="primary"
          onClick={this.showModalLogin}
        >
          ログイン
        </Button>
        <Modal
          title="ログイン"
          visible={this.state.isLoginModalVisible}
          onOk={this.handleOkLogin}
          onCancel={this.handleCancelLogin}
        >
          <Form
            {...this.layout}
            name="basic"
            initialValues={{ remember: true }}
            onOk={this.handleOkLogin}
            onCancel={this.handleCancelLogin}
          >
            <Form.Item
              label="メールアドレス"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!"
                }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="パスワード"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!"
                }
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              {...this.tailLayout}
              name="remember"
              valuePropName="checked"
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Login;
