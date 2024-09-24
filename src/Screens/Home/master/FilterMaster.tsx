import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form, Input, Row, Col } from "antd";
import { useDispatch, useSelector } from "react-redux";
import classes from '../master/Login.module.css';
import {
  handlemasterfilt,
  handlefilter,
} from "../../../redux/reducers/AuthReducers";
import { dataslistsetfieldnamesProps, mastercommonfieldProps, masterfiednameProps, } from "../../../@types/master";

function FilterMaster({ searching,setSearching,listapicall ,currentPage}:{
 searching:boolean,
 setSearching:React.Dispatch<React.SetStateAction<boolean>>,
 listapicall:(page:number,size:number,values:mastercommonfieldProps)=>void,
 currentPage:number

}) {

  const formvalues={
    name: "",
  }
  const dispatch = useDispatch();
  const filter = useSelector((state:masterfiednameProps) => state.auth.filter);
  const validationSchema = Yup.object({
    name: Yup.string(),
  });
  const handlesearch = (
    values:mastercommonfieldProps,
    { resetForm }: { resetForm: () => void }
  ) => {
     listapicall(currentPage,5,values)
    resetForm();
  };
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } =
    useFormik<mastercommonfieldProps>({
      initialValues: {
        name: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values, { resetForm }) => handlesearch(values, { resetForm }),
    });
  const handlereset = () => {
    listapicall(currentPage,5,formvalues)
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

        <Row gutter={[16,16]}>
          <Col>
            <Button className={`btn btn-danger mb-2  ${classes.custombutton}`} onClick={handlereset}>
              reset
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              htmlType="submit"
              className={`btn btn-danger  ${classes.custombutton}`} 
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
