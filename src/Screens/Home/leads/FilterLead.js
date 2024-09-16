import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form, Input, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  handlefilter,
  handleleadfilt,
  handlemasterfilt,
} from "../../../redux/reducers/AuthReducers";
import classes from "../User_Management/Login.module.css";

function FilterLead() {
  const dispatch = useDispatch();
  const leadfilt = useSelector((state) => state.auth.leadfilt);
  const validationSchema = Yup.object({
    leadId: Yup.number(),
    leadCode: Yup.string(),
    leadName: Yup.string(),
    mobile: Yup.string(),
    address: Yup.string(),
  });

  const handlesearch = (values, { resetForm }) => {
    dispatch(handlefilter(values));
    resetForm();
  };

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        leadId: "",
        leadCode: "",
        leadName: "",
        mobile: "",
        address: "",
        isActive: "",
      },
      validationSchema: validationSchema,
      onSubmit: handlesearch,
    });
  const handlereset = () => {
    dispatch(handlefilter({}));
    dispatch(handleleadfilt(false));
  };

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Row>
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

        <Row gutter={[16]}>
          <Col>
            <Button className="btn btn-danger mb-2" onClick={handlereset}>
              reset
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              className="btn btn-danger mb-2"
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
