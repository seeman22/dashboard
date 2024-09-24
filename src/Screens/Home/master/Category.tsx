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
import { storeDataProps } from "../../../@types/Store";
import { dataslistsetfieldnamesProps, mastercateogoryfieldsProps, masterfiednameProps } from "../../../@types/master";
import categoryimgicon from '../../../assests/categorization.png';

const text = <span>filter</span>;
const content = (
  <div>
    <p>hi</p>
  </div>
);

export default function Category() {
  const token = useToken();

  const userdata = localStorage.getItem("userdata");

  const dispatch = useDispatch();
  const addnew = useSelector((state:storeDataProps) => state.auth.addmodal);
  const modaldelete = useSelector((state:storeDataProps) => state.auth.modal);
  const editupdate = useSelector((state:storeDataProps) => state.auth.editmodal);


  const [userid, setUserid] = useState<string>("");
  const [addmodal, setAddmodal] = useState<boolean>(false);
  const [deletemodal, setDeleteModal] = useState<boolean>(false);
  const [editmodal, seteditmodal] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalitems, setTotalItems] = useState<number>(0);
  const [listdata, setListdata] = useState<mastercateogoryfieldsProps[]>([]);
  const pageSize = 5;

  useEffect(() => {
    if (token) {
      list(currentPage,5);
    }
  }, [token, currentPage,]);

  const list = (page = 1, size = 5,filt={
    name: "",
  }) => {
    let formdata = new FormData();
    formdata.append("token",token);
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
  const deleteddd = (value:string) => {
    setDeleteModal(true);
    setUserid(value);
  };
  const edited = (value:string) => {
    setUserid(value);
    seteditmodal(true);
  };
  const handlecurrentpage = (page:number) => {
    setCurrentPage(page);
  };

  console.log(editupdate);
  const columns = [
    {
      title: "Sno",
      dataIndex: "sno",
      key: "sno",
      width:20,
      // title: "SNO",
      // dataIndex: "sno",
      // key: "sno",
    },
    {
      title: "customerCategoryId",
      dataIndex: "customerCategoryId",
      key: "customerCategoryId",
    },
 
    {
      title: "Customer categoryname",
      dataIndex: "customerCategoryName",
      key: "customerCategoryName",
      width: 200
    },

    {
      title: "Delete",
      key: "action",
      width: 100,
      render: (text:string, record:mastercateogoryfieldsProps) => (
     
        <Image
          src={deleteimg}
          height={30}
          preview={false}
          // type="button"
          className={` ${classes.icon}`}
          onClick={() => deleteddd(record.customerCategoryId)}
        />
      ),
    },
    {
      title: "Edit",
      key: "action",
      width: 100,
      render: (text:string, record:mastercateogoryfieldsProps) => (
        <Tooltip placement="bottom" title={"Edit"}>
      
          <Image
            height={40}
            src={editimg}
            className="mx-auto"
            style={{ cursor: "pointer" }}
            // type="button"
            onClick={() => edited(record.customerCategoryId)}
            preview={false}
          />
        </Tooltip>
      ),
    },
  ];

  const dataSource = listdata?.map((ele,index) => ({
    sno: (currentPage - 1) * pageSize + (index + 1),
    customerCategoryId: ele.customerCategoryId,
    customerCategoryName: ele.customerCategoryName,
  }));

  return (
    <>
                   <div className={classes.backgroundattarctive}>
                   <Row justify="center" gutter={[16,16]}>
                <h1 className="">Category Page</h1>
                <Image
          src={categoryimgicon}
          height={50}
          preview={false}
 
        />
                
                </Row>

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
          // type="button"
          className={`btn btn-danger ${classes.custombutton}`}
          onClick={handleAdd}
        >
          Add New
        </Button>
        <Col></Col>
      </Row>

      <Row className="mt-5 ms-5">
        {searching && (
          <FilterMaster searching={searching} setSearching={setSearching} listapicall={list} currentPage={currentPage} />
        )}
      </Row>
      
      <Row className="mt-3 ms-5 me-5">
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

      <Table
  dataSource={dataSource}
  columns={columns}
  pagination={false}
  bordered
  className={`mt-2 table-responsive mx-auto ${classes.customtabless}`}
/>

{totalitems > 5 && (
  <Row className="me-5 float-end p-2 ">
    <Pagination
      current={currentPage}
      pageSize={pageSize}
      total={totalitems}
      onChange={handlecurrentpage}
      style={{ textAlign: "center" }}
    />
  </Row>
)}
      {addmodal && (
        <AddModalMaster
          addnew={addmodal}
          setAddmodal={setAddmodal}
          seteditmodal={seteditmodal}
          userid={userid}
          listdata={listdata}
          list={list}
          value="category"
          editupdate={editmodal}
          currentPage={currentPage}
               update="category"
        />
      )}

      {deletemodal && (
        <DeleteMasterModal
          modaldelete={deletemodal}
          userid={userid}
          setDeleteModal={setDeleteModal}
          list={list}
          parsedData={token}
          value="customer_category"
          currentPage={currentPage}
        />
      )}

      {editmodal && (
        <AddModalMaster
          editupdate={editmodal}
          userid={userid}
          listdata={listdata}
          list={list}
          seteditmodal={seteditmodal}
          value="category"
          addnew={addmodal}
          setAddmodal={setAddmodal}
          currentPage={currentPage}
          update="category"
        />
      )}
      </div>
    </>
  );
}
