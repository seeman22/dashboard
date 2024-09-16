import { useSelector } from "react-redux"

export const useToken=()=>{
    let b= useSelector((state) => state.auth.token);
    console.log(b,"hooksss");

    return b
}