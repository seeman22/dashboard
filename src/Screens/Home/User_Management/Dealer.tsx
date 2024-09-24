import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Adminsss, handledelete } from "../../../axios/Services";
import classes from "../User_Management/Login.module.css";
import { Table, Row, Col } from "antd";
import {
  handleaddmodal,
  handledealerid,
  handlemodal,
  handleuserid,
  handleuserType,
  handlefilter,
  handlefilt,
} from "../../../redux/reducers/AuthReducers";
import DeleteModal from "../Modals/DeleteModal";
import AddNew from "../Modals/AddNew";
import { viewuser } from "../../../axios/Services";
import { handleditmodal } from "../../../redux/reducers/AuthReducers";
import UpdateModal from "../Modals/UpdateModal";
import { Pagination } from "antd";
import { FilterFilled, UserAddOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Flex, Popover } from "antd";
import Filter from "./Filter";
import { Image, Tooltip } from "antd";
import filterimg from "../../../assests/filter.png";
import editimg from "../../../assests/user-avatar.png";

import deleteimg from "../../../assests/delete (1).png";
import { useToken } from "../../../utillity/hooks";
import { admindataProps, booleanvaluableProps } from "../../../@types/Admin";
import { formikvalueProps } from "../../../@types/ResetPassword";
import { searchingProps, searchProps } from "../../../@types/Filter";
import dealerimg from '../../../assests/dealer (1).png'

const text = <span>filter</span>;
const content = (
  <div>
    {/* <Filter /> */}
  </div>
);

function Dealer() {
  const token = useToken();
  const modal = useSelector((state:booleanvaluableProps) => state.auth.modal);
  const User_Id = useSelector((state:booleanvaluableProps) => state.auth.userid);
  const addnew = useSelector((state:booleanvaluableProps) => state.auth.addmodal);
  const editu = useSelector((state:booleanvaluableProps) => state.auth.editmodal);
  const search  = useSelector((state:searchingProps) => state.auth.filter);
  const filtr = useSelector((state:booleanvaluableProps) => state.auth.filt);
  const dispatch = useDispatch();
  const [dta, setDta] = useState<admindataProps[]>([]);
  const [userdata, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filtermodal,setFiltermodal]=useState<boolean>(false);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [userid, setuserid] = useState("");
  const usertype:string = "3";

  const handleAdd = () => {
    dispatch(handleaddmodal(true));
    dispatch(handleuserType("3"));
  };

<<<<<<< HEAD:src/Screens/Home/User_Management/Dealer.tsx
  const handlesub = (page = 1, size = 5,search={userName: "",
    dealerId: "",
    email: "",
    phoneNumber: ""}) => {
=======
  const handlesub = (page = 1, size = 2) => {
>>>>>>> 3a089786c4c01af5b00b0019b563a1994b49f940:src/Screens/Home/User_Management/Dealer.js
    let formData = new FormData();
    formData.append("token", token);
    formData.append("type", "3");
    if (search?.userName) {
      formData.append("username", search.userName);
    }
    if(search?.email){
      formData.append("email",search.email);
    }
    if(search?.phoneNumber){
      formData.append("phoneNumber",search.phoneNumber)
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
  const edit = (valuess:string) => {
    const formData = new FormData();
    formData.append("token", token);
    formData.append("userId", valuess);
    viewuser(formData).then((res) => {
      setData(res.data.data);
    });
    dispatch(handleditmodal(true));
    setuserid(valuess);
  };

  useEffect(() => {
    if (token) {
      handlesub(currentPage);
    }
  }, [token, currentPage, search]);

  const deleteddd = (value:string) => {
    dispatch(handlemodal(true));
    dispatch(handleuserid(value));
  };

  const handlePageChange = (page:number) => {
    setCurrentPage(page);
  };
  const handlereset = () => {
    dispatch(handlefilter({}));
  };
  const columns = [
    {
      title: "SNO",
      dataIndex: "sno",
      key: "sno",
<<<<<<< HEAD:src/Screens/Home/User_Management/Dealer.tsx
=======
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
>>>>>>> 3a089786c4c01af5b00b0019b563a1994b49f940:src/Screens/Home/User_Management/Dealer.js
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
      render: (text:any, record:{userId:string}) => (
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
    {
      title: "Action",
      key: "action",
      render: (text:any, record:{userId:string}) => (
        <Image
          src={editimg}
          height={30}
          preview={false}
          // type="button"
          className={` ${classes.icon}`}
          onClick={() => edit(record.userId)}
        />
      ),
    },
  ];

  const dataSource = dta.map((ele,index) => ({
<<<<<<< HEAD:src/Screens/Home/User_Management/Dealer.tsx
    sno: (currentPage - 1) * 5 + (index + 1),
=======
    sno: (currentPage - 1) * 2 + (index + 1),
>>>>>>> 3a089786c4c01af5b00b0019b563a1994b49f940:src/Screens/Home/User_Management/Dealer.js
    name: ele.name,
    userName: ele.userName,
    phoneNumber: ele.phoneNumber,
    userId: ele.userId,
  }));
console.log(search)
  return (
    <>

<div className={classes.backgroundattarctive}>
<Row justify="center" gutter={[16,16]}>
                <h1 className="">Dealer Page</h1>
                <Image
          src={dealerimg}
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
          // userdata={userdata}
          onclose={() => {
            dispatch(handleaddmodal(false));
          }}
          addnew={addnew}
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
            handledelete(formData).then(() => {
              console.log("Deleted successfully");
              dispatch(handlemodal(false));
              handlesub();
            });
          }}
          modal
        />
      )}

      {editu && (
        <UpdateModal
          userdata={userdata}
          onclose={() => {
            dispatch(handleditmodal(false));
          }}
          editu
           handlesub={handlesub}
          userid={userid}
      
        />
      )}
      </div>
    </>
  );
}

export default Dealer;
