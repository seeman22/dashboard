import React, { useEffect, useState } from "react";
import { Table, Row, Col, message, Popover, Button } from "antd";
import classes from "../User_Management/Login.module.css";
import { Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  active,
  leaddelete,
  leadlist,
  viewlead,
} from "../../../axios/Services";
import {
  handleaddmodal,
  handleditmodal,
  handleleadfilt,
  handlemodal,
  handleuserid,
} from "../../../redux/reducers/AuthReducers";
import AddleadModal from "../Modals/leadmodal/AddleadModal";
import Deletelead from "../Modals/leadmodal/Deletelead";
import UpdateStatusModal from "../Modals/leadmodal/UpdateStatusModal";
import ReassignModal from "../Modals/leadmodal/ReassignModal";
import bookmark from "../../../assests/save-instagram.png";
import filledbookmark from "../../../assests/bookmark.png";
import { Image, Tooltip } from "antd";
import { DeleteFilled, EditFilled, UserAddOutlined } from "@ant-design/icons";
import reassignphoto from "../../../assests/employee (1).png";
import updatestus from "../../../assests/updated (1).png";
import { FilterFilled } from "@ant-design/icons";
import FilterLead from "./FilterLead";
import { handlefilter } from "../../../redux/reducers/AuthReducers";
import filterimg from "../../../assests/filter.png";
import resetimg from "../../../assests/reset.png";
import deleteimg from "../../../assests/delete (1).png";
import editimg from "../../../assests/user-avatar.png";
import { useNavigate } from "react-router-dom";

const text = <span>filter</span>;
const content = (
  <div>
    <FilterLead />
  </div>
);
function Leads() {
  const token = useSelector((state) => state.auth.token);
  const add = useSelector((state) => state.auth.addmodal);
  const edit = useSelector((state) => state.auth.editmodal);
  const delete_lead = useSelector((state) => state.auth.modal);
  const filt = useSelector((state) => state.auth.filter);
  const leadfilt = useSelector((state) => state.auth.leadfilt);
  const dispatch = useDispatch();
  const [List, setList] = useState([]);
  const [data, setData] = useState([]);
  const [userid, setuserid] = useState("");
  const [updatstatuserid, setUpdatestatuserid] = useState("");
  const [updateStatus, setUpdateStatus] = useState(false);
  const [Reassign, setRessign] = useState(false);
  const [activenumber, setActivenumber] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    if (token) {
      list(currentPage);
    }
  }, [token, filt, currentPage]);

  const list = (page = 1, size = pageSize) => {
    let formData = new FormData();
    formData.append("token", token);
    if (filt?.leadName) {
      formData.append("name", filt.leadName);
    }
    if (filt?.isActive) {
      formData.append("hot_lead", filt.isActive);
    }
    leadlist(page, size, formData).then((res) => {
      setList(res.data.data.items);
      setTotalItems(res.data.data.total_count);
      console.log("successfully listed");
    });
  };
  const isActive = (values) => {
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("leadId", values);
    formdata.append("isActive", 1);
    active(formdata)
      .then((res) => {
        message.success(res.data.msg);
        console.log("===>suceesss");
        list();
      })
      .catch(() => {
        {
          console.log("error");
        }
      });
  };
  const notpriotrty = (values) => {
    let formdata = new FormData();
    formdata.append("token", token);
    formdata.append("leadId", values);
    formdata.append("isActive", 0);
    active(formdata)
      .then((res) => {
        message.error(res.data.msg);
        console.log("===>suceesss");
        list();
      })
      .catch(() => {
        {
          console.log("error");
        }
      });
  };



  const navigate = useNavigate();
  const Addeduser = () => {
    dispatch(handleditmodal(false));
    navigate("/leadAdd");
  };

  const deleteddd = (values) => {
    dispatch(handlemodal(true));
    setuserid(values);
  };
  const edited = (userId) => {
    dispatch(handleuserid(userId));
    dispatch(handleditmodal(true));
    navigate("/leadAdd");
  };

  const status = (value) => {
    setUpdateStatus(true);
    setUpdatestatuserid(value);
  };
  const Reassignlead = (value) => {
    setRessign(true);
    setuserid(value);
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
      title: "leadId",
      dataIndex: "leadId",
      key: "leadId",
    },
    {
      title: "leadName",
      dataIndex: "leadName",
      key: "leadName",
    },
    {
      title: "mobile",
      dataIndex: "mobile",
      key: "mobile",
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "leadStatusName",
      dataIndex: "leadStatusName",
      key: "leadStatusName",
    },
    {
      title: "delete",
      key: "action",
      render: (text, record) => (
        <Tooltip placement="bottom" title={"Delete"}>
          {/* <DeleteFilled 
        type="button"
            className={classes.icon}
            onClick={() => deleteddd(record.leadId)} 
        /> */}
          <Image
            height={40}
            src={deleteimg}
            className="mx-auto"
            style={{ cursor: "pointer" }}
            type="button"
            onClick={() => deleteddd(record.leadId)}
            preview={false}
          />
        </Tooltip>
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
            onClick={() => edited(record.leadId)}
            preview={false}
          />
        </Tooltip>
      ),
    },
    {
      title: "isActive",
      dataIndex: "isActive",
      key: "isActive",
      render: (text, record) => (
        <Tooltip placement="bottom" title={"BookMark"}>
          <Image
            height={20}
            src={record.isActive === 1 ? filledbookmark : bookmark}
            className="mx-auto"
            style={{ cursor: "pointer" }}
            onClick={() =>
              record.isActive === 1
                ? notpriotrty(record.leadId)
                : isActive(record.leadId)
            }
            preview={false}
          />
        </Tooltip>
      ),
    },
    {
      title: "Status",
      key: "action",
      render: (text, record) => (
        <Tooltip placement="bottom" title={"update status"}>
          <Image
            height={40}
            src={updatestus}
            className="mx-auto"
            style={{ cursor: "pointer" }}
            type="button"
            onClick={() => status(record.leadId)}
            preview={false}
          />
        </Tooltip>
      ),
    },
    {
      title: "Reassign",
      key: "action",
      render: (text, record) => (
        <Tooltip placement="bottom" title={"Reassign"}>
          <Image
            height={40}
            src={reassignphoto}
            className="mx-auto"
            style={{ cursor: "pointer" }}
            type="button"
            onClick={() => Reassignlead(record.leadId)}
            preview={false}
          />
        </Tooltip>
      ),
    },
  ];

  const dataSource = List.map((ele, index) => ({
    sno: index + 1,
    leadId: ele.leadId,
    leadCode: ele.leadCode,
    leadName: ele.leadName,
    mobile: ele.mobile,
    address: ele.address,
    isActive: ele.isActive,
    leadStatusName: ele.leadStatusName,
  }));

  return (
    <div>
      <h1>Leads</h1>
      <Row justify="end" className="me-5 " gutter={[24, 16]} align="middle">
        <Col></Col>

        {/* <Image src={resetimg}   preview={false} height={40} className={ `${classes.icon}`}/> */}
        <Col>
          <Tooltip placement="bottom" title={"Filter"}>
            <Popover placement="bottomLeft">
              <FilterFilled
                className={`${classes.icon}`}
                onClick={() => dispatch(handleleadfilt(true))}
              />
            </Popover>
          </Tooltip>
        </Col>

        <Col>
          <Tooltip placement="bottom" title={"ADD Users"}>
            <Button
              type="button"
              className={`btn btn-danger ${classes.custombutton}`}
              onClick={Addeduser}
            >
              Add New
            </Button>
          </Tooltip>
        </Col>
      </Row>

      <Row className="mt-5">{leadfilt && <FilterLead />}</Row>

      <Row>
        <Col span={22}>
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
          total={totalItems}
          onChange={handlePageChange}
          style={{ textAlign: "center" }}
        />
      </Row>

      {delete_lead && (
        <Deletelead
          onclose={() => {
            dispatch(handlemodal(false));
          }}
          userid={userid}
          handledelete={() => {
            const formData = new FormData();
            formData.append("token", token);
            formData.append("leadId", userid);
            leaddelete(formData).then((res) => {
              message.success(res.data.msg);
              console.log("Deleted successfully");
              dispatch(handlemodal(false));
              list();
            });
          }}
          msg="Are you sure delete the leadId"
        />
      )}

      {/* {
              edit && (
                <AddleadModal userId={userid} list={list}/>
              )
            } */}

      {updateStatus && (
        <UpdateStatusModal
          updateStatus={updateStatus}
          onclose={() => {
            setUpdateStatus(false);
          }}
          list={list}
          updatstatuserid={updatstatuserid}
        />
      )}

      {Reassign && (
        <ReassignModal
          Reassign={Reassign}
          onclose={() => {
            setRessign(false);
          }}
          userid={userid}
        />
      )}
    </div>
  );
}

export default Leads;
