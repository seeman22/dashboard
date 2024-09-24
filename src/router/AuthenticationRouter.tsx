import { Navigate, Outlet } from "react-router-dom";
export const UserCheck=()=>{
    const auth=localStorage.getItem('userdata');
    
    return !auth ? <Outlet/>:<Navigate to={"/dashboard"} />

}
export const NotAllow=()=>{
    const auth=localStorage.getItem('userdata');
  
    return auth ? <Outlet/> : <Navigate to={"/login"} />
}