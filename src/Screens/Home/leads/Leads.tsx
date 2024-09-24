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
import { useToken } from "../../../utillity/hooks";
import { storeDataProps } from "../../../@types/Store";
import { leadListProps } from "../../../@types/Lead";
import ConfirmModal from "../Modals/leadmodal/ConfirmModal";

const text = <span>filter</span>;
const content = (
  <div>
 
  </div>
);
function Leads() {
  const token = useToken();
  const delete_lead = useSelector((state:storeDataProps) => state.auth.modal);
  const leadfilt = useSelector((state:storeDataProps) => state.auth.leadfiltbooleanvalue);
  const dispatch = useDispatch();
  const [List, setList] = useState<leadListProps[]>([]);
  const [userid, setuserid] = useState("");
  const [updatstatuserid, setUpdatestatuserid] = useState("");
  const [updateStatus, setUpdateStatus] = useState(false);
  const [Reassign, setRessign] = useState(false);
  const [activenumber, setActivenumber] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const[confirmmodal,setConfirmmodal]=useState<boolean>(false);
  const[isActivenumber,setisActivenumber]=useState<number>(0);
  const pageSize = 5;

  useEffect(() => {
    if (token) {
      list(currentPage,pageSize);
    }
  }, [token,  currentPage]);

  const list = (page = 1, size = pageSize ,filt={  leadId: "",
    leadCode: "",
    leadName: "",
    mobile: "",
    address: "",
    isActive: "",

  }) => {
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
    }).catch((res)=>{
      console.log("error");
    });
  };
  const isActiveonclick=(values:string,isActive:number)=>{
    setConfirmmodal(true);
    setActivenumber(values);
    setisActivenumber(isActive);

  }

 



  const navigate = useNavigate();
  const Addeduser = () => {
    dispatch(handleditmodal(false));
    navigate("/leadAdd");
  };

  const deleteddd = (values:string) => {
    dispatch(handlemodal(true));
    setuserid(values);
  };
  const edited = (userId:string) => {
    dispatch(handleuserid(userId));
    dispatch(handleditmodal(true));
    navigate("/leadAdd");
  };

  const status = (value:string) => {
    setUpdateStatus(true);
    setUpdatestatuserid(value);
  };
  const Reassignlead = (value:string) => {
    setRessign(true);
    setuserid(value);
  };
  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: "SNO",
      dataIndex: "sno",
      key: "sno",
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
      render: (text:string, record:leadListProps) => (
        <Tooltip placement="bottom" title={"Delete"}>
      
          <Image
            height={40}
            src={deleteimg}
            className="mx-auto"
            style={{ cursor: "pointer" }}
            // type="button"
            onClick={() => deleteddd(record.leadId)}
            preview={false}
          />
        </Tooltip>
      ),
    },
    {
      title: "edit",
      key: "action",
      render: (text:string, record:leadListProps) => (
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
            // type="button"
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
      render: (text:string, record:leadListProps) => (
        <Tooltip placement="bottom" title={"BookMark"}>
          <Image
            height={20}
            src={record.isActive === 1 ? filledbookmark : bookmark}
            className="mx-auto"
            style={{ cursor: "pointer" }}
            onClick={() =>
               isActiveonclick(record.leadId,record.isActive)
            }
            preview={false}
          />
        </Tooltip>
      ),
    },
    {
      title: "Status",
      key: "action",
      render: (text:string, record:leadListProps) => (
        <Tooltip placement="bottom" title={"update status"}>
          <Image
            height={40}
            src={updatestus}
            className="mx-auto"
            style={{ cursor: "pointer" }}
            // type="button"
            onClick={() => status(record.leadId)}
            preview={false}
          />
        </Tooltip>
      ),
    },
    {
      title: "Reassign",
      key: "action",
      render: (text:string, record:leadListProps) => (
        <Tooltip placement="bottom" title={"Reassign"}>
          <Image
            height={40}
            src={reassignphoto}
            className="mx-auto"
            style={{ cursor: "pointer" }}
            // type="button"
            onClick={() => Reassignlead(record.leadId)}
            preview={false}
          />
        </Tooltip>
      ),
    },
  ];

  const dataSource = List.map((ele, index) => ({
    sno: (currentPage - 1) * pageSize + (index + 1),
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
          
          <div className={classes.backgroundattarctive}>
      <h1>Leads</h1>
      <Row justify="end" className="float-end me-5 " gutter={[12, 16]} align="middle">
        <Col></Col>

   
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
              // type="button"
              className={`btn btn-danger ${classes.custombutton}`}
              onClick={Addeduser}
            >
              Add New
            </Button>
          </Tooltip>
        </Col>
      </Row>

      <Row className="mt-5 ms-5">{leadfilt && <FilterLead listapicall={list} currentPage={currentPage} />}</Row>

      <Table
  dataSource={dataSource}
  columns={columns}
  pagination={false}
  bordered

  rowClassName={(record) => (record.isActive == 1 ? 'active-row' : 'inactive-row')}
  className={`mt-2 table-responsive mx-auto ${classes.tablecontentstyling}`}
/>

      <Row className="ms-3 me-5 float-end p-5 ">
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
          currentPage={currentPage}
        />
      )}

      {Reassign && (
        <ReassignModal
          Reassign={Reassign}
          onclose={() => {
            setRessign(false);
          }}
          userid={userid}
          currentPage={currentPage}
          list={list}
        />
      )}
      {confirmmodal &&(<ConfirmModal activenumber={activenumber} isActivenumber={isActivenumber} confirmmodal={confirmmodal} setConfirmmodal={setConfirmmodal} list={list} currentPage={currentPage} />)}
    </div>
    </div>
  );
}

export default Leads;
