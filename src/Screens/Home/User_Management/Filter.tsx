import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { handlefilt, handlefilter } from "../../../redux/reducers/AuthReducers";
import { Button, Form, Input } from "antd";
import { Table, Row, Col, message } from "antd";
import classes from "../User_Management/Login.module.css";
import { FormValues } from "../../../@types/Filter";

function Filter({filtermodal,setFiltermodal,listapicall,currentPage}:{filtermodal:boolean,
  setFiltermodal:React.Dispatch<React.SetStateAction<boolean>>,listapicall:(page:number,size:number,values:FormValues) => void,currentPage:number
}) {
  
 const filterValues = {
  userName: "",
        dealerId: "",
        email: "",
        phoneNumber: "",
 }
  const validationSchema = Yup.object({
    userName: Yup.string().min(3, "Username must be at least 3 characters"),
    phoneNumber: Yup.string().matches(
      /^[6789][0-9]{9}$/,
      "Phone number must be 10 digits"
    ),
    email: Yup.string().email("Invalid email format"),
    dealerId: Yup.number(),
  });

  const handlesearch = (
    values: FormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    listapicall(currentPage,10,values)
    resetForm();
  };

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik<FormValues>({
      initialValues: {
        userName: "",
        dealerId: "",
        email: "",
        phoneNumber: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, { resetForm }) => handlesearch(values, { resetForm }),
    });


  const handlereset = () => {
   listapicall(currentPage,2,filterValues);
    setFiltermodal(false);
  };
  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 12 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 24 } },
  };

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Row gutter={[16,16]}>
          <Col>
            <Form.Item
              label="Username"
              validateStatus={
                touched.userName && errors.userName ? "error" : ""
              }
              help={touched.userName && errors.userName ? errors.userName : ""}
            >
              <Input
                name="userName"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Email"
              validateStatus={touched.email && errors.email ? "error" : ""}
              help={touched.email && errors.email ? errors.email : ""}
            >
              <Input
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Dealer ID"
              validateStatus={
                touched.dealerId && errors.dealerId ? "error" : ""
              }
              help={touched.dealerId && errors.dealerId ? errors.dealerId : ""}
            >
              <Input
                name="dealerId"
                value={values.dealerId}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>

          <Form.Item
            label="Phone Number"
            validateStatus={
              touched.phoneNumber && errors.phoneNumber ? "error" : ""
            }
            help={
              touched.phoneNumber && errors.phoneNumber
                ? errors.phoneNumber
                : ""
            }
          >
            <Input
              name="phoneNumber"
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Form.Item>
        </Row>

        <Row gutter={[16,16]} justify="start">
          <Col>
            {" "}
            <Button
              type="primary"
              htmlType="submit"
<<<<<<< HEAD:src/Screens/Home/User_Management/Filter.tsx
              className={`btn btn-danger ms-5  ${classes.custombutton}`}
            
        
=======
              className={`btn btn-danger ms-5 ${classes.custombutton}`}
              justify="center"
>>>>>>> 3a089786c4c01af5b00b0019b563a1994b49f940:src/Screens/Home/User_Management/Filter.js
            >
              Submit
            </Button>
          </Col>
          <Col>
            {" "}
            <Button
<<<<<<< HEAD:src/Screens/Home/User_Management/Filter.tsx
                 className={`btn btn-danger  ${classes.custombutton}`}
=======
                  className={`btn btn-danger ${classes.custombutton}`}
>>>>>>> 3a089786c4c01af5b00b0019b563a1994b49f940:src/Screens/Home/User_Management/Filter.js
              onClick={handlereset}
            >
              reset
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Filter;
