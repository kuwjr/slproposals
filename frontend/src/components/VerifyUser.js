import { Form, Button, Input, message } from 'antd'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from '../lib/axios';
import React, { useEffect } from 'react';
import BaseLayout from '../layouts/BaseLayout';

const VerifyUser = () => {

    let navigate = useNavigate()
    const location = useLocation();

    useEffect(() => {
        if (!location.state.user_email) return message.error('Email not found, please Register or Login');
    }, []);

    const onFinish = (values) => {
        console.log(values)
        axios.get(`/users/verify/${values.token}`).then(function (response) {
            // redirect to login page
            message.success(response.data);
            // redirect to login page
            navigate("/login");
        }).catch(function (error) {
            if (error.response.data)
                message.error(error.response.data);
            else
                console.log('Caught an error: ', error)
        });
    }

    const onFinishFailed = (values) => {
        console.log(values)
        console.log('Props:', location.state.user_email)
    }

    const resendVerificationEmail = () => {
        axios.post('/users/resend-email-verification', {
            email: location.state.user_email
        }).then(function (response) {
            console.log('Props:', location.state.user_email)
            message.success(response.data);
        }).catch(function (error) {
            if (error.response.data)
                message.error(error.response.data);
            else
                console.log('Caught an error: ', error)
        });
    }

    return (
        <BaseLayout>
            <Form
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 5 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="token"
                    label="token"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter token number'
                        },
                        {
                            whitespace: true,
                            message: 'Please enter token number'
                        }
                    ]}
                    hasFeedback
                >
                    <Input placeholder='XXXXXXXX' />
                </Form.Item>

                <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 5, offset: 10 }} >
                    <Button block type='primary' htmlType='submit' >
                        Verify Token
                    </Button>
                </Form.Item>

                <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 5, offset: 10 }} >
                    <Button onClick={resendVerificationEmail} block type='link' >
                        Resend Email
                    </Button>
                </Form.Item>
            </Form>
        </BaseLayout>
    )
}

export default VerifyUser