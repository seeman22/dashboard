import React, { useEffect, useState } from 'react'
import { Table, Row,Col ,message} from 'antd';
import classes from '../User_Management/Login.module.css';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { active, leaddelete, leadlist, viewlead } from '../../../axios/Services';
import { handleaddmodal, handleditmodal, handlemodal } from '../../../redux/reducers/AuthReducers';
import AddleadModal from '../Modals/leadmodal/AddleadModal';
import Deletelead from '../Modals/leadmodal/Deletelead';
import UpdateStatusModal from '../Modals/leadmodal/UpdateStatusModal';
import ReassignModal from '../Modals/leadmodal/ReassignModal';
import bookmark from '../../../assests/save-instagram.png';
import filledbookmark from '../../../assests/bookmark.png';
import { Image } from 'antd';
import { DeleteFilled ,EditFilled } from '@ant-design/icons';
import reassignphoto from '../../../assests/refresh.png';
import updatestus from'../../../assests/updated (1).png';
import {FilterFilled} from '@ant-design/icons';


function Leads() {
const token=useSelector((state)=>state.auth.token);
const add=useSelector((state)=>state.auth.addmodal);
const edit = useSelector((state) => state.auth.editmodal)
const delete_lead=useSelector((state)=>state.auth.modal);
const dispatch=useDispatch();
const[List,setList]=useState([]);
const [data ,setData]=useState([]);
const [userid,setuserid]=useState('');
const [updatstatuserid,setUpdatestatuserid]=useState('');
const [updateStatus,setUpdateStatus]=useState(false);
const [Reassign,setRessign]=useState(false)
const [activenumber,setActivenumber]=useState('');


  const list=(page=1,size=10)=>{
    let formData=new FormData();
    formData.append("token",token)
    leadlist(page,size,formData).then((res)=>{
      setList(res.data.data.items)
      console.log("successfully listed");
    })
  }
  const isActive=(values)=>{
    let formdata =new FormData();
    formdata.append("token",token);
    formdata.append("leadId",values);
    formdata.append("isActive",1)
    active(formdata).then((res)=>{
      message.success(res.data.msg)
     console.log("===>suceesss")
     list();
    }).catch(()=>{{
      console.log("error")
    }})
     
  }
  const notpriotrty=(values)=>{
    let formdata =new FormData();
    formdata.append("token",token);
    formdata.append("leadId",values);
    formdata.append("isActive",0)
    active(formdata).then((res)=>{
      message.error(res.data.msg)
     console.log("===>suceesss")
     list();
    }).catch(()=>{{
      console.log("error")
    }})
  }

  useEffect(()=>{
    if(token){
      list();
    }
  },[token])


  const Addeduser=()=>{
  dispatch(handleaddmodal(true));
  console.log("true");
  }

  const deleteddd=(values)=>{
    dispatch(handlemodal(true));
    setuserid(values)

  }
  const edited=(userId)=>{
    setuserid(userId)
    dispatch(handleditmodal(true));
  }

  const status=(value)=>{
   setUpdateStatus(true);
   setUpdatestatuserid(value)
  }
  const Reassignlead=(value)=>{
   setRessign(true);
   setuserid(value);
  }

  const columns = [
    {
        title: 'leadId',
        dataIndex: 'leadId',
        key: 'leadId',
    },
    {
        title: 'leadCode',
        dataIndex: 'leadCode',
        key: 'leadCode',
    },
    {
        title: 'leadName',
        dataIndex: 'leadName',
        key: 'leadName',
    },
    {
        title: 'mobile',
        dataIndex: 'mobile',
        key: 'mobile',
    },
    {
      title: 'address',
      dataIndex: 'address',
      key: 'address',
  },
  {
    title: 'delete',
    key: 'action',
    render: (text, record) => (
    
        <DeleteFilled 
        type="button"
            className={classes.icon}
            onClick={() => deleteddd(record.leadId)} 
        />
    ),
},
{
  title: 'edit',
  key: 'action',
  render: (text, record) => (
    
      <EditFilled 
      type="button"
      className={classes.icon}
         onClick={() => edited(record.leadId)} 
      />
  ),
},
{
  title: 'isActive',
  dataIndex: 'isActive',
  key: 'isActive',
  render: (text, record) => (
    <Image
      height={20}
      src={record.isActive === 1 ? filledbookmark : bookmark}
      className="mx-auto"
      style={{ cursor: 'pointer' }}
      onClick={() => record.isActive === 1 ? notpriotrty(record.leadId) : isActive(record.leadId)}
      preview={false} 
    />
  ),
},                                                
{
  title: 'Status',
  key: 'action',
  render: (text, record) => (
    
      <Image
      height={40}
      src={updatestus}
      className="mx-auto"
      style={{ cursor: 'pointer' }}
       type="button"
     onClick={() => status(record.leadId)} 
      preview={false} 
    />
  ),
},
{
  title: 'Reassign',
  key: 'action',
  render: (text, record) => (
     
      <Image
      height={20}
      src={reassignphoto}
      className="mx-auto"
      style={{ cursor: 'pointer' }}
       type="button"
     onClick={() => Reassignlead(record.leadId)} 
      preview={false} 
    />
  ),
},
{
  title: 'leadStatusName',
  dataIndex: 'leadStatusName',
  key: 'leadStatusName',
}
 
];

const dataSource = List.map((ele) => ({
  leadId: ele.leadId,
  leadCode: ele.leadCode,
  leadName: ele.leadName,
  mobile: ele.mobile,
  address:ele.address,
  isActive:ele.isActive,
  leadStatusName:ele.leadStatusName

}));

  return (
    <div>
      <h1>Leads</h1>
      <Row>
        <Col span={22}>
        <Table dataSource={dataSource} columns={columns}  pagination={false} bordered   className={`mt-5 ms-5 `}/>
        </Col>

      </Row>
      <Row className="row float-end mt-3 me-5">
                <button type="button" className={`btn btn-primary ${classes.btnnnn}`} onClick ={Addeduser}>
                    Add New
                </button>
            </Row>

            {add && (
              <AddleadModal
             userid={userid}
             list={list} />
            )}

            {delete_lead &&(
              <Deletelead    onclose={()=>{
                dispatch(handlemodal(false));
                    }}  userid={userid}  handledelete={()=>{
                       const formData = new FormData();
                       formData.append("token", token);
                       formData.append('leadId',userid);
                       leaddelete(formData).then((res) => {
                        message.success(res.data.msg);
                           console.log('Deleted successfully');
                           dispatch(handlemodal(false));
                           list();
                       });
                    }} msg="Are you sure delete the leadId"/>
            )}

            {
              edit && (
                <AddleadModal userId={userid} list={list}/>
              )
            }

            {
              updateStatus&&(
                <UpdateStatusModal updateStatus={updateStatus} onclose={()=>{
                  setUpdateStatus(false);
                }} list={list} updatstatuserid={updatstatuserid}/>
              )
            }

            {
              Reassign &&(
                <ReassignModal  Reassign={Reassign} onclose={()=>{
                  setRessign(false);
                }} userid={userid}/>
              )
            }
             
    </div>
  )
}

export default Leads