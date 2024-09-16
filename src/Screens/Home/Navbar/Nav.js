import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Row, Col } from "antd";
import {
  PieChartOutlined,
  TeamOutlined,
  ProfileOutlined,
  LogoutOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import verify from "../../../assests/MAestro__2_-removebg-preview.png";
import { Image } from "antd";
import masterimg from "../../../assests/manager (1).png";

function Nav() {
  const navigate = useNavigate();

  const Admin = () => navigate("/Admin");
  const dashboard = () => navigate("/dashboard");
  const employee = () => navigate("/employee");
  const dealer = () => navigate("/dealer");
  const logout = () => {
    localStorage.removeItem("userdata");
    navigate("/login");
  };
  const leads = () => navigate("/leads");
  const category = () => navigate("/category");
  const enquiry = () => navigate("/enquiry");
  const requirement = () => navigate("/requirement");

  const items = [
    {
      label: "Dashboard",
      key: "dashboard",
      icon: <PieChartOutlined style={{ color: "#ffffff" }} />,
    },
    {
      label: "User Management",
      key: "management",
      icon: <TeamOutlined style={{ color: "#ffffff" }} />,

      children: [
        {
          type: "group",

          children: [
            {
              label: "Admin",
              key: "setting:1",
              onClick: Admin,
              style: { color: "#ffffff" },
            },
            {
              label: "Employee",
              key: "setting:2",
              onClick: employee,
              style: { color: "#ffffff" },
            },
            {
              label: "Dealer",
              key: "setting:3",
              onClick: dealer,
            },
          ],
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
      label: "  Master",
      key: "Master",
      icon: <Image src={masterimg} preview={false} height={20} />,
      children: [
        {
          label: "Category",
          key: "setting:4",
          onClick: category,
          style: { color: "#ffffff" },
        },
        {
          label: "Enquiry",
          key: "setting:5",
          onClick: enquiry,
          style: { color: "#ffffff" },
        },
        {
          label: "Requirement",
          key: "setting:6",
          onClick: requirement,
        },
      ],
    },
    {
      label: "Logout",

      icon: <LogoutOutlined style={{ color: "" }} />,
      onClick: logout,
    },
  ];

  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Row style={{ backgroundColor: "#000", alignItems: "center" }}>
        <Col flex="100px">
          <Image src={verify} style={{ width: 110, height: 100 }} />
        </Col>
        <Col flex="auto" style={{ textAlign: "center" }}>
          <Menu
            onClick={onClick}
            mode="horizontal"
            items={items}
            style={{
              backgroundColor: "#000",
              color: "white",
              justifyContent: "left",
            }}
            theme="dark"
          />
        </Col>
      </Row>

      <Outlet />
    </>
  );
}

export default Nav;
