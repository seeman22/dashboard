import { useToken } from "../../../utillity/hooks";
import { useEffect, useState } from "react";
import { masterlist } from "../../../axios/Services";
import editimg from "../../../assests/user-avatar.png";
import deleteimg from "../../../assests/delete (1).png";
import classes from "../master/Login.module.css";
import { Image, Table, Row, Col, Button, Pagination, Popover } from "antd";
import { useDispatch } from "react-redux";
import {
  handleaddmodal,
  handleditmodal,
  handlemodal,
} from "../../../redux/reducers/AuthReducers";
import { useSelector } from "react-redux";
import AddModalMaster from "../Modals/Mastermodal/AddModalMaster";
import DeleteMasterModal from "../Modals/Mastermodal/DeleteMasterModal";
import { FilterFilled } from "@ant-design/icons";
import FilterMaster from "./FilterMaster";

function Requirement() {
  const token = useToken();
  const dispatch = useDispatch();
  const addnew = useSelector((state) => state.auth.addmodal);
  const editupdate = useSelector((state) => state.auth.editmodal);
  const modaldelete = useSelector((state) => state.auth.modal);
  const filt = useSelector((state) => state.auth.filter);
  const [enquirylist, setEnquiryList] = useState([]);
  const [addmodal, setAddModal] = useState(false);
  const [editmodal, setEditModal] = useState(false);
  const [deletemodal, setDeleteModal] = useState(false);
  const [searching, setSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalitems, setTotalItems] = useState(0);
  const [userid, setUserid] = useState("");
  const pageSize = 5;

  useEffect(() => {
    if (token) {
      list(currentPage);
    }
  }, [token, currentPage, filt]);
  
  const list = (page = 1, size = pageSize) => {
    let formData = new FormData();
    formData.append("token", token);
    if (filt?.name) {
      formData.append("name", filt.name);
    }
    const value = "requirements";
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
      title: "enquireTypeName",
      dataIndex: "RequirementsId",
      key: "RequirementsId",
    },
    {
      title: "RequirementsName",
      dataIndex: "RequirementsName",
      key: "RequirementsName",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Image
          src={deleteimg}
          height={30}
          preview={false}
          type="button"
          className={` ${classes.icon}`}
          onClick={() => deleteddd(record.RequirementsId)}
        />
      ),
    },
    {
      title: "edit",
      key: "action",
      render: (text, record) => (
        <Image
          height={40}
          src={editimg}
          className="mx-auto"
          style={{ cursor: "pointer" }}
          type="button"
          onClick={() => edited(record.RequirementsId)}
          preview={false}
        />
      ),
    },
  ];

  const dataSource = enquirylist?.map((ele) => ({
    RequirementsId: ele.RequirementsId,
    RequirementsName: ele.RequirementsName,
  }));
  return (
    <div>
      <h1 className="mt-2">Requirement page</h1>

      <Row className="float-end mt-1 me-5" gutter={[8, 8]} align="middle">
        <Col>
          <Popover placement="bottomLeft">
            <FilterFilled
              className={`${classes.icon}`}
              onClick={() => setSearching(true)}
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
          value="requirement"
          list={list}
          setAddmodal={setAddModal}
          addnew={addmodal}
        />
      )}
      {deletemodal && (
        <DeleteMasterModal
          value="requirements"
          list={list}
          modaldelete={deletemodal}
          setDeleteModal={setDeleteModal}
          userid={userid}
        />
      )}

      {editmodal && (
        <AddModalMaster
          editupdate={editmodal}
          userid={userid}
          list={list}
          seteditmodal={setEditModal}
          value="requirements"
          valuesss="requirements"
        />
      )}
    </div>
  );
}

export default Requirement;
