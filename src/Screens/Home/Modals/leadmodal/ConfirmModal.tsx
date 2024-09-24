import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal,message } from 'antd';
import { active } from '../../../../axios/Services';
import { useToken } from '../../../../utillity/hooks';

function ConfirmModal({activenumber, isActivenumber, confirmmodal,setConfirmmodal,list,currentPage}:{
    activenumber:string,
    isActivenumber:number,
    confirmmodal:boolean
    setConfirmmodal:React.Dispatch<React.SetStateAction<boolean>>
    list:(page:number,size:number)=>void,
    currentPage:number,
}) {
    const token=useToken();
    const isActive = (values:string,isActive:number) => {
        let formdata = new FormData();
        const isActiveValue : string = (isActive === 1 ? 0 : 1).toString()
        formdata.append("token", token);
        formdata.append("leadId", values);
        formdata.append("isActive", isActiveValue);
        active(formdata)
          .then((res) => {
            message.success(res.data.msg);
            console.log("===>suceesss");
    
          })
          .catch(() => {
            {
              console.log("error");
            }
          });

          setConfirmmodal(false);
          list(currentPage,5);
        }
        const handleOk = (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault(); 
            isActive(activenumber,isActivenumber);
          };
      const onclose=()=>{
        setConfirmmodal(false);
      }
  return (
    <div>

<Modal

title="confirm"
open={confirmmodal}
onCancel={onclose}
footer={[
  <Button key="back" onClick={onclose}>
 Cancel
  </Button>,
  <Button key="submit" type="primary"  onClick={handleOk}>
    confirm
  </Button>,

]}
>
    <p>{isActivenumber==0 ?"Are sure is this priority user":"Are sure is remove the priority user"}</p>

</Modal>
    </div>
  )
}

export default ConfirmModal