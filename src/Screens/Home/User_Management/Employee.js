import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Adminsss, handledelete} from '../../../axios/Services';
import classes from '../User_Management/Login.module.css';
import { Table, Row ,Col} from 'antd';
import { handleaddmodal, handlemodal, handleuserid,handledealerid, handleuserType } from '../../../redux/reducers/AuthReducers';
import DeleteModal from '../Modals/DeleteModal';
import AddNew from '../Modals/AddNew';
import { viewuser } from '../../../axios/Services';
import { handleditmodal,handlefilter } from '../../../redux/reducers/AuthReducers';
import UpdateModal from '../Modals/UpdateModal';
import { Pagination } from 'antd';
import {FilterFilled} from '@ant-design/icons';
import { Button, ConfigProvider, Flex, Popover } from 'antd';
import Filter from './Filter';



const text = <span>filter</span>;
const content = (
  <div>
   <Filter/>
  </div>
);
function Employee() {
    const token = useSelector((state) => state.auth.token);
    const modal=useSelector((state)=> state.auth.modal);
   const User_Id=useSelector((state)=> state.auth.userid);
   const addnew=useSelector((state)=>state.auth.addmodal);
   const editu=useSelector((state)=> state.auth.editmodal)
    const dispatch=useDispatch();
    const [dta, setDta] = useState([]);
    const [userdata,setData]=useState([]);
    const [currentPage, setCurrentPage] = useState(1); 
    const [totalItems, setTotalItems] = useState(0);
    const search=useSelector((state)=>state.auth.filter) 
    const [userid,setuserid]=useState('');
    const usertype='4'



    const handleAdd = () => {
    dispatch(handleaddmodal(true));
    dispatch(handleuserType('4'));
    };

   

   
    const handlesub = (page=1,size=2) => {
        let formData = new FormData();
        formData.append('token', token);
        formData.append('type', '4');
        if (search?.userName) {
            formData.append("username", search.userName);
          }
        Adminsss(page, size, formData)
            .then((res) => {
                setDta(res.data.data.items);
                setTotalItems(res.data.data.total_count); 

            })
            .catch((error) => {
                console.error('Error response:', error.response ? error.response.data : error.message);
            });
    };
    const edit=(valuess)=>{
    
        const formData = new FormData();
        formData.append("token", token);
        formData.append('userId',valuess);
        viewuser(formData).then((res)=>{
          setData(res.data.data);

        })
       dispatch(handleditmodal(true));
       setuserid(valuess);
       console.log(editu);
    }

    

    useEffect(() => {
        if (token) {
            handlesub(currentPage);
        }
    }, [token,currentPage,search]);

    const deleteddd = (value) => {
        dispatch(handlemodal(true));
        dispatch(handleuserid(value));
    }
    
    const handlePageChange = (page) => {
        setCurrentPage(page); 
    };
    const handlereset=()=>{
        dispatch(handlefilter({}));

    }


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Username',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'User ID',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <button
                    type="button"
                    className={`btn btn-primary ${classes.btnnnn}`}
                    onClick={() => deleteddd(record.userId)} 
                >
                    Delete
                </button>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <button
                    type="button"
                    className={`btn btn-primary ${classes.btnnnnn}`}
                    onClick={() => edit(record.userId)} 
                >
                    edit
                </button>
            ),
        }
    ];

    const dataSource = dta.map((ele) => ({
        name: ele.name,
        userName: ele.userName,
        phoneNumber: ele.phoneNumber,
        userId: ele.userId,
    }));

    return (
        <>

<h1 className='mt-2'>Employee page</h1>

<Row className='float-end mt-2 me-5' gutter={[16,16]} >
            <Col>
            <Button  className={classes.btnnnn}  onClick={handlereset}>reset</Button>
            </Col>
       <Col>
       <Popover placement="bottomLeft" title={text} content={content}>
       <FilterFilled className={classes.icon} />
        </Popover>
       </Col>
 

        </Row>
            <Table dataSource={dataSource} columns={columns} pagination={false} rowKey="userId" className="mt-5 ms-5 me-5"/>
            <Row className="row float-end mt-5 me-5">
                <button type="button" className={`btn btn-primary ${classes.btnnnn}`} onClick={handleAdd}>
                    Add New
                </button>
            </Row>
            <Row     className="mt-5  me-5 float-end p-5 ">
<Pagination
         
                current={currentPage}
                pageSize={2} 
                total={totalItems} 
                onChange={handlePageChange}
                style={{ textAlign: 'center' }} 
            />
</Row>
           
            {addnew && (
                
                <AddNew  onclose={()=>{
     dispatch(handleaddmodal(false));
         }} addnew handlesub={handlesub} usertype={usertype}/>)}



         {modal &&(<DeleteModal msg={"Are you sure to delete the User_Id: "} onclose={()=>{
     dispatch(handlemodal(false));
         }}  userId={User_Id}  handledelete={()=>{
            const formData = new FormData();
            formData.append("token", token);
            formData.append('userId',User_Id);
            handledelete(formData).then(() => {
                console.log('Deleted successfully');
                dispatch(handlemodal(false));
                handlesub();
            });
         }} modal/>)} 

{editu && (
    <UpdateModal userdata={userdata} onclose={()=>{
        dispatch(handleditmodal(false));
            }} editu handlesub={handlesub} userid={userid} handles={handlesub} />
)}

        </>
    );
}

export default Employee;
