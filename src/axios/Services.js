import instance from "./Axios";
import axios from "./Axios";

export const Loginpd = (loginid)=>{
    return axios.post("/login",loginid);
}

export const dashboard = (productid) => {
    return axios.post('dashboard/all_data_count', productid)
}

export const Adminsss=(page,size,data)=>{
    return axios.post(`/user/list_users?page=${page}&size=${size}`,data)
}

export const newadminsadd=(data)=>{
    return axios.post('/user/create_user',data)
}

export const handledelete=(data)=>{
    return axios.post('/user/delete_user',data)
}

export const viewuser=(data)=>{
    return axios.post('/user/view_user',data)
}

export const update=(data)=>{
    return axios.post('/user/update_user',data);
}
export const dropdown=(data)=>{
    return axios.post('/dropdown/employeeDropDown',data);
}

export const forgotpassword=(email)=>{
    return axios.post('/forgotPassword',email)
}

export const verifyotp=(data)=>{
    return axios.post('/verify_otp',data)
}

export const resetpassword=(data)=>{
    return axios.post('/reset_password',data)
}

export const leadlist=(page ,size,data)=>{
    return axios.post(`/lead/list_lead?page=${page}&size=${size}`,data)
}

export const leadadd=(data)=>{
    return axios.post('/lead/create_lead',data);
}

export const leaddelete=(data)=>{
    return axios.post('/lead/delete_lead',data)
}

export const viewlead=(data)=>{
    return axios.post('/lead/view_lead',data)
}

export const updatelead=(data)=>{
    return axios.post('/lead/lead_update',data);
}

export const active=(data)=>{
    return axios.post('/lead/hot_lead',data);
}
export const leaddropdown=(data)=>{
   return axios.post('/dropdown/dropdownLead',data);
}

export const changestatus=(data)=>{
     return axios.post('/lead/changeLeadStatus',data);
}

export const employeeleaddropdown=(data)=>{
    return axios.post('/dropdown/employeeDropDown',data);
}

export const dealerleaddropdown=(data)=>{
    return axios.post('/dropdown/userDropdown',data);
}

export const resendotp=(data)=>{
    return axios.post('/resend_otp',data);
}

export const reassign=(data)=>{
    return axios.post('/lead/lead_reassign',data)
}

export const enquriy=(data)=>{
    return axios.post('/dropdown/dropdownEnquiry',data);
}

export const compettior=(data)=>{
    return axios.post('/dropdown/dropdownCompetitor',data);
}

export const masterlist=(data,value,size,page)=>{
    return axios.post(`/masters/list_${value}?page=${page}&size=${size}`,data,value);
}
export const masteradd=(data,value)=>{
    return axios.post(`/masters/create_${value}`,data,value)
}

export const masterdelete=(data,value)=>{
    return axios.post(`/masters/delete_${value}`,data,value);
}

export const masterupdate=(data,value)=>{
    return axios.post(`/masters/update_${value}`,data,value);
}
export const dropdownrequirement=(data)=>{
    return axios.post('/dropdown/dropdownRequirements',data)
}
export const datamasterlist=(data,value)=>{
    return axios.post(`/masters/list_${value}`,data,value);
}