import React, { Component } from "react";
import { Modal, Form, Input, Button } from "antd";
import axios from "axios";

class SignUp extends Component {
  state = {
    user_count: 0,
    valid: false,
    isSignUpModalVisible: false
  };

  componentDidMount() {
    axios
        .get(`https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/user`)
        .then((res) => {
          const user_count = res.data.length;
          this.setState({user_count});
        })

    //axios.delete(`https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/user/15`)
  }

  showModalSignUp = () => {
    this.setState({
      isSignUpModalVisible: true
    });
  };

  handleSubmit = () => {
    const user_detail = {
      id: "",
      name: this.state.name,
      email: this.state.email,
      telephone: this.state.telephone,
      passsword: this.state.password,
    };

    user_detail.id = (parseInt(this.state.user_count)+1).toString();
    axios.post(`https://5fa8a7c7c9b4e90016e697f4.mockapi.io/api/jishin/user`, user_detail);
    //Log in

    //Redirect
    this.setState({
      isSignUpModalVisible: false
    });
  }

  handleCancelSignUp = () => {
    this.setState({
      isSignUpModalVisible: false
    });
  };

  handleChangeName = (e) => {
    this.setState({
        name: e.target.value
    });
  };

  handleChangeEmail = (e) => {
    this.setState({
        email: e.target.value
    });
  };

  handleChangeTelephone = (e) => {
    this.setState({
        telephone: e.target.value
    });
  };

  handleChangePassword = (e) => {
    this.setState({
        password: e.target.value
    });
  };

  handleChangePassword2 = (e) => {
    this.setState({
        password2: e.target.value
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
          footer={[
            <Button key="back" onClick={this.handleCancelSignUp}>
              Cancel
            </Button>,
            <Button form="signup_form" type="primary" key="submit" htmlType="submit">
              Submit
            </Button>
          ]}
        >
          <Form
            {...this.layout}
            id="signup_form"
            name="basic"
            initialValues={{ name: "", email: "", telephone: "", password: ""}}
            onFinish={this.handleSubmit}
          >
            <Form.Item
              label="名前"
              name="name"
              rules={[
                {
                  required: true,
                  message: "名前を入力してください。" 
                }
              ]}>
              <Input onChange={this.handleChangeName} />
            </Form.Item>

            <Form.Item
              label="メールアドレス"
              name="email"
              rules={[
                {
                  required: true,
                  message: "メールアドレスを入力してください。"
                }
              ]}>
              <Input onChange={this.handleChangeEmail}/>
            </Form.Item>

            <Form.Item
              label="電話番号"
              name="telephone"
              rules={[
                {
                  required: true,
                  message: "電話番号を入力してください。" 
                }
              ]}
            >
              <Input onChange={this.handleChangeTelephone}/>
            </Form.Item>

            <Form.Item
              label="パスワード"
              name="password"
              rules={[
                {
                  required: true,
                  message: "パスワードを入力してください。"
                }
              ]}
            >
              <Input.Password onChange={this.handleChangePassword}/>
            </Form.Item>

            <Form.Item
              label="確認用のパスワード"
              name="password2"
              rules={[
                {
                  required: true,
                  message: "確認用のパスワードを入力してください。"
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    else {
                      return Promise.reject("確認用のパスワードとパスワードが同じゃありません。");
                    }
                  },
                }),
              ]}
            >
              <Input.Password onChange={this.handleChangePassword2}/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default SignUp;
