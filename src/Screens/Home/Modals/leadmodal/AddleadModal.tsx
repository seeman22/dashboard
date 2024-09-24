import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, Form, Input, message, Row, Col, Select } from "antd";
import {
  dealerleaddropdown,
  dropdownrequirement,
  updatelead,
  viewlead,
} from "../../../../axios/Services";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leadadd } from "../../../../axios/Services";
import {
  handleaddmodal,
  handleditmodal,
} from "../../../../redux/reducers/AuthReducers";
import { useToken } from "../../../../utillity/hooks";
import { storeDataProps } from "../../../../@types/Store";
import { AddleadlistnameProps, dealerdropdownProps, requirementdropdownProps } from "../../../../@types/AddleadModal";
import { DealeriddropdownProps } from "../../../../@types/ReassignModal";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
function AddleadModal() {
  const token = useToken()
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const userType=sessionStorage.getItem("userType");
  const addne = useSelector((state:storeDataProps) => state.auth.editmodal);
  const add = useSelector((state:storeDataProps) => state.auth.addmodal);
  const userid = useSelector((state:storeDataProps) => state.auth.userid);
  
  const [requirementdropdown, SetRequirementdropdown] = useState([]);
  const [dealerdropdown,setDealardropdown]=useState<dealerdropdownProps[]>([])

  const handleEdit = () => {
    if (addne) {
      let formdata = new FormData();
      formdata.append("token", token);
      formdata.append("leadId", userid);
      viewlead(formdata)
        .then((res) => {
          const data = res.data.data;
          setValues({
            name: data.name || "",
            remarks: data.remarks || "",
            phone_country_code: data.phone_country_code || "",
            landline_number: data.landline_number || "",
            whatsapp_country_code: data.whatsapp_country_code || "",
            alter_country_code: data.alter_country_code || "",
            company_name: data.company_name || "",
            contact_person: data.contact_person || "",
            address: data.address || "",
            area: data.area || "",
            phone: data.phoneNumber || "",
            email: data.email || "",
            alternative_no: data.alternative_no || "",
            whatsapp_no: data.whatsapp_no || "",
            customer_category_id: data.customer_category_id || "",
            enquiry_type_id: data.enquiry_type_id || "",
            requirements_id: data.requirementsId.reqId || "",
            state: data.state || "",
            country: data.country || "",
            city: data.city || "",
            dealer_id: data.dealer_id || "",
            assignedTo: data.assignedTo || "",
            receivedDate: data.receivedDate || "",
            referedBy: data.referedBy || "",
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
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    handleEdit();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Name must contain only alphabets and spaces")
      .required("Name is required"),
    remarks: Yup.string(),
    phone_country_code: Yup.string().required("Phone country code is required"),
    landline_number: Yup.string().matches(
      /^\d{10}$/,
      "Landline number must be 10 digits"
    ),
    address: Yup.string().required("Address is required"),
    phone: Yup.string()
      .matches(/^[6789][0-9]{9}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    email: Yup.string().email("Invalid email format"),
    requirements_id: Yup.string().required("Requirements are required"),
  });

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: {
      name: "",
      remarks: "",
      phone_country_code: "",
      landline_number: "",
      address: "",
      phone: "",
      email: "",
      requirements_id: "1",
      state: "",
      country:"",
      city: "",
      dealer_id: "",
      assignedTo:  "",
      receivedDate:"",
      referedBy: "",
      referedPhone:"",
      refer_country_code:"",
      notes:"",
      description:"",
      isNew:"",
      latitude:"",
      longitude:"",
      customerId:"",
      Pincode:"",
      schedule_date:"",
      upload_file:"",
      approximate_amount:"",
      area:"",
      whatsapp_country_code: "",
      alter_country_code:"",
      company_name:"",
      contact_person:"",
      alternative_no: "",
      whatsapp_no:"",
            customer_category_id:"",
            enquiry_type_id:"",
    },
    validationSchema: validationSchema,
    onSubmit: (values:AddleadlistnameProps) => {
      if (addne) {
        handleEdited(values);
      } else {
        handleAddCreate(values);
      }
    },
  });

  const handleAddCreate = (values:AddleadlistnameProps) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("name", values.name);
    formData.append("phone_country_code", values.phone_country_code);
    formData.append("address", values.address);
    formData.append("phone", values.phone);
    formData.append("requirements_id", values.requirements_id);
    formData.append("remarks", values.remarks);
    formData.append("landline_number", values.landline_number);
    formData.append("whatsapp_country_code", values.whatsapp_country_code);
    formData.append("alter_country_code", values.alter_country_code);
    formData.append("company_name", values.company_name);
    formData.append("contact_person", values.contact_person);
    formData.append("area", values.area);
    formData.append("email", values.email);
    formData.append("alternative_no", values.alternative_no);
    formData.append("whatsapp_no", values.whatsapp_no);
    formData.append("customer_category_id", values.customer_category_id);
    formData.append("enquiry_type_id", values.enquiry_type_id);
    formData.append("state", values.state);
    formData.append("country", values.country);
    formData.append("city", values.city);
    formData.append("dealer_id", values.dealer_id);
    formData.append("assignedTo", values.assignedTo);
    formData.append("receivedDate", values.receivedDate);
    formData.append("referedBy", values.referedBy);
    formData.append("referedPhone", values.referedPhone);
    formData.append("refer_country_code", values.refer_country_code);
    formData.append("notes", values.notes);
    formData.append("description", values.description);
    formData.append("isNew", values.isNew);
    formData.append("latitude", values.latitude);
    formData.append("longitude", values.longitude);
    formData.append("customerId", values.customerId);
    formData.append("Pincode",values.Pincode);
    formData.append("schedule_date",values.schedule_date);
    formData.append("upload_file",values.upload_file);
    formData.append("approximate_amount", values.approximate_amount);
    leadadd(formData)
      .then((res) => {
        message.success(res.data.msg || "Lead added successfully.");
  
        navigate('/leads');
        console.log("added successfully");
        dispatch(handleaddmodal(false));
      })
      .catch((error) => {
        const errorMsg = error?.response?.data?.msg || "Something went wrong.";
        message.error(errorMsg);

      });
      
  };

  const handleEdited = (values:AddleadlistnameProps) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("name", values.name);
    formData.append("phone_country_code", values.phone_country_code);
    formData.append("address", values.address);
    formData.append("phone", values.phone);
    formData.append("requirements_id", values.requirements_id);
    formData.append("leadId", userid);

    updatelead(formData)
      .then((res) => {
        // message.success("sucsees");
       // console.log("successfully updated");
   
       message.success(res.data.msg)
       navigate('/leads');
       
      })
      .catch((res) => {
         message.error(res.data.msg);
      });
    dispatch(handleditmodal(false));
  };

  const onclose = () => {
    dispatch(handleditmodal(false));
    dispatch(handleaddmodal(false));
  };

  const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 12 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 24 } },
  };

  const requirement = () => {
    let formdata = new FormData();
    formdata.append("token", token);
    dropdownrequirement(formdata)
      .then((res) => {
        SetRequirementdropdown(res.data.data);
      })
      .catch((res) => {
        console.log("error dropdown requirement");
      });
  };
  const dealer=()=>{
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("isDealer","1");
    dealerleaddropdown(formdata).then((res)=>{
      setDealardropdown(res.data.data)
    }).catch((error)=>{
      console.log("eeror dealerid dropdown");
    })
  }

  useEffect(() => {
    if (token) {
      requirement();
      dealer();
    }
  }, [token]);
  return (
    <div>
      <h2>{addne ? "Edit Lead Details" : "Add New Lead"}</h2>

      <Form onFinish={handleSubmit} {...formItemLayout}>
        <Row>
          <Col span={12}>
            <Form.Item
              label={
                <span>
                  Name <span style={{ color: "red" }}>*</span>
                </span>
              }
              validateStatus={touched.name && errors.name ? "error" : ""}
              help={touched.name && errors.name ? errors.name : ""}
            >
              <Input
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
                placeholder="Enter the name"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Remarks"
              validateStatus={touched.remarks && errors.remarks ? "error" : ""}
              help={touched.remarks && errors.remarks ? errors.remarks : ""}
            >
              <Input
                name="remarks"
                value={values.remarks}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
                placeholder="Enter the remarks"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label={
                <span>
                  phone_country_code <span style={{ color: "red" }}>*</span>
                </span>
              }
              validateStatus={
                touched.phone_country_code && errors.phone_country_code? "error"
                  : ""
              }
              help={
                touched.phone_country_code && errors.phone_country_code
                  ? errors.phone_country_code
                  : ""
              }
            >
              <Input
                name="phone_country_code"
                value={values.phone_country_code}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
                placeholder="Enter the countrycode"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Landline Number"
              validateStatus={
                touched.landline_number && errors.landline_number ? "error" : ""
              }
              help={
                touched.landline_number && errors.landline_number
                  ? errors.landline_number
                  : ""
              }
            >
              <Input
                name="landline_number"
                value={values.landline_number}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
                placeholder="Enter the landline_number"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label={
                <span>
                  address <span style={{ color: "red" }}>*</span>
                </span>
              }
              validateStatus={touched.address && errors.address ? "error" : ""}
              help={touched.address && errors.address ? errors.address : ""}
            >
              <Input
                name="address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
                placeholder="address"
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label={
                <span>
                  phone <span style={{ color: "red" }}>*</span>
                </span>
              }
              validateStatus={touched.phone && errors.phone ? "error" : ""}
              help={touched.phone && errors.phone ? errors.phone : ""}
            >
              <Input
                name="phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              
                placeholder="Enter the phone"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label="Email"
              validateStatus={touched.email && errors.email ? "error" : ""}
              help={touched.email && errors.email ? errors.email : ""}
            >
              <Input
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            {/* <Form.Item
         label={<span>Requirement_id <span style={{ color: 'red' }}>*</span></span>}

          validateStatus={touched.requirements_id && errors.requirements_id ? 'error' : ''}
          help={touched.requirements_id && errors.requirements_id ? errors.requirements_id : ''}
        >
          <Input name="" value={values.requirements_id} onChange={handleChange} onBlur={handleBlur} style={{width:'50%'}} />
       */}
            <Form.Item
              label={
                <span>
                  Requirement_id <span style={{ color: "red" }}>*</span>
                </span>
              }
            >
              <Select
                // name="requirements_id"
                value={values.requirements_id}
                onChange={(value) => setFieldValue("requirements_id", value)}
                style={{ width: "50%" }}
              >
                {requirementdropdown.map((value:requirementdropdownProps) => (
                  <Option
                    key={value.RequirementsId}
                    value={value.RequirementsId}
                  >
                    {value.RequirementsName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      

          <Row>
 
          <Col span={12}>
          <Form.Item label="country">
         <Input
           
           name="country"
       
           placeholder="Enter your country"
           value={values.country}
           onChange={handleChange}
           onBlur={handleBlur}
           style={{ width: "50%" }}
   
         />
          </Form.Item>
       </Col>
         
    
            <Col span={12}>
            <Form.Item label="state">
            <Input
                
                name="state"
          
                placeholder="Enter your State"
                value={values.state}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
           
            </Col>
          </Row>
          <Row>
           
            <Col span={12}>
            <Form.Item label="area">
            <Input
                
                name="area"
            
                placeholder="Enter Area"
                value={values.area}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
            </Col>
            <Col span={12}>
            <Form.Item label="number">
            <Input
                
                name="phone"
                type="number"
         
                placeholder="Enter Phone"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
             
            </Col>
          </Row>
          <Row>
            <Col span={12}>
            <Form.Item label="email">

            <Input
                
                name="email"
                type="email"
          
                placeholder="Enter email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
           
            </Col>
            <Col span={12}>
            <Form.Item label="alternative_no">

            <Input
                
                name="alternative_no"
                type="number"
          
                placeholder="Enter alternative_no"
                value={values.alternative_no}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
       
            </Col>
          </Row>
          <Row>
            <Col span={12}>
            <Form.Item label="whatsapp_no">
            <Input
                
                name="whatsapp_no"
                type="number"
          
                placeholder="Enter Whatsapp_no"
                value={values.whatsapp_no}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
           
           </Col>
            <Col span={12}>
            <Form.Item label="customer_category_id">
            <Input
                
                name="customer_category_id"
                type="number"
         
                placeholder="Enter customer_category_id"
                value={values.customer_category_id}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
          
           </Col>
          </Row>
          <Row>
            <Col span={12}>
            <Form.Item      label="referedBy">
            <Input
                
                name="referedBy"
                type="number"
           
                placeholder="Enter referedBy"
                value={values.referedBy}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
           
            </Col>
            <Col span={12}>
            <Form.Item label="refer_country_code">
            <Input
                
                name="refer_country_code"
                type="number"
     
                placeholder="Enter refer_country_code"
                value={values.refer_country_code}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
          
           </Col>
          </Row>

          <Row>
            <Col span={12}>
            <Form.Item label="notes">
            <Input
                
                name="notes"
       
                placeholder="Enter notes"
                value={values.notes}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
            
            </Col>
            <Col span={12}>
            <Form.Item label="description">
            <Input
                
                name="description"
          
                placeholder="Enter description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
          
           </Col>
          </Row>
          <Row>
            <Col span={12}>
            <Form.Item label="isNew">
            <Input
                
                name="isNew"
                type="number"
    
                placeholder="Enter isNew"
                value={values.isNew}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
            
           </Col>
            <Col span={12}>
            <Form.Item label="latitude">
            <Input
                
                name="latitude"
                type="number"
          
                placeholder="Enter Latitude"
                value={values.latitude}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
             
            </Col>
          </Row>

          <Row>
            <Col span={12}>
            <Form.Item label="longitude">
            <Input
                
                name="longitude"
                type="number"
          
                placeholder="Enter longitude"
                value={values.longitude}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
              
            </Col>
            <Col span={12}>
            <Form.Item label="upload_file">
            <Input
                
                name="upload_file"
                type="number"
         
                placeholder="Enter customerId"
                value={values.upload_file}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
             
            </Col>
          </Row>

          <Row>
            <Col span={12}>
            <Form.Item label="upload_file">
            <Input
                
                name="upload_file"
          
                placeholder="Enter upload_file"
                value={values.upload_file}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
            
            </Col>
            <Col span={12}>
         <Form.Item label="approximate_amount">
         <Input
                
                name="approximate_amount"
                type="number"
            
                placeholder="Enter approximate_amount"
                value={values.approximate_amount}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
         </Form.Item>
             
            </Col>
          </Row>
          <Row>
            <Col span={12}>
            <Form.Item label="Pincode">
            <Input
                
                name="Pincode"
                type="number"
     
                placeholder="Enter pincode"
                value={values.Pincode}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}

              />
            </Form.Item>
              
            </Col>
            <Col span={12}>
            <Form.Item label="schedule_date">
            <Input
                
                name="schedule_date"
                type="number"
     
                placeholder="Enter schedule_date"
                value={values.schedule_date}
                onChange={handleChange}
                onBlur={handleBlur}
                style={{ width: "50%" }}
              />
            </Form.Item>
            
           </Col>
          </Row>

          <Row>
            <Col span={12}>
            <Form.Item label="assignedTo">
              <Input
              name="assignedTo"
              type="text"
              placeholder=""
              value={values.assignedTo}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{width:'50%'}}
              />
            </Form.Item>
            </Col>

            <Col span={12}>
            <Form.Item label="receivedDate" >
              <Input
              name="receivedDate"
              type="text"
              value={values.receivedDate}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{width:'50%'}}
             />
            </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
            <Form.Item label="refer_country_code">
              <Input
              name="refer_country_code"
              type="text"
              placeholder=""
              value={values.refer_country_code}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{width:'50%'}}
              />
            </Form.Item>
            </Col>

            <Col span={12}>
            <Form.Item label="referedPhone" >
              <Input
              name="referedPhone"
              type="text"
              value={values.referedPhone}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{width:'50%'}}
             />
            </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
            <Form.Item label="alter_country_code">
              <Input
              name="alter_country_code"
              type="text"
              placeholder=""
              value={values.alter_country_code}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{width:'50%'}}
              />
            </Form.Item>
            </Col>

            <Col span={12}>
            <Form.Item label="companyname" >
              <Input
              name="company_name"
              type="text"
              value={values.company_name}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{width:'50%'}}
             />
            </Form.Item>
            </Col>
          </Row>
          <Col span={12}>
            <Form.Item label="companyname" >
              <Input
              name="contact_person"
              type="text"
              value={values.contact_person}
              onChange={handleChange}
              onBlur={handleBlur}
              style={{width:'50%'}}
             />
            </Form.Item>
            </Col>
            <Col span={12}>
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
    style={{ width: "50%" }}
  >
            {/* {dealerdropdown.map((dealer:DealeriddropdownProps) => (
                <Option key={dealer.userId} value={dealer.userId}>
                    {dealer.userName}
                </Option>
            ))} */}
           {dealerdropdown.map((value:DealeriddropdownProps) => {
                const nameOnly = value.userName.split("(")[0];
                return (
                  <Option key={value.userId} value={value.userId}>
                    {nameOnly.trim()}
                  </Option>
                );
              })}
        </Select>
    </Form.Item>
            </Col>
          <Row>

          </Row>

        <Button type="primary" htmlType="submit">
          {addne ? "Update Lead" : "Add Lead"}
        </Button>
      </Form>
    </div>
  );
}

export default AddleadModal;
