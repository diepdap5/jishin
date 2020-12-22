import React, { Component } from "react";
import { Modal, Form, Input } from "antd";

class SignUp extends Component {
  state = {
    isSignUpModalVisible: false
  };

  showModalSignUp = () => {
    this.setState({
      isSignUpModalVisible: true
    });
  };

  handleOkSignUp = () => {
    this.setState({
      isSignUpModalVisible: false
    });
  };

  handleCancelSignUp = () => {
    this.setState({
      isSignUpModalVisible: false
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
        <span onClick={this.showModalSignUp}>サインアップ</span>
        <Modal
          title="サインアップ"
          visible={this.state.isSignUpModalVisible}
          onOk={this.handleOkSignUp}
          onCancel={this.handleCancelSignUp}
        >
          <Form
            {...this.layout}
            name="basic"
            initialValues={{ remember: true }}
            onOk={this.handleOkSignUp}
            onCancel={this.handleCancelSignUp}
          >
            <Form.Item name="name" label="名前" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

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
              name={["user", "phonenumber"]}
              label="電話番号"
              rules={[
                { required: true, message: "Please input your phone number!" }
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
              label="確認用のパスワード"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password again!"
                }
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default SignUp;
