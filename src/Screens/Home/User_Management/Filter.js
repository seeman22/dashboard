import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { handlefilter } from '../../../redux/reducers/AuthReducers';
import { Button, Form, Input } from 'antd';

function Filter() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.auth.filter);


  const validationSchema = Yup.object({
    userName: Yup.string().min(3, 'Username must be at least 3 characters'),
    phoneNumber: Yup.string().matches(/^[6789][0-9]{9}$/, 'Phone number must be 10 digits'),
    email: Yup.string().email('Invalid email format'),
    dealerId: Yup.number(),
  });


  const handlesearch = (values) => {
    dispatch(handlefilter(values));
  };

 
  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      userName: '',
      dealerId: '',
      email: '',
      phoneNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => handlesearch(values),
  });

  return (
    <>
      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Username"
          validateStatus={touched.userName && errors.userName ? 'error' : ''}
          help={touched.userName && errors.userName ? errors.userName : ''}
        >
          <Input
            name="userName"
            value={values.userName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Email"
          validateStatus={touched.email && errors.email ? 'error' : ''}
          help={touched.email && errors.email ? errors.email : ''}
        >
          <Input
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Dealer ID"
          validateStatus={touched.dealerId && errors.dealerId ? 'error' : ''}
          help={touched.dealerId && errors.dealerId ? errors.dealerId : ''}
        >
          <Input
            name="dealerId"
            value={values.dealerId}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          validateStatus={touched.phoneNumber && errors.phoneNumber ? 'error' : ''}
          help={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : ''}
        >
          <Input
            name="phoneNumber"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit" className="btn btn-danger mb-2 w-25">
          Submit
        </Button>
      </Form>
    </>
  );
}

export default Filter;
