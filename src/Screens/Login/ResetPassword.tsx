import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, Row, Col, Image, Card, message } from "antd";
import { resetpassword } from "../../axios/Services";
import { handleresetkey } from "../../redux/reducers/AuthReducers";
import classes from "../Login/Login.module.css";
import verify from "../../assests/Screenshot_2024-09-05_225712-removebg-preview.png";
import { UnlockTwoTone } from "@ant-design/icons";
import logo from "../../assests/MAestro__2_-removebg-preview.png";
import { selectorProps } from "../../@types/dashboard";
import { formikvalueProps } from "../../@types/ResetPassword";

function ResetPassword() {
  const reset = useSelector((state:selectorProps) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    changepassword: Yup.string().required("Enter the new password"),
    confirmpassword: Yup.string()
      .oneOf([Yup.ref("changepassword"),undefined], "Passwords must match")
      .required("Confirm your password"),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik<formikvalueProps>({
      initialValues: {
        changepassword: "",
        confirmpassword: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => handleresetpassword(values),
    });

  const handleresetpassword = (values: formikvalueProps) => {
    let formData = new FormData();
    let resendkey:string = sessionStorage.getItem("resendotpreset_key")as string;
    formData.append("resetKey", resendkey);
    formData.append("newPassword", values.changepassword);

    resetpassword(formData).then((res) => {
      console.log(res);

      console.log("Password successfully changed");
      if (res.data.status == -1) {
        message.success(res.data.msg);
      } else {
        navigate("/login");
      }
    });
  };
  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 9 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 24 } },
  };

  return (
    <Row className={`img-fluid ${classes.back}`} justify="center">
      <Col xs={24} sm={16} md={8}>
        <Card
          title={
            <h2 className={classes.cardTitle} style={{ color: "white" }}>
              Reset Password
            </h2>
          }
          className={`card w-100 mt-5 p-4 mx-auto ${classes.cardsssss}`}
        >
          <div style={{ textAlign: "center" }}>
            <Image
              width={250}
              height={150}
              src={logo}
              className="mx-auto mb-3"
            />
            <div style={{ color: "white" }}>
              <h5>Set a New Password</h5>
              <Row justify="center">
                <p className="bold mt-3">
                  Enter your new password and confirm it below.
                </p>
                <UnlockTwoTone />
              </Row>
            </div>
          </div>

          <Form
            onFinish={handleSubmit}
            className="mx-auto p-5 g-3"
            {...formItemLayout}
          >
            <Form.Item
              label={<span style={{ color: "white" }}>New Password: </span>}
              validateStatus={
                touched.changepassword && errors.changepassword ? "error" : ""
              }
              help={
                touched.changepassword && errors.changepassword
                  ? errors.changepassword
                  : ""
              }
            >
              <Input.Password
                name="changepassword"
                value={values.changepassword}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              label={<span style={{ color: "white" }}>Confirm Password: </span>}
              validateStatus={
                touched.confirmpassword && errors.confirmpassword ? "error" : ""
              }
              help={
                touched.confirmpassword && errors.confirmpassword
                  ? errors.confirmpassword
                  : ""
              }
            >
              <Input.Password
                name="confirmpassword"
                value={values.confirmpassword}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Row justify="end">
              <Button
                className="btn btn-primary "
                type="primary"
                htmlType="submit"
              >
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
