import React, { useEffect, useState } from "react";
import { useToken } from "../../../utillity/hooks";
import { masterlist } from "../../../axios/Services";
import {
  Image,
  Table,
  Row,
  Col,
  Button,
  Pagination,
  Tooltip,
  Popover,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  handleaddmodal,
  handlemodal,
  handleditmodal,
  handlemasterfilt,
} from "../../../redux/reducers/AuthReducers";
import classes from "../master/Login.module.css";
import AddModalMaster from "../Modals/Mastermodal/AddModalMaster";
import editimg from "../../../assests/user-avatar.png";
import deleteimg from "../../../assests/delete (1).png";
import DeleteMasterModal from "../Modals/Mastermodal/DeleteMasterModal";
import { FilterFilled } from "@ant-design/icons";
import FilterMaster from "./FilterMaster";

export default function Enquiry() {
  const token = useToken();
  const dispatch = useDispatch();
  const addnew = useSelector((state) => state.auth.addmodal);
  const modaldelete = useSelector((state) => state.auth.modal);
  const editupdate = useSelector((state) => state.auth.editmodal);
  const leadfilt = useSelector((state) => state.auth.masterfilt);
  const filt = useSelector((state) => state.auth.filter);
  const [enquirylist, setEnquiryList] = useState([]);
  const [addmodal, setAddModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);
  const [searching, setSearching] = useState(false);
  const [userid, setUserid] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalitems, setTotalItems] = useState(0);


  const pageSize = 5;
//   console.log("====>", filt);

useEffect(() => {
    if (token) {
      list(currentPage);
    }
  }, [token, currentPage, filt]);
  
  const list = (page = 1, size = 5) => {
    let formData = new FormData();
    formData.append("token", token);
    if (filt?.name) {
      formData.append("name", filt.name);
    }
    const value = "enquiry_type";
    masterlist(formData, value, size, page)
      .then((res) => {
        setEnquiryList(res.data.data.items);
        setTotalItems(res.data.data.total_count);
      })
      .catch(() => {
        console.log("error listing");
      });
  };



  const handleAdd = () => {
    console.log("hi");
    setAddModal(true);
  };

  const deleteddd = (value) => {
    setDeleteModal(true);
    setUserid(value);
  };
  const edited = (value) => {
    setUserid(value);
    setEditModal(true);
  };
  const handlecurrentpage = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "SNO",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "enquireId",
      dataIndex: "enquireId",
      key: "enquireId",
    },
    {
      title: "enquireTypeName",
      dataIndex: "enquireTypeName",
      key: "enquireTypeName",
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
          onClick={() => deleteddd(record.enquireId)}
        />
      ),
    },
    {
      title: "edit",
      key: "action",
      render: (text, record) => (
        //     <Tooltip placement="bottom" title={"Edit"}>
        //  {/* <EditFilled
        //     type="button"
        //     className={classes.icon}
        //        onClick={() => edited(record.leadId)}
        //     /> */}
        <Image
          height={40}
          src={editimg}
          className="mx-auto"
          style={{ cursor: "pointer" }}
          type="button"
          onClick={() => edited(record.enquireId)}
          preview={false}
        />
      ),
    },
  ];

  // const dataSource=enquirylist?.map((ele)=>{
  //     enquireTypeName:ele.enquireTypeName,
  // })
  const dataSource = enquirylist?.map((ele,index) => ({
    sno: (currentPage - 1) * pageSize + (index + 1),
    enquireId: ele.enquireId,
    enquireTypeName: ele.enquireTypeName,
  }));
  console.log("===>", leadfilt);
  return (
    <div>
      <h1 className="mt-2">Enquiry page</h1>

      <Row className="float-end mt-1 me-5" gutter={[8, 8]} align="middle">
        <Col>
          <Tooltip placement="bottom" title={"Filter"}>
            {/* Removed Popover component */}
            <FilterFilled
              className={`${classes.icon}`}
              onClick={() => {
                setSearching(true);
              }}
            />
          </Tooltip>
        </Col>

        <Button
          type="button"
          className={`btn btn-danger ${classes.custombutton}`}
          onClick={handleAdd}
        >
          Add New
        </Button>
      </Row>

      <Row className="mt-5 ms-5">
        {searching && (
          <FilterMaster searching={searching} setSearching={setSearching} />
        )}
      </Row>
      <Row className="mt-3 ms-5 me-5">
        <Col span={24}>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            bordered
            className={`mt-2 ms-5 me-5`}
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
          value="enquiry"
          addnew={addmodal}
          setAddmodal={setAddModal}
          list={list}
        />
      )}
      {deletemodal && (
        <DeleteMasterModal
          value="enquire_type"
          modaldelete={deletemodal}
          setDeleteModal={setDeleteModal}
          list={list}
          userid={userid}
        />
      )}
      {editmodal && (
        <AddModalMaster
          editupdate={editmodal}
          userid={userid}
          list={list}
          seteditmodal={setEditModal}
          value="enquiry_type"
          valuesss="Enquiry"
        />
      )}
    </div>
  );
}
