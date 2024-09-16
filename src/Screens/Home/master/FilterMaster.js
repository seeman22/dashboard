import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form, Input, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  handlemasterfilt,
  handlefilter,
} from "../../../redux/reducers/AuthReducers";

function FilterMaster({ searching, setSearching }) {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.auth.filter);
  const validationSchema = Yup.object({
    name: Yup.string(),
  });
  const handlesearch = (values, { resetForm }) => {
    dispatch(handlefilter(values));
    resetForm();
  };

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
      },
      validationSchema: validationSchema,
      onSubmit: handlesearch,
    });
  const handlereset = () => {
    dispatch(handlefilter({}));
    // dispatch(handlemasterfilt(false));
    setSearching(false);
  };
  console.log(filter);
  return (
    <>
      <Form onFinish={handleSubmit}>
        <Row>
          <Col>
            <Form.Item
              label="name"
              validateStatus={touched.name && errors.name ? "error" : ""}
              help={touched.name && errors.name ? errors.name : ""}
            >
              <Input
                name="name"
                value={values.name}
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

export default FilterMaster;
