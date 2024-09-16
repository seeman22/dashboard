import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Modal, Form, Input,Select,message,Col,Row} from 'antd';
import { update } from '../../../axios/Services';
import { Adminsss } from '../../../axios/Services';
import { handledealerid } from '../../../redux/reducers/AuthReducers';
const { Option } = Select;

function UpdateModal ({userdata,editu,onclose,userid,handles}) {


    const token = useSelector((state) => state.auth.token);
    const dealerid=useSelector((state)=>state.auth.dealerid)
    const userType=useSelector((state)=>state.auth.userType);
    const dispatch=useDispatch();

    const validationSchema = Yup.object({
        name: Yup.string().matches(/^[a-zA-Z\s]+$/, 'Name must contain only alphabets and spaces').required('Name is required'),
        userName: Yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
        phoneNumber: Yup.string().matches(/^[6789][0-9]{9}$/, 'Phone number must be 10 digits').required('Phone number is required'),
        email: Yup.string().email('Invalid email format').required('email is required'),
        landline_number: Yup.string().matches(/^\d{10}$/, 'Landline number must be 10 digits'),
        state: Yup.string().matches(/^[a-zA-Z\s]+$/, 'State must contain only alphabets and spaces'),
        city: Yup.string().matches(/^[a-zA-Z\s]+$/, 'City must contain only alphabets and spaces'),
        password: Yup.string().min(6, 'Password must be at least 6 characters'),
        // userType: Yup.string().required('User type is required'),
        pincode: Yup.string().matches(/^\d{6}$/, 'Pincode must be 6 digits'),
        dealer_id: Yup.string(),
        // userId:Yup.string().required('UserID is required'),
    })

    const { handleSubmit, handleChange, handleBlur, values, errors, touched,setFieldValue } = useFormik({
      enableReinitialize: true,  
      initialValues: {
          name:userdata?.name,
          userName:userdata?.userName,
          phoneNumber:userdata.phoneNumber,
          email:userdata.email,
          landline_number: '',
          state: '',
          city: '',
          password: '',
          // userType:userdata.userType,
          pincode: '',
          dealer_id: '',
          // userId:userdata.userId
        },
        validationSchema: validationSchema,
        onSubmit: (values) => handleedit(values)
      });

      const handleedit=()=>{
        let formData=new FormData();
formData.append('token',token);
formData.append('userName',values.userName);
formData.append('name',values.name)
formData.append('phoneNumber',values.phoneNumber);
 formData.append('userType',userdata.userType);
formData.append('userId',userid)
formData.append('email',values.email);
formData.append("dealer_id",values.dealer_id);

update(formData).then((res)=>{
  message.success(res.data.msg);
   console.log("updated suceesss");
}).catch(()=>{
  message.error("update error check all")
})
onclose();
handles();

      }

      useEffect(()=>{
        let formData = new FormData();
        formData.append('token', token);
        formData.append('type', '3');
        Adminsss(1, 10, formData)
            .then((res) => {
                dispatch(handledealerid(res.data.data.items))
                
            })},[token])
      console.log(dealerid)
      console.log(userdata.userType);

      const formItemLayout = {
        labelCol: { xs: { span: 24 }, sm: { span: 12 } },
        wrapperCol: { xs: { span: 24 }, sm: { span: 24 } },
      };

    
  return (
    <div>

<Modal
    title={"EDIT"}
    open={editu}
    onOk={handleSubmit}
   onCancel={onclose}
   width={800}
  >
      <Form {...formItemLayout} >

        <Row>
          
          <Col span={12}>
        <Form.Item
          label="Name"
          validateStatus={touched.name && errors.name ? 'error' : ''}
          help={touched.name && errors.name ? errors.name : ''}
        >
          <Input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item></Col>
        <Col span={12}>

        <Form.Item
          label="UserName"
          validateStatus={touched.userName && errors.userName ? 'error' : ''}
          help={touched.userName && errors.userName ? errors.userName : ''}
        >
          <Input name="userName" value={values.userName} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>
        </Col>
        
        </Row>
       

       <Row>
        <Col span={12}>
       <Form.Item
          label="PhoneNumber"
          validateStatus={touched.phoneNumber && errors.phoneNumber ? 'error' : ''}
          help={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : ''}
        >
          <Input name="phoneNumber" value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>
       </Col>
       <Col span={12}> <Form.Item
          label="Email"
          validateStatus={touched.email && errors.email ? 'error' : ''}
          help={touched.email && errors.email ? errors.email : ''}
        >
          <Input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item></Col>
       </Row>
    
     <Row>
      <Col span={12}><Form.Item
          label="Landline Number"
          validateStatus={touched.landline_number && errors.landline_number ? 'error' : ''}
          help={touched.landline_number && errors.landline_number ? errors.landline_number : ''}
        >
          <Input name="landline_number" value={values.landline_number} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item></Col>
        <Col span={12}>
        <Form.Item
          label="State"
          validateStatus={touched.state && errors.state ? 'error' : ''}
          help={touched.state && errors.state ? errors.state : ''}
        >
          <Input name="state" value={values.state} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>
        </Col>
        </Row>
       
<Row>
  <Col span={12}>
<Form.Item
          label="City"
          validateStatus={touched.city && errors.city ? 'error' : ''}
          help={touched.city && errors.city ? errors.city : ''}
        >
          <Input name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item></Col>
         <Col span={12} >
        <Form.Item
          label="Password"
          validateStatus={touched.password && errors.password ? 'error' : ''}
          help={touched.password && errors.password ? errors.password : ''}
        >
          <Input.Password name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>
        </Col></Row>
    
        
        
        {/* <Form.Item
          label="User Type"
          validateStatus={touched.userType && errors.userType ? 'error' : ''}
          help={touched.userType && errors.userType ? errors.userType : ''}
        >
          <Input name="userType" value={values.userType} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item> */}

        <Row>
          <Col span={12}>
          <Form.Item
          label="Pincode"
          validateStatus={touched.pincode && errors.pincode ? 'error' : ''}
          help={touched.pincode && errors.pincode ? errors.pincode : ''}
        >
          <Input name="pincode" value={values.pincode} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>
          </Col>

          <Col span={12}>
          {userdata.userType === 4 ? (
    <Form.Item 
        label="Dealer"
        validateStatus={touched.dealer_id && errors.dealer_id ? 'error' : ''}
        help={touched.dealer_id && errors.dealer_id ? errors.dealer_id : ''}
    >
        <Select
            name="dealer_id"
            value={values.dealer_id}
            onChange={(value) => setFieldValue('dealer_id', value)}
            onBlur={handleBlur}
        >
            {dealerid.map(dealer => (
                <Option key={dealer.userId} value={dealer.userId}>
                    {dealer.userName}
                </Option>
            ))}
        </Select>
    </Form.Item>
) : null}
          </Col>
        </Row>
    
        {/* <Form.Item
          label="Dealer ID"
          validateStatus={touched.dealer_id && errors.dealer_id ? 'error' : ''}
          help={touched.dealer_id && errors.dealer_id ? errors.dealer_id : ''}
        >
          <Input name="dealer_id" value={values.dealer_id} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item> */}

        {/* <Form.Item
          label="user ID"
          validateStatus={touched.userId  && errors.userId  ? 'error' : ''}
          help={touched.userId  && errors.userId  ? errors.userId  : ''}
        >
          <Input name="userId " value={values.userId } onChange={handleChange} onBlur={handleBlur} />
        </Form.Item> */}

     

      </Form>
    </Modal>
    </div>
  )
}

export default UpdateModal;