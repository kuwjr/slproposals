import { Form, Input, Button, message } from 'antd';
import axios from '../lib/axios'
import { useNavigate } from "react-router-dom";
import BaseLayout from '../layouts/BaseLayout';
import { useState } from 'react';

const Login = () => {

  let navigate = useNavigate()

  const onFinish = (values) => {
    axios.post('/users/login', values).then(function (response) {
      // get user-data
      localStorage.setItem('user', JSON.stringify(response.data.user))
      // redirect to all proposals page
      navigate("/");
    }).catch(function (error) {
      if (error.response.data)
        message.error(error.response.data);
      else
        console.log('Caught an error: ', error)
    });
  };

  const onFinishFailed = (values) => {
    console.log(values)
  };

  return (
    <BaseLayout>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 6 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please enter a valid email address',
            },
            {
              type: 'email',
              message: 'Please enter a valid email address'
            }
          ]}
          hasFeedback
        >
          <Input placeholder='Enter your email' />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please enter a password',
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder='Enter a password' />
        </Form.Item>

        <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 5, offset: 10 }} >
          <Button block type='primary' htmlType='submit' >
            Login
          </Button>
        </Form.Item>
      </Form>
    </BaseLayout>
  );
};

export default Login