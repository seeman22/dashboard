import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Row, Col, Image } from "antd";
import {
  PieChartOutlined,
  TeamOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import verify from "../../../assests/MAestro__2_-removebg-preview.png";
import masterimg from "../../../assests/manager (1).png";
import classes from '../User_Management/Login.module.css';

type MenuItem = {
  key: string;
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  children?: MenuItem[];
  disabled?: boolean; 
};

function Nav() {
  const navigate = useNavigate();

  const Admin = () => navigate("/Admin");
  const dashboard = () => navigate("/dashboard");
  const employee = () => navigate("/employee");
  const dealer = () => navigate("/dealer");
  const logout = () => {
    localStorage.removeItem("userdata");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userType");
    navigate("/login");
  };
  const leads = () => navigate("/leads");
  const category = () => navigate("/category");
  const enquiry = () => navigate("/enquiry");
  const requirement = () => navigate("/requirement");
  const userType=sessionStorage.getItem("userType");
  const key = sessionStorage.getItem("select_key")
  console.log(key);
  const items: MenuItem[] = [
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <PieChartOutlined style={{ color: "white" }} />,
      onClick: dashboard,
    },
    {
      label: "User Management",
      key: "management",
      icon: <TeamOutlined style={{ color: "#ffffff" }} />,
      children: [
  
        {
          label: "Admin",
          key: "setting:1",
          onClick: Admin,
          disabled: userType === "3",
        },
        {
          label: "Employee",
          key: "setting:2",
          onClick: employee,
        },
        {
          label: "Dealer",
          key: "setting:3",
          onClick: dealer,
          disabled: userType === "3",
        },
      ],
    },
    {
      label: "Lead",
      key: "lead",
      icon: <ProfileOutlined style={{ color: "#ffffff" }} />,
      onClick: leads,
    },
    {
      label: "Master",
      key: "Master",
      icon: <Image src={masterimg} preview={false} height={20} />,
      children: [
        {
          label: "Category",
          key: "setting:4",
          onClick: category,
          disabled: userType === "3",
        },
        {
          label: "Enquiry",
          key: "setting:5",
          onClick: enquiry,
          disabled: userType === "3",
        },
        {
          label: "Requirement",
          key: "setting:6",
          onClick: requirement,
          disabled: userType === "3",
        },
      ],
    },
    {
      label: "Logout",
      key: "logout",
      icon: <LogoutOutlined style={{ color: "#ffffff" }} />,
      onClick: logout,
    },
  ];


  const handleSelect=({key}:{key:string})=>{
    sessionStorage.setItem("select_key",key);
  }
  if(key==="logout"){
    const dash="dashboard"
    sessionStorage.setItem("select_key",dash);
  }

  return (
    <>
      <Row style={{ backgroundColor: "#000", alignItems: "center" }}>
        <Col flex="100px">
          <Image src={verify} style={{ width: 110, height: 100 }} />
        </Col>
        <Col flex="700px" style={{ textAlign: "center" }}>
          <Menu
     
            mode="horizontal"
            items={items}
            className={classes.navbarmenus}
            theme="dark"
            onSelect={handleSelect}
            defaultSelectedKeys={[String(key)]}
          />
        </Col>
      </Row>

      <div className={classes.navbarmenusresponsive}>

        <Outlet />
      </div>
    </>
  );
}

export default Nav;
