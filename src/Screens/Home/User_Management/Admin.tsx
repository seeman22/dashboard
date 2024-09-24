import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Adminsss, handledelete, newadminsadd } from "../../../axios/Services";
import classes from "../User_Management/Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Table, Row, Col, message } from "antd";
import {
  handleaddmodal,
  handlefilter,
  handlemodal,
  handleuserid,
  handleuserType,
  handlefilt,
} from "../../../redux/reducers/AuthReducers";
import DeleteModal from "../Modals/DeleteModal";
import AddNew from "../Modals/AddNew";
import { Pagination } from "antd";
import { FilterFilled } from "@ant-design/icons";
import { Button, ConfigProvider, Flex, Popover } from "antd";
import { Modal, Form, Input, Select } from "antd";
import { DeleteFilled, EditFilled, UserAddOutlined } from "@ant-design/icons";
import Filter from "./Filter";
import deleteimg from "../../../assests/delete (1).png";
import { Image, Tooltip } from "antd";
import filterimg from "../../../assests/filter.png";
import { useToken } from "../../../utillity/hooks";
import { admindataProps, booleanvaluableProps } from "../../../@types/Admin";
import { FormValues, searchingProps } from "../../../@types/Filter";
import adminimg from '../../../assests/admin.png'

const text = <span>filter</span>;
const content = (
  <div>
    {/* <Filter /> */}
  </div>
);
function Admin() {
    const dispatch = useDispatch();
  const token = useToken();
  const modal = useSelector((state: booleanvaluableProps) => state.auth.modal);
  const User_Id = useSelector((state: booleanvaluableProps) => state.auth.userid);
  const addnew = useSelector((state: booleanvaluableProps) => state.auth.addmodal);
  const filtr = useSelector((state: booleanvaluableProps) => state.auth.filt);

  const usertype = "2";

 

  const [dta, setDta] = useState<admindataProps[]>([]);
  const [filtermodal,setFiltermodal]=useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    if (token) {
      handlesub(currentPage);
    }
  }, [token, currentPage]);

  const handlesub = (page = 1, size = 5,search={userName: "",
    dealerId: "",
    email: "",
    phoneNumber: ""}) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("type", "2");
    if (search?.userName) {
      formData.append("username", search.userName);
    }
    if(search?.email){
      formData.append("email",search.email);
    }
    if(search?.phoneNumber){
      formData.append("phoneNumber",search.phoneNumber);
    }

    Adminsss(page, size, formData)
      .then((res) => {
        setDta(res.data.data.items);
        setTotalItems(res.data.data.total_count);
      })
      .catch((error) => {
        console.error(
          "Error response:",
          error.response ? error.response.data : error.message
        );
      });
  };



  const handleAdd = () => {
    dispatch(handleaddmodal(true));
    dispatch(handleuserType("2"));
  };

  const deleteddd = (value:string) => {
    dispatch(handlemodal(true));
    dispatch(handleuserid(value));
  };

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "Sno",
      dataIndex: "sno",
      key: "sno",
    },

    {
      title: "Username",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },

    {
      title: "Action",
      key: "action",
      render: ( record:{userId:string}) => (
    
        <Image
          src={deleteimg}
          height={30}
          preview={false}
          // type="button"
          className={` ${classes.icon}`}
          onClick={() => deleteddd(record.userId)}
        />
      ),
    },
  ];
  console.log(dta);

  const dataSource = dta.map((ele,index) => ({
    sno: (currentPage - 1) * 5 + (index + 1),
    name: ele.name,
    userName: ele.userName,
    phoneNumber: ele.phoneNumber,
    userId: ele.userId,


  }));

console.log(User_Id)
  return (
    <>
              <div className={classes.backgroundattarctive}>
                <Row justify="center" gutter={[16,16]}>
                <h1 className="">Admin Page</h1>
                <Image
          src={adminimg}
          height={50}
          preview={false}
 
        />
                
                </Row>
     

      <Row className="float-end mt-2 me-5" gutter={[24, 16]} align="middle">
        <Col>
          <Popover placement="bottomLeft">
            <FilterFilled
              className={classes.icon}
              onClick={() =>setFiltermodal(true)}
            />
          </Popover>
        </Col>
        <Button
          // type="button"
          className={`btn btn-danger ${classes.custombutton}`}
          onClick={handleAdd}
        >
          Add New
        </Button>
        <Col></Col>
      </Row>
      <Row className="mt-5 ms-5">{filtermodal && <Filter filtermodal={filtermodal} setFiltermodal={setFiltermodal} listapicall={handlesub} currentPage={currentPage}/>}</Row>

     
      <Table
  dataSource={dataSource}
  columns={columns}
  pagination={false}
  bordered
  className={`mt-2 table-responsive mx-auto ${classes.tablecontentstyling}`}
  
/>
{totalItems > 5 && (
  <Row className="me-5 float-end p-2 ">
    <Pagination
      current={currentPage}
      pageSize={5}
      total={totalItems}
      onChange={handlePageChange}
      style={{ textAlign: "center" }}
    />
  </Row>
)}
    

      {addnew && (
        <AddNew
          onclose={() => {
            dispatch(handleaddmodal(false));
          }}
          addnew
          handlesub={handlesub}
          usertype={usertype}
        />
      )}

      {modal && (
        <DeleteModal
          msg={"Are you sure to delete the User_Id: "}
          onclose={() => {
            dispatch(handlemodal(false));
          }}
          userId={User_Id}
          handledelete={() => {
            const formData = new FormData();
            formData.append("token", token);
            formData.append("userId",String(User_Id));
            handledelete(formData)
              .then((res) => {
                message.success(res.data.msg);
                dispatch(handlemodal(false));
                handlesub();
              })
              .catch((res) => {
                message.error(res.data.msg);
              });
          }}
          modal
        />
      )}
      </div>
    </>
  );
}

export default Admin;
