
import { Button, Modal,message } from 'antd';
import { handlemodal } from '../../../../redux/reducers/AuthReducers';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { masterdelete } from '../../../../axios/Services';
import { useToken } from '../../../../utillity/hooks';

export default function DeleteMasterModal({modaldelete,userid,parsedData,value,setDeleteModal,list}) {
  const token=useToken();
const dispatch=useDispatch();
    const onclose=()=>{
   dispatch(handlemodal(false));
    }
  const handledelete=()=>{
    let formdata=new FormData();
    formdata.append("token",token);
    formdata.append("dataId",userid);
  masterdelete(formdata,value).then((res)=>{
    message.success(res.data.msg);
    setDeleteModal(false);
    list();
  }).catch((res)=>{
    message.error(res.data.msg);
  })
  }

  return (
  <>
     <Modal

title="Delete"
open={modaldelete}
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
     <p>{"Are you sure delete the customer"}{userid}</p>

</Modal>
  </>
  )
}
