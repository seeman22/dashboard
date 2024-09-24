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
import { storeDataProps } from "../../../@types/Store";
import { masterenquiryfieldsProps, masterfiednameProps } from "../../../@types/master";

export default function Enquiry() {
  const token = useToken();
  const dispatch = useDispatch();
  const addnew = useSelector((state:storeDataProps) => state.auth.addmodal);
  const modaldelete = useSelector((state:storeDataProps) => state.auth.modal);
  const editupdate = useSelector((state:storeDataProps) => state.auth.editmodal);

  const [enquirylist, setEnquiryList] = useState<masterenquiryfieldsProps[]>([]);
  const [addmodal, setAddModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);
  const [searching, setSearching] = useState(false);
  const [userid, setUserid] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalitems, setTotalItems] = useState(0);


  const pageSize = 5;


useEffect(() => {
    if (token) {
      list(currentPage);
    }
  }, [token, currentPage,]);
  
  const list = (page = 1, size = 5 ,filt={
    name: "",
  }) => {
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

  const deleteddd = (value:string) => {
    setDeleteModal(true);
    setUserid(value);
  };
  const edited = (value:string) => {
    setUserid(value);
    setEditModal(true);
  };
  const handlecurrentpage = (page:number) => {
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
      render: (text:string, record:masterenquiryfieldsProps) => (
       
        <Image
          src={deleteimg}
          height={30}
          preview={false}
          // type="button"
          className={` ${classes.icon}`}
          onClick={() => deleteddd(record.enquireId)}
        />
      ),
    },
    {
      title: "edit",
      key: "action",
      render: (text:string, record:masterenquiryfieldsProps) => (
    
        <Image
          height={40}
          src={editimg}
          className="mx-auto"
          style={{ cursor: "pointer" }}
      
          onClick={() => edited(record.enquireId)}
          preview={false}
        />
      ),
    },
  ];


  const dataSource = enquirylist?.map((ele,index) => ({
    sno: (currentPage - 1) * pageSize + (index + 1),
    enquireId: ele.enquireId,
    enquireTypeName: ele.enquireTypeName,
  }));

  return (
<div className={classes.backgroundattarctive}>
      <h1 className="mt-2">Enquiry page</h1>

      <Row className="float-end mt-1 me-5" gutter={[8, 8]} align="middle">
        <Col>
          <Tooltip placement="bottom" title={"Filter"}>

            <FilterFilled
              className={`${classes.icon}`}
              onClick={() => {
                setSearching(true);
              }}
            />
          </Tooltip>
        </Col>

        <Button
     
          className={`btn btn-danger ${classes.custombutton}`}
          onClick={handleAdd}
        >
          Add New
        </Button>
      </Row>

      <Row className="mt-5 ms-5">
        {searching && (
          <FilterMaster searching={searching} setSearching={setSearching} listapicall={list} currentPage={currentPage} />
        )}
      </Row>
      <Table
  dataSource={dataSource}
  columns={columns}
  pagination={false}
  bordered
  className={`mt-2 table-responsive mx-auto ${classes.tablecontentstyling}`}
/>

      <Row className="me-5 float-end p-5 ">
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
          listdata={enquirylist}
          setAddmodal={setAddModal}
          list={list}
          userid={userid}
          seteditmodal={setEditModal}
          editupdate={editmodal}
            update="Enquiry"
           currentPage={currentPage}

        />
      )}
      {deletemodal && (
        <DeleteMasterModal
          value="enquire_type"
          modaldelete={deletemodal}
          setDeleteModal={setDeleteModal}
          list={list}
          userid={userid}
          parsedData={token}
          currentPage={currentPage}
        />
      )}
      {editmodal && (
        <AddModalMaster
          editupdate={editmodal}
          userid={userid}
          list={list}
          listdata={enquirylist}
          seteditmodal={setEditModal}
          setAddmodal={setAddModal}
          addnew={addmodal}
          value="enquiry_type"
           update="Enquiry"
           currentPage={currentPage}
      

        />
      )}
    </div>
  );
}
