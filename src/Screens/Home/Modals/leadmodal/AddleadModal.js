import React, { useEffect } from 'react'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Button, Modal, Form, Input, Select ,message} from 'antd';
import { updatelead, viewlead } from '../../../../axios/Services';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { leadadd } from '../../../../axios/Services';
import { handleaddmodal, handleditmodal } from '../../../../redux/reducers/AuthReducers';
function AddleadModal({userId,list}) {
    const token=useSelector((state)=>state.auth.token);
    const addne=useSelector((state)=> state.auth.editmodal);
    const add=useSelector((state)=> state.auth.addmodal);
    const dispatch = useDispatch();
  
    console.log(addne)
  
    const handleEdit = () => {
        if(addne) {
            let formdata=new FormData();
            formdata.append("token",token);
            formdata.append("leadId",userId);
            viewlead(formdata).then((res)=>{
               const data = res.data.data;
               console.log(res.data.data)
               setValues({
                name: data.name ||"",
                remarks: data.remarks ||"",
                phone_country_code: data.phone_country_code ||"",
                landline_number:data.landline_number ||"",
                whatsapp_country_code: data.whatsapp_country_code ||"",
                alter_country_code: data.alter_country_code ||"",
                company_name:data.company_name ||"",
                contact_person: data.contact_person ||"",
                address:data.address ||"",
                area: data.area ||"",
                phone: data.phoneNumber ||"",
                email: data.email ||"",
                alternative_no: data.alternative_no ||"",
                whatsapp_no: data.whatsapp_no ||"",
                customer_category_id: data.customer_category_id || "",
                enquiry_type_id: data.enquiry_type_id || "",
                requirements_id: data.requirementsId.reqId || "",
                state: data.state || "",
                country: data.country || "",
                city: data.city || "",
                dealer_id: data.dealer_id || "",
                assignedTo: data.assignedTo || "",
                receivedDate: data.receivedDate|| "",
                referedBy:data.referedBy|| "",
                referedPhone: data.referedPhone || "",
                refer_country_code: data.refer_country_code || "",
                notes: data.notes || "",
                description: data.description || "",
                isNew: data.isNew || "",
                latitude: data.latitude || "",
                longitude: data.longitude || "",
                customerId: data.customerCategoryId || "",
                Pincode: data.pincode || "",
                schedule_date: data.schedule_date || "",
                upload_file: data.upload_file || "",
                approximate_amount: data.approximate_amount || "",
            });
            }).catch((err) => {
                console.log(err);
            })
            
        }
    }
    
    useEffect(() => {
      handleEdit();
    },[])
    const validationSchema = Yup.object({
        name: Yup.string().matches(/^[a-zA-Z\s]+$/, 'Name must contain only alphabets and spaces').required('Name is required'),
        remarks: Yup.string(),
        phone_country_code:Yup.string().required('phone_country_code'),
        landline_number: Yup.string().matches(/^\d{10}$/, 'Landline number must be 10 digits'),
        whatsapp_country_code:Yup.string(),
        alter_country_code:Yup.string(),
        company_name: Yup.string(),
        contact_person:Yup.string(),
        address:Yup.string().required("address "),
        area:Yup.string(),
        phone: Yup.string().matches(/^[6789][0-9]{9}$/, 'Phone number must be 10 digits').required('Phone number is required'),
        email: Yup.string().email('Invalid email format'),
        requirements_id :Yup.string().required()
    });

    const { handleSubmit, handleChange, handleBlur, values, errors, touched, setValues} = useFormik({
        initialValues: {
            name: '',
            remarks: '',
            phone_country_code: '',
            landline_number: '',
            whatsapp_country_code: '',
            alter_country_code: '',
            company_name: '',
            contact_person: '',
            address: '',
            area: '',
            phone: '',
            email: '',
            alternative_no: '',
            whatsapp_no: '',
            customer_category_id: '', 
            enquiry_type_id: '',
            requirements_id: '1',
            state: '',
            country: '',
            city: '',
            dealer_id: '',
            assignedTo: '',
            receivedDate: '',
            referedBy: '',
            referedPhone: '',
            refer_country_code: '',
            notes: '',
            description: '',
            isNew: '',
            latitude: '',
            longitude: '',
            customerId: '',
            Pincode: '',
            schedule_date: '',
            upload_file: '',
            approximate_amount: '' 
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            if(add){
                handleaddcreate(values)
            }
            else{
                handleeditted(values)
            }
      

        }
    });
  
    
    const handleaddcreate=(values)=>{
      let formData=new FormData();
      formData.append("token",token);
      formData.append("name",values.name);
      formData.append("phone_country_code",values.phone_country_code);
      formData.append("address",values.address);
      formData.append("phone",values.phone);
      formData.append("requirements_id",values.requirements_id);
      leadadd(formData).then((res)=>{
        message.success(res.data.msg);
        console.log("added sucessfully");
      dispatch(handleaddmodal(false));
      }).catch((res)=>{
        message.error(res.data.msg)
    })
      list()
    }

    const handleeditted=(values)=>{
        let formData=new FormData();
        formData.append("token",token);
        formData.append("name",values.name);
        formData.append("phone_country_code",values.phone_country_code);
        formData.append("address",values.address);
        formData.append("phone",values.phone);
        formData.append("requirements_id",values.requirements_id);
        formData.append("leadId",userId);

        updatelead(formData).then((res)=>{
            message.success(res.data.msg);
            console.log("successfully updtae")
        }).catch((res)=>{
            message.error(res.data.msg)
        })
        dispatch(handleditmodal(false));
        list()
    }
    const onclose = () => {
        dispatch(handleditmodal(false))
        dispatch(handleaddmodal(false))
    }

  return (
    <div>
        <Modal
  title={addne ? 'Edit details' : 'Add new Details'}

    open={addne||add}
    onOk={handleSubmit}
    onCancel={onclose}
>
    <Form>
        <Form.Item
            label="Name"
            validateStatus={touched.name && errors.name ? 'error' : ''}
            help={touched.name && errors.name ? errors.name : ''}
        >
            <Input name="name" value={values.name} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
            label="Remarks"
            validateStatus={touched.remarks && errors.remarks ? 'error' : ''}
            help={touched.remarks && errors.remarks ? errors.remarks : ''}
        >
            <Input name="remarks" value={values.remarks} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
            label="Phone Country Code"
            validateStatus={touched.phone_country_code && errors.phone_country_code ? 'error' : ''}
            help={touched.phone_country_code && errors.phone_country_code ? errors.phone_country_code : ''}
        >
            <Input name="phone_country_code" value={values.phone_country_code} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
            label="Landline Number"
            validateStatus={touched.landline_number && errors.landline_number ? 'error' : ''}
            help={touched.landline_number && errors.landline_number ? errors.landline_number : ''}
        >
            <Input name="landline_number" value={values.landline_number} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
            label="WhatsApp Country Code"
            validateStatus={touched.whatsapp_country_code && errors.whatsapp_country_code ? 'error' : ''}
            help={touched.whatsapp_country_code && errors.whatsapp_country_code ? errors.whatsapp_country_code : ''}
        >
            <Input name="whatsapp_country_code" value={values.whatsapp_country_code} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
            label="Alter Country Code"
            validateStatus={touched.alter_country_code && errors.alter_country_code ? 'error' : ''}
            help={touched.alter_country_code && errors.alter_country_code ? errors.alter_country_code : ''}
        >
            <Input name="alter_country_code" value={values.alter_country_code} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
            label="Company Name"
            validateStatus={touched.company_name && errors.company_name ? 'error' : ''}
            help={touched.company_name && errors.company_name ? errors.company_name : ''}
        >
            <Input name="company_name" value={values.company_name} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
            label="Contact Person"
            validateStatus={touched.contact_person && errors.contact_person ? 'error' : ''}
            help={touched.contact_person && errors.contact_person ? errors.contact_person : ''}
        >
            <Input name="contact_person" value={values.contact_person} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
            label="Address"
            validateStatus={touched.address && errors.address ? 'error' : ''}
            help={touched.address && errors.address ? errors.address : ''}
        >
            <Input name="address" value={values.address} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
            label="Area"
            validateStatus={touched.area && errors.area ? 'error' : ''}
            help={touched.area && errors.area ? errors.area : ''}
        >
            <Input name="area" value={values.area} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
            label="Phone"
            validateStatus={touched.phone && errors.phone ? 'error' : ''}
            help={touched.phone && errors.phone ? errors.phone : ''}
        >
            <Input name="phone" value={values.phone} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
            label="Email"
            validateStatus={touched.email && errors.email ? 'error' : ''}
            help={touched.email && errors.email ? errors.email : ''}
        >
            <Input name="email" value={values.email} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
            label="Alternative Number"
            validateStatus={touched.alternative_no && errors.alternative_no ? 'error' : ''}
            help={touched.alternative_no && errors.alternative_no ? errors.alternative_no : ''}
        >
            <Input name="alternative_no" value={values.alternative_no} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
            label="WhatsApp Number"
            validateStatus={touched.whatsapp_no && errors.whatsapp_no ? 'error' : ''}
            help={touched.whatsapp_no && errors.whatsapp_no ? errors.whatsapp_no : ''}
        >
            <Input name="whatsapp_no" value={values.whatsapp_no} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
            label="Requirements ID"
            validateStatus={touched.requirements_id && errors.requirements_id ? 'error' : ''}
            help={touched.requirements_id && errors.requirements_id ? errors.requirements_id : ''}
        >
            <Input name="requirements_id" value={values.requirements_id} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

        <Form.Item
            label="Approximate Amount"
            validateStatus={touched.approximate_amount && errors.approximate_amount ? 'error' : ''}
            help={touched.approximate_amount && errors.approximate_amount ? errors.approximate_amount : ''}
        >
            <Input name="approximate_amount" value={values.approximate_amount} onChange={handleChange} onBlur={handleBlur} />
        </Form.Item>

      
    </Form>
</Modal>


    </div>
  )
}

export default AddleadModal