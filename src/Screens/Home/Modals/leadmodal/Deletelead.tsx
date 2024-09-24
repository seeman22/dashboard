import React from 'react'
import { useSelector } from 'react-redux'
import { Button, Modal,message } from 'antd';
import { storeDataProps } from '../../../../@types/Store';

function Deletelead({handledelete,msg,userid,onclose}:{
  handledelete:()=>void,
  msg:string,
  userid:string,
  onclose:()=>void
}) {
    const modal=useSelector((state:storeDataProps)=>state.auth.modal);

  return (
    <div>
         <Modal

title="Delete"
open={modal}
onCancel={onclose}
footer={[
  <Button key="back" onClick={onclose}>
 Cancel
  </Button>,
  <Button key="submit" type="primary"  onClick={handledelete}>
    confirm
  </Button>,

]}
>
     <p>{msg}:  { userid}</p>

</Modal>
    </div>
  )
}

export default Deletelead