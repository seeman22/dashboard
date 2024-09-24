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
        <Row gutter={[16,16]}>
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

        <Row gutter={[16,16]}>
          <Col>
            <Button className={`btn btn-danger ${classes.custombutton}`}onClick={handlereset}>
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
