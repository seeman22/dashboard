import { Button, Modal, Form, Input, Select,message, Col,Row } from 'antd';
import { dropdown, newadminsadd, viewuser } from '../../../axios/Services';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { handledealerid } from '../../../redux/reducers/AuthReducers';
import { Adminsss } from '../../../axios/Services';
import Admin from '../User_Management/Admin';
import { useToken } from '../../../utillity/hooks';
import { DealeridProps, formikaddnewvaluesProps } from '../../../@types/AddNew';

const { Option } = Select;

function AddNew({ addnew, onclose, handlesub,usertype }:{onclose:()=>void,addnew:boolean,handlesub:()=>void,usertype:string}) {
    const token = useToken();
    const [dealerOptions, setDealerOptions] = useState([]);
    const dealerid=useSelector((state:any)=>state.auth.dealerid)
    // const userType=useSelector((state)=>state.auth.userType);
    const dispatch=useDispatch();
    const validationSchema = Yup.object({
        name: Yup.string().matches(/^[a-zA-Z\s]+$/, 'Name must contain only alphabets and spaces').required('Name is required'),
        userName: Yup.string().min(3, 'Username must be at least 3 characters').required('Username is required'),
        phoneNumber: Yup.string().matches(/^[6789][0-9]{9}$/, 'Phone number must be 10 digits').required('Phone number is required'),
        email: Yup.string().email('Invalid email format'),
        landline_number: Yup.string().matches(/^\d{10}$/, 'Landline number must be 10 digits'),
        state: Yup.string().matches(/^[a-zA-Z\s]+$/, 'State must contain only alphabets and spaces'),
        city: Yup.string().matches(/^[a-zA-Z\s]+$/, 'City must contain only alphabets and spaces'),
        password: Yup.string().min(6, 'Password must be at least 6 characters'),
        // userType: Yup.string().required('User type is required'),
        pincode: Yup.string().matches(/^\d{6}$/, 'Pincode must be 6 digits'),
        dealer_id: Yup.string()
    });


    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue } = useFormik<formikaddnewvaluesProps>({
        initialValues:{
            name: '',
            userName: '',
            phoneNumber: '',
            email: '',
            landline_number: '',
            state: '',
            city: '',
            password: '',
            // userType: '',
            pincode: '',
            dealer_id: ''
        },
        validationSchema: validationSchema,
        onSubmit: (values) => handlenew(values)
    });

    const handlenew = (values: formikaddnewvaluesProps) => {
        const formData = new FormData();
        formData.append('token', token);
        formData.append('name', values.name);
        formData.append('userName', values.userName);
        formData.append('phoneNumber', values.phoneNumber);
        formData.append('userType',usertype);
        formData.append('dealer_id', values.dealer_id);

        newadminsadd(formData)
            .then((response) => {
                message.success(response.data.msg)
                console.log(response.data);
                handlesub();
                onclose();
            })
            .catch((response) => {
                message.error(response.data.msg)
       
            });
    };

    useEffect(() => {
        const drop = () => {
          let formdata=new FormData();
          formdata.append("token",token)
        };
        drop();

    }, [token]);
    useEffect(()=>{
        let formData = new FormData();
        formData.append('token', token);
        formData.append('type', '3');
        Adminsss(1, 10, formData)
            .then((res) => {
                dispatch(handledealerid(res.data.data.items))
                
            })},[token])
            console.log(usertype);

            const formItemLayout = {
                labelCol: { xs: { span: 24 }, sm: { span: 12 } },
                wrapperCol: { xs: { span: 24 }, sm: { span: 24 } },
              };
              const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault(); 
                handleSubmit();
              };
    return (
        <Modal
            title={"ADD"}
            open={addnew}
            onOk={handleOk}
            onCancel={onclose}
            width={800} 

        >
            <Form {...formItemLayout}>
                <Row gutter={[24,16]}>
                    <Col span={12}>       <Form.Item
        label={<span>Name <span style={{ color: 'red' }}>*</span></span>}
                    validateStatus={touched.name && errors.name ? 'error' : ''}
                    help={touched.name && errors.name ? errors.name : ''}
                >
                    <Input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} placeholder='enter the name'  style={{ width: '100%' }}  />
                </Form.Item>
                    </Col>


                    <Col span={12}>
                    <Form.Item
                    label={<span>UserName <span style={{ color: 'red' }}>*</span></span>}
                    validateStatus={touched.userName && errors.userName ? 'error' : ''}
                    help={touched.userName && errors.userName ? errors.userName : ''}
                >
                    <Input name="userName" value={values.userName} onChange={handleChange} onBlur={handleBlur} placeholder='enter the username'  style={{ width: '100%' }} />
                </Form.Item>
                    </Col>

                </Row>
         
              <Row  gutter={[24,16]}>
                <Col span={12}>
                <Form.Item
                      label={<span>PhoneNumber <span style={{ color: 'red' }}>*</span></span>}
                    validateStatus={touched.phoneNumber && errors.phoneNumber ? 'error' : ''}
                    help={touched.phoneNumber && errors.phoneNumber ? errors.phoneNumber : ''}
                >
                    <Input name="phoneNumber" value={values.phoneNumber} onChange={handleChange} onBlur={handleBlur} placeholder=' enter phone number'  style={{ width: '100%' }}  />
                </Form.Item>
                </Col>

                <Col span={12}>
                <Form.Item
                    label="Email"
                    validateStatus={touched.email && errors.email ? 'error' : ''}
                    help={touched.email && errors.email ? errors.email : ''}
                >
                    <Input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} placeholder='enter the email'  style={{ width: '100%' }}  />
                </Form.Item>
                </Col>
              </Row>
              
              <Row  gutter={[24,16]}>
                <Col span={12}>
                <Form.Item
                    label="Landline Number"
                    validateStatus={touched.landline_number && errors.landline_number ? 'error' : ''}
                    help={touched.landline_number && errors.landline_number ? errors.landline_number : ''}
                >
                    <Input name="landline_number" value={values.landline_number} onChange={handleChange} onBlur={handleBlur} placeholder='enter the landline number'  style={{ width: '100%' }} />
                </Form.Item>
                
                </Col>
                <Col span={12}>
                <Form.Item
                    label="State"
                    validateStatus={touched.state && errors.state ? 'error' : ''}
                    help={touched.state && errors.state ? errors.state : ''}
                >
                    <Input name="state" value={values.state} onChange={handleChange} onBlur={handleBlur} placeholder='enter the state'  style={{ width: '100%' }}  />
                </Form.Item>
                </Col>
              </Row>
              

              <Row  gutter={[24,16]}>
                <Col span={12}>
                <Form.Item
                    label="City"
                    validateStatus={touched.city && errors.city ? 'error' : ''}
                    help={touched.city && errors.city ? errors.city : ''}
                >
                    <Input name="city" value={values.city} onChange={handleChange} onBlur={handleBlur} placeholder='enter the city'  style={{ width: '100%' }} />
                </Form.Item>
                </Col>

             <Col span={12}>
             <Form.Item
                    label="Password"
                    validateStatus={touched.password && errors.password ? 'error' : ''}
                    help={touched.password && errors.password ? errors.password : ''}
                >
                    <Input.Password name="password" value={values.password} onChange={handleChange} onBlur={handleBlur} placeholder="enter the password"  style={{ width: '100%' }}  />
                </Form.Item>
             </Col>
              </Row>
            
               
            <Row  gutter={[24,16]}>
                <Col span={12}>
                <Form.Item
                    label="Pincode"
                    validateStatus={touched.pincode && errors.pincode ? 'error' : ''}
                    help={touched.pincode && errors.pincode ? errors.pincode : ''}
                >
                    <Input name="pincode" value={values.pincode} onChange={handleChange} onBlur={handleBlur} placeholder='enter the pincode'  style={{ width: '100%' }}  />
                </Form.Item>
                </Col>

                <Col span={12}>
                {usertype === '4' ? (
    <Form.Item 
        label="Dealer"
        validateStatus={touched.dealer_id && errors.dealer_id ? 'error' : ''}
        help={touched.dealer_id && typeof errors.dealer_id === 'string' ? errors.dealer_id : ''} // Ensure it's a string
    >
         <Select
    //    name="dealer_id"
    value={values.dealer_id}
    onChange={(value) => setFieldValue('dealer_id', value)}
    onBlur={handleBlur}
    placeholder="Select a dealer"
  >
            {dealerid.map((dealer:DealeridProps) => (
                <Option key={dealer.userId} value={dealer.userId}>
                    {dealer.userName}
                </Option>
            ))}
        </Select>
    </Form.Item>
) : null}
                </Col>
            </Row>
               
              
            </Form>
        </Modal>
    );
}

export default AddNew;
