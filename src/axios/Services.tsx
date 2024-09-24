import instance from "./Axios";
import axios from "./Axios";

export const Loginpd = (loginid:FormData)=>{
    return axios.post("/login",loginid);
}

export const dashboard = (productid:FormData) => {
    return axios.post('dashboard/all_data_count', productid)
}

export const Adminsss=(page:number,size:number,data:FormData)=>{
    return axios.post(`/user/list_users?page=${page}&size=${size}`,data)
}

export const newadminsadd=(data:FormData)=>{
    return axios.post('/user/create_user',data)
}

export const handledelete=(data:FormData)=>{
    return axios.post('/user/delete_user',data)
}

export const viewuser=(data:FormData)=>{
    return axios.post('/user/view_user',data)
}

export const update=(data:FormData)=>{
    return axios.post('/user/update_user',data);
}
export const dropdown=(data:FormData)=>{
    return axios.post('/dropdown/employeeDropDown',data);
}

export const forgotpassword=(email:FormData)=>{
    return axios.post('/forgotPassword',email)
}

export const verifyotp=(data:FormData)=>{
    return axios.post('/verify_otp',data)
}

export const resetpassword=(data:FormData)=>{
    return axios.post('/reset_password',data)
}

export const leadlist=(page:number ,size:number,data:FormData)=>{
    return axios.post(`/lead/list_lead?page=${page}&size=${size}`,data)
}

export const leadadd=(data:FormData)=>{
    return axios.post('/lead/create_lead',data);
}

export const leaddelete=(data:FormData)=>{
    return axios.post('/lead/delete_lead',data)
}

export const viewlead=(data:FormData)=>{
    return axios.post('/lead/view_lead',data)
}

export const updatelead=(data:FormData)=>{
    return axios.post('/lead/lead_update',data);
}

export const active=(data:FormData)=>{
    return axios.post('/lead/hot_lead',data);
}
export const leaddropdown=(data:FormData)=>{
   return axios.post('/dropdown/dropdownLead',data);
}

export const changestatus=(data:FormData)=>{
     return axios.post('/lead/changeLeadStatus',data);
}

export const employeeleaddropdown=(data:FormData)=>{
    return axios.post('/dropdown/employeeDropDown',data);
}

export const dealerleaddropdown=(data:FormData)=>{
    return axios.post('/dropdown/userDropdown',data);
}

export const resendotp=(data:FormData)=>{
    return axios.post('/resend_otp',data);
}

export const reassign=(data:FormData)=>{
    return axios.post('/lead/lead_reassign',data)
}

export const enquriy=(data:FormData)=>{
    return axios.post('/dropdown/dropdownEnquiry',data);
}

export const compettior=(data:FormData)=>{
    return axios.post('/dropdown/dropdownCompetitor',data);
}

export const masterlist=(data:FormData,value:string,size:number,page:number)=>{
    return axios.post(`/masters/list_${value}?page=${page}&size=${size}`,data);
}
export const masteradd=(data:FormData,value:string)=>{
    return axios.post(`/masters/create_${value}`,data)
}

export const masterdelete=(data:FormData,value:string)=>{
    return axios.post(`/masters/delete_${value}`,data);
}

export const masterupdate=(data:FormData,value:string)=>{
    return axios.post(`/masters/update_${value}`,data);
}
export const dropdownrequirement=(data:FormData)=>{
    return axios.post('/dropdown/dropdownRequirements',data)
}
export const datamasterlist=(data:FormData,value:string)=>{
    return axios.post(`/masters/list_${value}`,data);
}
export const pichart=(data:FormData,page:number,size:number)=>{
    return axios.post(`/dashboard/dealer_wise_report?page=${page}&size=${size}`,data)
}