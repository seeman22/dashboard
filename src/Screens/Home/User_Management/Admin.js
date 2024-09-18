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

const text = <span>filter</span>;
const content = (
  <div>
    <Filter />
  </div>
);
function Admin() {
    const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const modal = useSelector((state) => state.auth.modal);
  const User_Id = useSelector((state) => state.auth.userid);
  const addnew = useSelector((state) => state.auth.addmodal);
  const search = useSelector((state) => state.auth.filter);
  const filtr = useSelector((state) => state.auth.filt);
  const usertype = "2";

  console.log(search);

  const [dta, setDta] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (token) {
      handlesub(currentPage);
    }
  }, [token, currentPage, search]);

  const handlesub = (page = 1, size = 2) => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("type", "2");
    if (search?.userName) {
      formData.append("username", search.userName);
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

  const deleteddd = (value) => {
    dispatch(handlemodal(true));
    dispatch(handleuserid(value));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "SNO",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        // <button
        //     type="button"
        //     className={`btn btn-primary ${classes.btnnnn}`}
        //     onClick={() => deleteddd(record.userId)}
        // >
        //     Delete
        // </button>
        <Image
          src={deleteimg}
          height={30}
          preview={false}
          type="button"
          className={` ${classes.icon}`}
          onClick={() => deleteddd(record.userId)}
        />
      ),
    },
  ];

  const dataSource = dta.map((ele,index) => ({
    sno: (currentPage - 1) * 2 + (index + 1),
    name: ele.name,
    userName: ele.userName,
    phoneNumber: ele.phoneNumber,
    userId: ele.userId,
  }));
  // const handlefilt=()=>{
  //     dispatch(handlefilt(true));
  // }

  return (
    <>
      <h1 className="mt-2">Admin page</h1>

      <Row className="float-end mt-2 me-5" gutter={[24, 16]} align="middle">
        <Col>
          <Popover placement="bottomLeft">
            <FilterFilled
              className={classes.icon}
              onClick={() => dispatch(handlefilt(true))}
            />
          </Popover>
        </Col>
        <Button
          type="button"
          className={`btn btn-danger ${classes.custombutton}`}
          onClick={handleAdd}
        >
          Add New
        </Button>
        <Col></Col>
      </Row>
      <Row className="mt-5">{filtr && <Filter />}</Row>

      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        className="mt-5 ms-5 me-5 p-2"
      />

      <Row className="mt-5  me-5 float-end p-5 ">
        <Pagination
          current={currentPage}
          pageSize={2}
          total={totalItems}
          onChange={handlePageChange}
          style={{ textAlign: "center" }}
        />
      </Row>

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
            formData.append("userId", User_Id);
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
    </>
  );
}

export default Admin;
