import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form, Input, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  handlefilter,
  handleleadfilt,
  handleleadfilterdata,
  handlemasterfilt,
} from "../../../redux/reducers/AuthReducers";
import classes from "../User_Management/Login.module.css";
import { storeDataProps } from "../../../@types/Store";
import { leadfilterProps } from "../../../@types/LeadFilter";

function FilterLead({listapicall,currentPage}:{listapicall:(page:number,size:number,values:leadfilterProps)=>void,currentPage:number}) {

  const filtervalues={
    leadId: "",
    leadCode: "",
    leadName: "",
    mobile: "",
    address: "",
    isActive: "",
  }
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    leadId: Yup.number(),
    leadCode: Yup.string(),
    leadName: Yup.string(),
    mobile: Yup.string(),
    address: Yup.string(),
  });

  const handlesearch = (
    values:leadfilterProps,
    { resetForm }: { resetForm: () => void }
  ) => {
    listapicall(currentPage,5,values)
    resetForm();
  };
  const { handleSubmit, handleChange, handleBlur, values, errors, touched,resetForm } =
    useFormik<leadfilterProps>({
      initialValues: {
        leadId: "",
        leadCode: "",
        leadName: "",
        mobile: "",
        address: "",
        isActive: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, { resetForm }) => handlesearch(values, { resetForm }),
    });
  const handlereset = () => {
    listapicall(currentPage,5,filtervalues)
    dispatch(handleleadfilt(false));
  };

  return (
    <>
      <Form onFinish={handleSubmit}>
<<<<<<< HEAD:src/Screens/Home/leads/FilterLead.tsx
        <Row gutter={[16,16]}>
=======
        <Row gutter={[16,16]}> 
          <Col>
            <Form.Item
              label="Lead ID"
              validateStatus={touched.leadId && errors.leadId ? "error" : ""}
              help={touched.leadId && errors.leadId ? errors.leadId : ""}
            >
              <Input
                name="leadId"
                value={values.leadId}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Lead Code"
              validateStatus={
                touched.leadCode && errors.leadCode ? "error" : ""
              }
              help={touched.leadCode && errors.leadCode ? errors.leadCode : ""}
            >
              <Input
                name="leadCode"
                value={values.leadCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>

>>>>>>> 3a089786c4c01af5b00b0019b563a1994b49f940:src/Screens/Home/leads/FilterLead.js
          <Col>
            <Form.Item
              label="Lead Name"
              validateStatus={
                touched.leadName && errors.leadName ? "error" : ""
              }
              help={touched.leadName && errors.leadName ? errors.leadName : ""}
            >
              <Input
                name="leadName"
                value={values.leadName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Mobile"
              validateStatus={touched.mobile && errors.mobile ? "error" : ""}
              help={touched.mobile && errors.mobile ? errors.mobile : ""}
            >
              <Input
                name="mobile"
                value={values.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="Address"
              validateStatus={touched.address && errors.address ? "error" : ""}
              help={touched.address && errors.address ? errors.address : ""}
            >
              <Input
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>

          <Col>
            <Form.Item
              label="isActive"
              validateStatus={
                touched.isActive && errors.isActive ? "error" : ""
              }
              help={touched.isActive && errors.isActive ? errors.isActive : ""}
            >
              <Input
                name="isActive"
                value={values.isActive}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
          </Col>
        </Row>

<<<<<<< HEAD:src/Screens/Home/leads/FilterLead.tsx
        <Row gutter={[16,16]}>
          <Col>
            <Button className={`btn btn-danger ${classes.custombutton}`}onClick={handlereset}>
=======
        <Row gutter={[24,16]}>
          <Col>
            <Button     className={`btn btn-danger ${classes.custombutton}`} onClick={handlereset}>
>>>>>>> 3a089786c4c01af5b00b0019b563a1994b49f940:src/Screens/Home/leads/FilterLead.js
              reset
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              className={`btn btn-danger ${classes.custombutton}`}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default FilterLead;
