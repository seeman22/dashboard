import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Row, Col } from "antd";
import { resendotp, verifyotp } from "../../axios/Services";
import { handleresetkey } from "../../redux/reducers/AuthReducers";
import classes from "../Login/Login.module.css";
import verify from "../../assests/WhatsApp_Image_2024-09-05_at_12.30.47-removebg-preview.png";
import { Image } from "antd";
import { Card } from "antd";
import { UnlockTwoTone } from "@ant-design/icons";

import { Typography } from "antd";
import { useEffect } from "react";
import { message } from "antd";
import logo from "../../assests/MAestro__2_-removebg-preview.png";

const { Title } = Typography;

function VerifyOtp() {
  const reset = useSelector((state) => state.auth.resetkey);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const intervalId = useRef();
  const [texts, settexts] = useState("");
  const [elapsedTime, setElapsedTime] = useState(30);
  const [showResendButton, setShowResendButton] = useState(false); // To toggle between Next and Resend buttons
  const [messageApi, contextHolder] = message.useMessage();


  const validationSchema = Yup.object({
    otp: Yup.string().required("Enter the OTP"),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        otp: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => handleverifyotp(values),
    });

  const handleverifyotp = (values) => {
    let formData = new FormData();
    let store2 = sessionStorage.getItem("forgetpassword_reset_key");
    formData.append("resetKey", store2);
    formData.append("otp", texts);

    verifyotp(formData).then((res) => {
      const resetKey = res.data.reset_key;
      dispatch(handleresetkey(resetKey));
      navigate("/resetpassword");
    });
  };

  const handleResendOtp = () => {
    let formdata = new FormData();
    let store = sessionStorage.getItem("resendotp_resetKey");

    formdata.append("resetKey", store);

    resendotp(formdata).then((res) => {
      sessionStorage.setItem("resendotpreset_key", res.data.reset_key);
      setElapsedTime(30);

      intervalId.current = setInterval(() => {
        setElapsedTime((prev) => prev - 1);
      }, 1000);
    });
  };
  const onChange = (value) => {
    settexts(value);
  };
  const sharedProps = {
    onChange,
  };

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setElapsedTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId.current);
          setShowResendButton(true);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId.current);
  }, []);

  const formatTime = () => {
    const seconds = Math.floor(elapsedTime % 60);
    const minutes = Math.floor((elapsedTime / 60) % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Row className={`img-fluid ${classes.back}`} justify="center">
      <Col xs={24} sm={16} md={8}>
        <Card
          title={
            <h2 className={classes.cardTitle} style={{ color: "white" }}>
              Verify Otp
            </h2>
          }
          className={`card w-100 mt-5 p-4 mx-auto ${classes.cardsssss}`}
        >
          <div style={{ textAlign: "center" }}>
            <Image width={250} height={150} src={logo} className="mx-auto" />
            <div style={{ color: "white" }}>
              <h5>Enter Your OTP</h5>
              <Row justify="center">
                <p className="bold mt-3">
                  Enter your recovery OTP and change your password.
                </p>
                <UnlockTwoTone />
              </Row>
            </div>
          </div>
          <Form className="mx-auto p-5 g-3">
            <Input.OTP
              formatter={(str) => str.replace(/\D/g, "")}
              {...sharedProps}
            />
            <Row justify="end">
              {showResendButton ? (
                <Button
                  className="btn btn-primary mt-5 mb-2"
                  type="primary"
                  onClick={handleResendOtp}
                  onMouseEnter={() => setShowResendButton(false)}
                >
                  Resend OTP
                </Button>
              ) : (
                <Button
                  className="btn btn-primary mt-5 mb-2 "
                  type="primary"
                  htmlType="submit"
                  onClick={handleverifyotp}
                >
                  Next
                </Button>
              )}
            </Row>
          </Form>
          <div
            style={{ textAlign: "center", marginTop: "10px", color: "white" }}
          >
            <h5>Time Remaining: {formatTime()}</h5>
          </div>
        </Card>
      </Col>
    </Row>
  );
}

export default VerifyOtp;
