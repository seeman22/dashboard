import { Button, Modal, Form, Input, Select,message, Col,Row } from 'antd';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from 'react';

import { datamasterlist, masteradd, masterlist, masterupdate } from '../../../../axios/Services';
import { handleaddmodal, handleditmodal } from '../../../../redux/reducers/AuthReducers';
import { useToken } from '../../../../utillity/hooks';
import { mastercateogoryfieldsProps, mastercommonfieldProps,masterenquiryfieldsProps, masterrequirementfieldProps } from '../../../../@types/master';

const { Option } = Select;

function AddModalMaster({addnew,editupdate,userid,value,list,listdata,setAddmodal,seteditmodal,update,currentPage}:{
    addnew:boolean,
    editupdate:boolean,
    listdata:mastercateogoryfieldsProps[]|masterenquiryfieldsProps[]|masterrequirementfieldProps[],
    userid:string,
    value:string,
    list:(page:number,size:number)=>void,
    setAddmodal:React.Dispatch<React.SetStateAction<boolean>>,
    seteditmodal:React.Dispatch<React.SetStateAction<boolean>>,
    update:string,
    currentPage:number,

}) {
    
    const token = useToken();
    const [data ,setData]=useState([]);
    const dispatch=useDispatch();
    let dataid=""
    const validationSchema = Yup.object({
        name: Yup.string().matches(/^[a-zA-Z\s]+$/, 'Name must contain only alphabets and spaces').required('Name is required'),
    });
    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue,setValues } = useFormik({
        initialValues: {
            name: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) =>{
            if(addnew){
                handlenew(values)
            }
            else{
                handleupdate(values)
            }
        }
          
        
    });

    useEffect(() => {
        if (editupdate) {
            let formdata=new FormData();
            formdata.append("token",token);
        
            
               
                if(value==="category"){
                    const customerdata = (listdata as mastercateogoryfieldsProps[] )?.find((ele:mastercateogoryfieldsProps) => ele.customerCategoryId === userid)
                    console.log("customerData",customerdata)
                    setValues({
                     name:customerdata?.customerCategoryName || "" ,
                    })
                }
                if(value==="enquiry_type"){
                    console.log("hi")
                    
                    const customerdata = (listdata as masterenquiryfieldsProps[])?.find((ele:masterenquiryfieldsProps)=> ele.enquireId === userid)
                    console.log("userid",userid)
                    setValues({
                        name: customerdata?.enquireTypeName || ""
                    })
                    console.log(customerdata,"customerdata");
                }
                if(value==="requirements"){
                    const customerdata = (listdata as masterrequirementfieldProps[])?.find((ele:masterrequirementfieldProps)=> ele.RequirementsId === userid)

                    setValues({
                        name: customerdata?.RequirementsName || ""
                    })
                }
              
            
        }
    }, [editupdate]);

  
        

// console.log(parsedData)
console.log(value)
console.log(dataid);
    const handlenew = (values:mastercommonfieldProps) => {
        const formData = new FormData();
        formData.append('token', token);
        formData.append('name', values.name);
      


        masteradd(formData,value)
            .then((response) => {
                message.success(response.data.msg)
                console.log(response.data);
                setAddmodal(false);
                list(currentPage,5)

         
            })
            .catch((response) => {
                message.error(response.data.msg)
       
            });

           
    };
    console.log(values)

    const handleupdate=(value:mastercommonfieldProps)=>{
    let formdata=new FormData();
    formdata.append("token",token);
    formdata.append("dataId",userid);
    formdata.append("name",value.name);
    masterupdate(formdata,update).then((res)=>{
        message.success(res.data.msg);
        seteditmodal(false);
        list(currentPage,5);
    }).catch((res)=>{
        message.error(res.data.msg);
    })
   
    }


            const formItemLayout = {
                labelCol: { xs: { span: 24 }, sm: { span: 12 } },
                wrapperCol: { xs: { span: 24 }, sm: { span: 24 } },
              };
     const onclose=()=>{
      if(addnew){
    setAddmodal(false);
      }
      else{
        seteditmodal(false);
      }
      
    }
    const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        handleSubmit();
      };
    return (
        <Modal
            title={addnew ? "ADD" : "EDIT"}
            open={addnew||editupdate}
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

                </Row>
         
              
        
              
            </Form>
        </Modal>
    );
}

export default AddModalMaster;
