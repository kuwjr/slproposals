import { Form, Button, Checkbox, DatePicker, Input, Select, InputNumber, message, Radio } from 'antd'
import CountryPhoneInput, { ConfigProvider } from 'antd-country-phone-input';
import en from 'world_countries_lists/data/countries/en/world.json';
import 'antd/dist/antd.css';
import 'antd-country-phone-input/dist/index.css';
import axios from '../lib/axios'
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import BaseLayout from '../layouts/BaseLayout';

const Register = () => {

    let navigate = useNavigate()

    const [contactPreference, setContactPreference] = useState('Phone');

    const onFinish = (values) => {
        let mobile_number = `+${values.mobile_number.code}${values.mobile_number.phone}`;
        values.mobile_number = mobile_number
        console.log("Onfinish: ", values)
        axios.post('/users/register', values).then(function (response) {
            // redirect to verification page
            navigate("/verify", {
                state: { user_email: values.email }
            });
        }).catch(function (error) {
            console.log('Caught an error: ', error)
            if (error.response.data)
                message.error(error.response.data);
            else
                console.log('Caught an error: ', error)
        });
    }

    const onFinishFailed = (values) => {
        console.log("OnfinishFailed: ", values)
    }

    return (
        <BaseLayout>
            <ConfigProvider locale={en}>
                <Form
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 5 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{
                        type: 'Bride',
                        country: 'Sri Lanka',
                        marital_status: 'Unmarried',
                        cp_relationship: 'Self',
                        educational_level: 'None',
                        contact_preference: { contactPreference },
                        mobile_number: { short: 'LK' }
                    }}
                >
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email'
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
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a password'
                            },
                            {
                                whitespace: true,
                                message: 'Please enter a password'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input.Password placeholder='Enter a password' />
                    </Form.Item>

                    <Form.Item
                        name="confirm_password"
                        label="Confirm Password"
                        dependencies={['password']}
                        rules={[
                            {
                                required: true,
                                message: 'Please enter a password'
                            },
                            {
                                whitespace: true,
                                message: 'Please enter a password'
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Passwords do not match');
                                }
                            })
                        ]}
                        hasFeedback
                    // 
                    >
                        <Input.Password placeholder='Enter a password' />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="Bride/ Groom"
                        rules={[
                            {
                                required: true,
                                message: 'Please select if you\'re a Bride or Groom'
                            }
                        ]}
                        hasFeedback
                    >
                        <Select>
                            <Select.Option value="Bride">Bride</Select.Option>
                            <Select.Option value="Groom">Groom</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="marital_status"
                        label="Marital Status"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your marital status'
                            }
                        ]}
                        hasFeedback
                    >
                        <Select>
                            <Select.Option value="Unmarried">Unmarried</Select.Option>
                            <Select.Option value="Separated">Separated</Select.Option>
                            <Select.Option value="Divorced">Divorced</Select.Option>
                            <Select.Option value="Widowed">Widowed</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="dob"
                        label="Date of Birth"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your date of birth'
                            }
                        ]}
                        hasFeedback
                    >
                        <DatePicker style={{ width: '100%' }} picker='date' />
                    </Form.Item>

                    <Form.Item
                        name="career"
                        label="Occupation"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your occupation'
                            },
                            {
                                whitespace: true,
                                message: 'Please enter your occupation'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input placeholder='Occupation' />
                    </Form.Item>

                    <Form.Item
                        name="educational_field"
                        label="Educational Field"
                        hasFeedback
                    >
                        <Input placeholder='Educational Field' />
                    </Form.Item>

                    <Form.Item
                        name="educational_level"
                        label="Educational Level"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your educational level'
                            }
                        ]}
                        hasFeedback
                    >
                        <Select>
                            <Select.Option value="None">None</Select.Option>
                            <Select.Option value="School">School</Select.Option>
                            <Select.Option value="Diploma">Diploma</Select.Option>
                            <Select.Option value="Degree">Degree</Select.Option>
                            <Select.Option value="Masters">Masters</Select.Option>
                            <Select.Option value="PHD">PHD</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="hometown"
                        label="Hometown"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your hometown'
                            },
                            {
                                whitespace: true,
                                message: 'Please enter your hometown'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input placeholder='Hometown' />
                    </Form.Item>

                    <Form.Item
                        name="first_name"
                        label="First Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your first name'
                            },
                            {
                                whitespace: true,
                                message: 'Please enter your first name'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input placeholder='First Name' />
                    </Form.Item>

                    <Form.Item
                        name="last_name"
                        label="Last Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your last name'
                            },
                            {
                                whitespace: true,
                                message: 'Please enter your last name'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input placeholder='Last Name' />
                    </Form.Item>

                    <Form.Item
                        name="cp_name"
                        label="Contact person name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter name of contact person'
                            },
                            {
                                whitespace: true,
                                message: 'Please enter name of contact person'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input placeholder='Name of contact person' />
                    </Form.Item>

                    <Form.Item
                        name="cp_relationship"
                        label="Contact person's relationship to the Bride/ Groom"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter contact person\'s relationship to the Bride/ Groom'
                            },
                            {
                                whitespace: true,
                                message: 'Please enter contact person\'s relationship to the Bride/ Groom'
                            }
                        ]}
                        hasFeedback
                    >
                        <Select>
                            <Select.Option value="Self">Self</Select.Option>
                            <Select.Option value="Father">Father</Select.Option>
                            <Select.Option value="Mother">Mother</Select.Option>
                            <Select.Option value="Brother">Brother</Select.Option>
                            <Select.Option value="Sister">Sister</Select.Option>
                            <Select.Option value="Guardian">Guardian</Select.Option>
                            <Select.Option value="Other">Other</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="mobile_number"
                        label="Mobile number"
                        rules={[
                            () => ({
                                validator(rule, value) {
                                    let pattern = new RegExp("^\\d{9}$");
                                    if (value.phone.match(pattern)) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('Enter a valid mobile number');
                                }
                            })
                        ]}
                        hasFeedback
                    >
                        <CountryPhoneInput
                            inline
                            placeholder='Enter mobile number'
                        />
                    </Form.Item>

                    <Form.Item
                        name="contact_preference"
                        label="Preferred method of contact"
                        rules={[
                            {
                                required: true,
                                message: 'Please select preferred method of contact'
                            }
                        ]}
                        hasFeedback
                    >
                        <Radio.Group
                            // options={[
                            //     { label: 'Phone', value: 'Phone' },
                            //     { label: 'Email', value: 'Email' }
                            // ]}
                            value={contactPreference}
                            onChange={setContactPreference}
                        >
                            <Radio value={'Phone'}>Phone</Radio>
                            <Radio value={'Email'}>Email</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        name="country"
                        label="Residing country"
                        rules={[
                            {
                                required: true,
                                message: 'Please select your country'
                            }
                        ]}
                        hasFeedback
                    >
                        <Select>
                            {en.map(
                                (country) => <Select.Option key={country.id} value={country.name}>{country.name}</Select.Option>
                            )}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="height"
                        label="Height"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your height'
                            }
                        ]}
                        hasFeedback
                    >
                        <InputNumber style={{ width: '100%' }} addonBefore='Centimeters' />
                    </Form.Item>

                    <Form.Item
                        name="weight"
                        label="Weight"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your weight'
                            }
                        ]}
                        hasFeedback
                    >
                        <InputNumber style={{ width: '100%' }} addonBefore='Kilograms' />
                    </Form.Item>

                    <Form.Item
                        name="expectations"
                        label="Expectations/ Description"
                        requiredMark="optional"
                        hasFeedback
                    >
                        <Input.TextArea
                            placeholder='Enter expectations/ description'
                            autoSize={{ minRows: 4, maxRows: 5 }}
                        />
                    </Form.Item>

                    <Form.Item labelCol={{ span: 10 }} wrapperCol={{ span: 5, offset: 10 }} >
                        <Button block type='primary' htmlType='submit' >
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </ConfigProvider>
        </BaseLayout>
    )
}

export default Register