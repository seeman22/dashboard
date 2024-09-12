import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Row, Col, Image, Card ,message} from 'antd';
import { resetpassword } from '../../axios/Services';
import { handleresetkey } from '../../redux/reducers/AuthReducers';
import classes from '../Login/Login.module.css';
import verify from '../../assests/Screenshot_2024-09-05_225712-removebg-preview.png';
import { UnlockTwoTone } from '@ant-design/icons';

function ResetPassword() {
    const reset = useSelector((state) => state.auth.resetkey);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Validation schema with confirm password field
    const validationSchema = Yup.object({
        changepassword: Yup.string().required('Enter the new password'),
        confirmpassword: Yup.string()
            .oneOf([Yup.ref('changepassword'), null], 'Passwords must match')
            .required('Confirm your password'),
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            changepassword: '',
            confirmpassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => handleresetpassword(values),
    });

    const handleresetpassword = (values) => {
        let formData = new FormData();
       let resendkey= sessionStorage.getItem('resendotpreset_key')
        formData.append("resetKey", resendkey);
        formData.append("newPassword", values.changepassword);

        resetpassword(formData).then((res) => {
            console.log(res);
           message.success("successfully password changed");
            console.log("Password successfully changed");
        });

        navigate('/login');
    };

    return (
        <Row
            style={{ height: '100vh' }}
            justify="center"
            align="middle"
        >
            <Col xs={24} sm={16} md={8}>
                <Card
                    title={<h2 className={classes.cardTitle}>Reset Password</h2>}
                    className={`mt-5 mx-auto ${classes.card}`}
                >
                    <div style={{ textAlign: 'center' }}>
                        <Image
                            width={70}
                            height={50}
                            src={verify}
                            className="mx-auto mb-3"
                        />
                        <h5>Set a New Password</h5>
                        <Row justify="center">
                            <p className="bold mt-3">Enter your new password and confirm it below.</p>
                            <UnlockTwoTone />
                        </Row>
                    </div>

                    <Form onFinish={handleSubmit} className="mx-auto p-5 g-3">
                        <Form.Item
                            label="New Password"
                            validateStatus={touched.changepassword && errors.changepassword ? 'error' : ''}
                            help={touched.changepassword && errors.changepassword ? errors.changepassword : ''}
                        >
                            <Input.Password
                                name="changepassword"
                                value={values.changepassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Confirm Password"
                            validateStatus={touched.confirmpassword && errors.confirmpassword ? 'error' : ''}
                            help={touched.confirmpassword && errors.confirmpassword ? errors.confirmpassword : ''}
                        >
                            <Input.Password
                                name="confirmpassword"
                                value={values.confirmpassword}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Form.Item>

                        <Row justify="end">
                            <Button className="btn btn-primary mt-5 mb-2 w-25" type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Row>
                    </Form>
                </Card>
            </Col>
        </Row>
    );
}

export default ResetPassword;
