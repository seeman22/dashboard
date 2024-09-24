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
import { storeDataProps } from "../../../@types/Store";
import { masterfiednameProps, masterrequirementfieldProps } from "../../../@types/master";
import requirementiconimg from '../../../assests/requirements.png'

function Requirement() {
  const token = useToken();
  const dispatch = useDispatch();
  const addnew = useSelector((state:storeDataProps) => state.auth.addmodal);
  const editupdate = useSelector((state:storeDataProps) => state.auth.editmodal);
  const modaldelete = useSelector((state:storeDataProps) => state.auth.modal);
  const filt = useSelector((state:masterfiednameProps) => state.auth.filter);
  const [requirementlist, setrequirementList] = useState<masterrequirementfieldProps[]>([]);
  const [addmodal, setAddModal] = useState<boolean>(false);
  const [editmodal, setEditModal] = useState<boolean>(false);
  const [deletemodal, setDeleteModal] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalitems, setTotalItems] = useState<number>(0);
  const [userid, setUserid] = useState<string>("");
  const pageSize = 5;

  useEffect(() => {
    if (token) {
      list(currentPage);
    }
  }, [token, currentPage, filt]);
  
  const list = (page = 1, size = pageSize,filt={
    name: "",
  }) => {
    let formData = new FormData();
    formData.append("token", token);
    if (filt?.name) {
      formData.append("name", filt.name);
    }
    const value = "requirements";
    masterlist(formData, value, size, page)
      .then((res) => {
        setrequirementList(res.data.data.items);
        setTotalItems(res.data.data.total_count);
      })
      .catch(() => {
        console.log("error listing");
      });
  };


  const handleAdd = () => {
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
      title: "Requirements name",
      dataIndex: "RequirementsName",
      key: "RequirementsName",
    },

    {
      title: "Delete",
      key: "action",
      render: (text:string, record:masterrequirementfieldProps) => (
        <Image
          src={deleteimg}
          height={30}
          preview={false}
          // type="button"
          className={` ${classes.icon}`}
          onClick={() => deleteddd(record.RequirementsId)}
        />
      ),
    },
    {
      title: "Edit",
      key: "action",
      render: (text:string, record:masterrequirementfieldProps) => (
        <Image
          height={40}
          src={editimg}
          className="mx-auto"
          style={{ cursor: "pointer" }}
          // type="button"
          onClick={() => edited(record.RequirementsId)}
          preview={false}
        />
      ),
    },
  ];

  const dataSource = requirementlist?.map((ele,index) => ({
    sno: (currentPage - 1) * pageSize + (index + 1),
    RequirementsId: ele.RequirementsId,
    RequirementsName: ele.RequirementsName,
  }));
  return (
<div className={classes.backgroundattarctive}>
<Row justify="center" gutter={[16,16]}>
                <h1 className="">Requirement Page</h1>
                <Image
          src={requirementiconimg}
          height={50}
          preview={false}
 
        />
                
                </Row>

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
      <Table
  dataSource={dataSource}
  columns={columns}
  pagination={false}

  bordered
  className={`mt-2 table-responsive mx-auto ${classes.tablecontentstyling}`}
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
          value="requirement"
          list={list}
          setAddmodal={setAddModal}
          addnew={addmodal}
          editupdate={editmodal}
          userid={userid}
          seteditmodal={setEditModal}
          listdata={requirementlist}
          update="requirements"
          currentPage={currentPage}
       
        />
      )}
      {deletemodal && (
        <DeleteMasterModal
          value="requirements"
          list={list}
          modaldelete={deletemodal}
          setDeleteModal={setDeleteModal}
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
          seteditmodal={setEditModal}
          value="requirements"
          setAddmodal={setAddModal}
          addnew={addmodal}
          listdata={requirementlist}
           update="requirements"
           currentPage={currentPage}
        />
      )}
    </div>
  );
}

export default Requirement;
