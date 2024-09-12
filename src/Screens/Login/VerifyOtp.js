import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Row, Col } from 'antd';
import { resendotp, verifyotp } from '../../axios/Services';
import { handleresetkey } from '../../redux/reducers/AuthReducers';
import classes from '../Login/Login.module.css';
import verify from '../../assests/WhatsApp_Image_2024-09-05_at_12.30.47-removebg-preview.png';
import { Image } from 'antd';
import { Card } from 'antd';
import { UnlockTwoTone } from '@ant-design/icons';
import logo from '../../assests/Screenshot_2024-09-05_225712-removebg-preview.png';
import { Typography } from "antd";
import { useEffect } from 'react';
import {  message } from 'antd';

const { Title } = Typography;

function VerifyOtp() {
    const reset = useSelector((state) => state.auth.resetkey);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [texts, settexts] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [showResendButton, setShowResendButton] = useState(false); // To toggle between Next and Resend buttons
    const [messageApi, contextHolder] = message.useMessage();
    const intervalId = useRef();

    const validationSchema = Yup.object({
        otp: Yup.string().required('Enter the OTP'),
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
        initialValues: {
            otp: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => handleverifyotp(values),
    });

    const handleverifyotp = (values) => {
        let formData = new FormData();
        let store2 = sessionStorage.getItem('forgetpassword_reset_key');
        formData.append("resetKey", store2);
        formData.append("otp", texts);

        verifyotp(formData).then((res) => {
            const resetKey = res.data.reset_key;
            dispatch(handleresetkey(resetKey));
            navigate('/resetpassword');
        });
    };

    const handleResendOtp = () => {
        let formdata = new FormData();
        let store = sessionStorage.getItem('resendotp_resetKey');
     
        formdata.append("resetKey", store);

        resendotp(formdata).then((res) => {
            sessionStorage.setItem('resendotpreset_key', res.data.reset_key);
            setElapsedTime(0);

            intervalId.current = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
        });
    };
    const onChange=(value)=>{
        settexts(value);
     }
    const sharedProps = {
        onChange,
    };
   

    useEffect(() => {
        intervalId.current = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(intervalId.current);
    }, []);

    useEffect(() => {
  
        if (elapsedTime >= 30) {
            clearInterval(intervalId.current);
            setShowResendButton(true);
          message.error("OTP time is expired sorry!!")

        }
    }, [elapsedTime]);

    const formatTime = () => {
        const seconds = Math.floor(elapsedTime % 60);
        const minutes = Math.floor((elapsedTime / 60) % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <Row
            style={{ height: '100vh' }}
            justify="center"
            align="middle"
        >
            <Col xs={24} sm={16} md={8}>
                <Card title={<h2 className={classes.cardTitle}>OTP Authentication</h2>} className={`mt-5 mx-auto ${classes.card}`}>
                    <div style={{ textAlign: 'center' }}>
                        <Image
                            width={70}
                            height={50}
                            src={logo}
                            className='mx-auto'
                        />
                        <h5>Enter Your OTP</h5>
                        <Row justify="center">
                            <p className='bold mt-3'>Enter your recovery OTP and change your password.</p>
                            <UnlockTwoTone />
                        </Row>
                    </div>
                    <Form className="mx-auto p-5 g-3" >
                        <Input.OTP
                            formatter={(str) => str.replace(/\D/g, '')}
                            {...sharedProps}
                        />
                        <Row justify="end">
                            {/* Conditional rendering based on elapsed time */}
                            {showResendButton ? (
                                <Button
                                    className="btn btn-primary mt-5 mb-2 w-25"
                                    type="primary"
                                    onClick={handleResendOtp}
                                    onMouseEnter={() => setShowResendButton(false)} 
                                >
                                    Resend OTP
                                </Button>
                            ) : (
                                
                                <Button
                                    className="btn btn-primary mt-5 mb-2 w-25"
                                    type="primary"
                                    htmlType="submit"
                                    onClick={handleverifyotp}
                                >
                                    Next
                                </Button>
                            )}
                        </Row>
                    </Form>
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <h5>Time Remaining: {formatTime()}</h5>
                    </div>
                </Card>
            </Col>
        </Row>
    );
}

export default VerifyOtp;
