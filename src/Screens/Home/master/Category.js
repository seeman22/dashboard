import useSelection from "antd/es/table/hooks/useSelection";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handledelete, masterlist } from "../../../axios/Services";
import editimg from "../../../assests/user-avatar.png";
import deleteimg from "../../../assests/delete (1).png";
import { Image, Table, Row, Col, Pagination } from "antd";
import classes from "../master/Login.module.css";
import { Button, ConfigProvider, Flex, Popover } from "antd";
import { Modal, Form, Input, Select } from "antd";
import {
  DeleteFilled,
  EditFilled,
  UserAddOutlined,
  FilterFilled,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import filterimg from "../../../assests/filter.png";
import {
  handleaddmodal,
  handlemodal,
  handleditmodal,
  handleleadfilt,
  handlemasterfilt,
} from "../../../redux/reducers/AuthReducers";
import AddModalMaster from "../Modals/Mastermodal/AddModalMaster";
import DeleteMasterModal from "../Modals/Mastermodal/DeleteMasterModal";
import { useToken } from "../../../utillity/hooks";
import FilterMaster from "./FilterMaster";

const text = <span>filter</span>;
const content = (
  <div>
    <p>hi</p>
  </div>
);

export default function Category() {
  const token = useToken();
  // console.log(token, "=====>token");
  const userdata = localStorage.getItem("userdata");
  //const parsedData = JSON.parse(userdata||"{}");
  const parsedData = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const addnew = useSelector((state) => state.auth.addmodal);
  const modaldelete = useSelector((state) => state.auth.modal);
  const editupdate = useSelector((state) => state.auth.editmodal);
  // const leadfilt=useSelector((state)=>state.auth.masterfilt);
  const filt = useSelector((state) => state.auth.filter);
  const [userid, setUserid] = useState("");
  const [addmodal, setAddmodal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);
  const [editmodal, seteditmodal] = useState(false);
  const [searching, setSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalitems, setTotalItems] = useState(0);
  const [listdata, setListdata] = useState([]);
  const pageSize = 5;

  useEffect(() => {
    if (parsedData) {
      list(currentPage);
    }
  }, [parsedData, currentPage, filt]);

  const list = (page = 1, size = 5) => {
    let formdata = new FormData();
    formdata.append("token", parsedData);
    if (filt?.name) {
      formdata.append("name", filt.name);
    }
    const value = "category";
    masterlist(formdata, value, size, page)
      .then((res) => {
        setListdata(res.data.data.items);
        setTotalItems(res.data.data.total_count);
      })
      .catch(() => {
        console.log("errror list category");
      });
  };


  const handleAdd = () => {
    setAddmodal(true);
  };
  const deleteddd = (value) => {
    setDeleteModal(true);
    setUserid(value);
  };
  const edited = (value) => {
    setUserid(value);
    seteditmodal(true);
  };
  const handlecurrentpage = (page) => {
    setCurrentPage(page);
  };

  console.log(editupdate);
  const columns = [
    {
      title: "customerCategoryId",
      dataIndex: "customerCategoryId",
      key: "customerCategoryId",
    },
    {
      title: "customerCategoryName",
      dataIndex: "customerCategoryName",
      key: "customerCategoryName",
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
          onClick={() => deleteddd(record.customerCategoryId)}
        />
      ),
    },
    {
      title: "edit",
      key: "action",
      render: (text, record) => (
        <Tooltip placement="bottom" title={"Edit"}>
          {/* <EditFilled 
            type="button"
            className={classes.icon}
               onClick={() => edited(record.leadId)} 
            /> */}
          <Image
            height={40}
            src={editimg}
            className="mx-auto"
            style={{ cursor: "pointer" }}
            type="button"
            onClick={() => edited(record.customerCategoryId)}
            preview={false}
          />
        </Tooltip>
      ),
    },
  ];

  const dataSource = listdata?.map((ele) => ({
    customerCategoryId: ele.customerCategoryId,
    customerCategoryName: ele.customerCategoryName,
  }));

  return (
    <>
      <h1 className="mt-2">Category page</h1>

      <Row className="float-end mt-1 me-5" gutter={[8, 8]} align="middle">
        <Col>
          <Tooltip placement="bottom" title={"Filter"}>
            <Popover placement="bottomLeft">
              <FilterFilled
                className={`${classes.icon}`}
                onClick={() => setSearching(true)}
              />
            </Popover>
          </Tooltip>
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

      <Row>
        {searching && (
          <FilterMaster searching={searching} setSearching={setSearching} />
        )}
      </Row>
      <Row className="mt-5 ms-5 me-5">
        <Col span={24}>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
            className={`mt-2 ms-5 `}
          />
        </Col>
      </Row>

      <Row className="mt-5  me-5 float-end p-5 ">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={totalitems}
          onChange={handlecurrentpage}
          style={{ textAlign: "center" }}
        />
      </Row>

      {addmodal && (
        <AddModalMaster
          addnew={addmodal}
          setAddmodal={setAddmodal}
          list={list}
          value="category"
        />
      )}

      {deletemodal && (
        <DeleteMasterModal
          modaldelete={deletemodal}
          userid={userid}
          setDeleteModal={setDeleteModal}
          list={list}
          parsedData={parsedData}
          value="customer_category"
        />
      )}

      {editmodal && (
        <AddModalMaster
          editupdate={editmodal}
          listdata={listdata}
          userid={userid}
          list={list}
          seteditmodal={seteditmodal}
          value="category"
          valuesss="category"
        />
      )}
    </>
  );
}
