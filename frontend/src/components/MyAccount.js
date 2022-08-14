import { Form, Button, Checkbox, DatePicker, Input, Select, InputNumber, message, Radio } from 'antd'
import CountryPhoneInput, { ConfigProvider } from 'antd-country-phone-input';
import en from 'world_countries_lists/data/countries/en/world.json';
import 'antd/dist/antd.css';
import 'antd-country-phone-input/dist/index.css';
import axios from '../lib/axios'
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import BaseLayout from '../layouts/BaseLayout';
import moment from 'moment';

const MyAccount = () => {

    const [user, setUser]  = useState(typeof(localStorage.getItem('user')) === 'undefined' ? null : JSON.parse(localStorage.getItem('user')))
    const [contactPreference, setContactPreference] = useState('Phone');
    const [formDisabled, setFormDisabled] = useState(true);

    const onFinish = (values) => {
        console.log("Onfinish: ", values)
        axios.put('/users/edit-user', values, { withCredentials: true }).then(function (response) {
            message.success(response.data);
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

    // disable / enable form
    const handleEditProfile = () => {
        setFormDisabled(!formDisabled)
    }

    return(
        <BaseLayout>
            <Button onClick={handleEditProfile}>Edit Profile</Button>
            <ConfigProvider locale={en}>
                <Form
                    disabled={formDisabled}
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 5 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    initialValues={{
                        email: user.email,
                        dob: moment(user.dob),
                        type: user.type,
                        country: user.country,
                        marital_status: user.marital_status,
                        cp_relationship: user.cp_relationship,
                        educational_level: user.educational_level,
                        contact_preference: user.contact_preference,
                        career: user.career,
                        mobile_number: user.mobile_number,
                        educational_field: user.educational_field,
                        hometown: user.hometown,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        cp_name: user.cp_name,
                        cp_relationship: user.cp_relationship,
                        height: user.height,
                        weight: user.weight,
                        expectations: user.expectations,
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
                        hasFeedback
                    >
                        <Input.Password placeholder='Enter a password' />
                    </Form.Item>

                    <Form.Item
                        name="confirm_password"
                        label="Confirm Password"
                        dependencies={['password']}
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
                            {
                                required: true,
                                message: 'Please enter a valid phone number'
                            },
                            {
                                whitespace: true,
                                message: 'Please enter a valid phone number'
                            }
                        ]}
                        hasFeedback
                    >
                        <Input
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

export default MyAccount