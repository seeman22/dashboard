import { Button, Form, Input, Row, Col, message } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { forgotpassword } from "../../axios/Services";
import { useDispatch } from "react-redux";
import { handleresetkey } from "../../redux/reducers/AuthReducers";
import { useNavigate } from "react-router-dom";
import classes from "../Login/Login.module.css";
import { Image } from "antd";
import forgetpass from "../../assests/Screenshot 2024-09-05 114454.png";
import { Card } from "antd";
import TextField from "@mui/material/TextField";
import { UnlockTwoTone } from "@ant-design/icons";

import verify from "../../assests/MAestro__2_-removebg-preview.png";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Enter the email"),
  });

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => handlesign(values),
    });

  const handlesign = (values) => {
    let formData = new FormData();
    formData.append("email", values.email);
    forgotpassword(formData).then((res) => {
      const resetKey = res.data.reset_key;
      console.log("key", res);
      dispatch(handleresetkey(resetKey));
      sessionStorage.setItem("resendotp_resetKey", resetKey);
      if (res.data.status == 0) {
        message.error("sorry your account not having");
      } else {
        message.success("sucessfully login");
        navigate("/verifyotp");
      }
    });
  };

  return (
    <Row className={`img-fluid ${classes.back}`} justify="center">
      <Col xs={24} sm={16} md={8}>
        <Card
          title={
            <h2 className={classes.cardTitle} style={{ color: "white" }}>
              Forgot Password
            </h2>
          }
          className={`card w-100 mt-5 p-4 mx-auto ${classes.cardsssss}`}
          style={{ color: "white" }}
        >
          <div style={{ textAlign: "center" }}>
            <Image
              width={250}
              height={150}
              src={verify}
              className="mx-auto"
              style={{ color: "white" }}
            />
          </div>
          <div style={{ textAlign: "center" }}>
            <h5>Find your email</h5>
            <Row justify="center">
              <p className="bold mt-3">
                Enter your recovery email and change your password .
              </p>
              <UnlockTwoTone />
            </Row>
          </div>
          <Form onFinish={handleSubmit} className="mx-auto p-5 g-3">
            <TextField
              id="outlined-email"
              label="email"
              name="email"
              value={values.email}
              variant="outlined"
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.email && errors.email ? "invalid" : ""}
              FormHelperTextProps={{ sx: { color: "red" } }}
              fullWidth
              InputLabelProps={{
                style: { color: "white" },
              }}
              InputProps={{
                style: { color: "white", borderColor: "white" },
                classes: {
                  notchedOutline: classes.whiteBorder,
                },
              }}
              placeholder="enter the email"
            />
            <Row justify="end">
              <Button
                className="btn btn-primary mt-5 mb-2"
                type="primary"
                htmlType="submit"
              >
                Next
              </Button>
            </Row>
          </Form>
        </Card>
      </Col>
    </Row>
  );
}

export default Signup;
