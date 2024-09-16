import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { useSelector } from "react-redux";
import {
  dealerleaddropdown,
  employeeleaddropdown,
  reassign,
} from "../../../../axios/Services";

const { Option } = Select;

function ReassignModal({ onclose, Reassign, userid }) {
  const token = useSelector((state) => state.auth.token);
  const [employeeDropDown, setEmployeeDropdown] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [dealerStatus, setDealerStatus] = useState(null);
  const [Dealerid, setDealerid] = useState([]);
  const [disableEmployeeDropdown, setDisableEmployeeDropdown] = useState(true);

  useEffect(() => {
    if (token) {
      let formData = new FormData();
      formData.append("token", token);
      formData.append("isDealer", 1);

      dealerleaddropdown(formData)
        .then((res) => {
          setDealerid(res.data.data);
        })
        .catch((err) => {
          console.log("Error fetching dealers:", err);
        });
    }
  }, [token]);

  useEffect(() => {
    if (token && dealerStatus) {
      let formData = new FormData();
      formData.append("token", token);
      formData.append("dealerId", dealerStatus);

      employeeleaddropdown(formData)
        .then((res) => {
          setEmployeeDropdown(res.data.data);
          setDisableEmployeeDropdown(false);
        })
        .catch((err) => {
          console.log("Error fetching employees:", err);
        });
    } else {
      setEmployeeDropdown([]);
      setDisableEmployeeDropdown(true);
    }
  }, [token, dealerStatus]);

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const handleDealerStatusChange = (value) => {
    setDealerStatus(value);
  };

  const reassignLead = () => {
    let formData = new FormData();
    formData.append("token", token);
    formData.append("leadId", userid);
    formData.append("employeeId", selectedStatus);
    formData.append("dealerId", dealerStatus);

    reassign(formData)
      .then((res) => {
        console.log("Lead reassigned successfully");
        onclose();
      })
      .catch((err) => {
        console.log("Error reassigning lead:", err);
      });
  };

  return (
    <>
      <Modal
        title="Reassign Lead"
        open={Reassign}
        onCancel={onclose}
        onOk={reassignLead}
      >
        <Form>
          <Form.Item label="Dealer">
            <Select
              name="Reassign"
              value={dealerStatus}
              onChange={handleDealerStatusChange}
              type="dropdown"
            >
              {Dealerid?.map((value) => {
                const nameOnly = value.userName.split("(")[0];
                return (
                  <Option key={value.userId} value={value.userId}>
                    {nameOnly.trim()}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>

          <Form.Item label="Employee">
            <Select
              name="Reassign"
              value={selectedStatus}
              onChange={handleStatusChange}
              type="dropdown"
              disabled={disableEmployeeDropdown}
            >
              {employeeDropDown?.map((value) => {
                const nameOnly = value.userName.split("(")[0];
                return (
                  <Option key={value.userId} value={value.userId}>
                    {nameOnly.trim()}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ReassignModal;
