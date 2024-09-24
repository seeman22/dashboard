import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Select } from "antd";
import { dealerleaddropdown, employeeleaddropdown, reassign } from "../../../../axios/Services";
import { useToken } from "../../../../utillity/hooks";
import { DealeriddropdownProps, EmployeedropdownProps } from "../../../../@types/ReassignModal";

const { Option } = Select;

function ReassignModal({
  onclose,
  Reassign,
  userid,
  list,
  currentPage,
}: {
  onclose: () => void;
  Reassign: boolean;
  userid: string;
  currentPage: number;
  list: (page: number, size: number) => void;
}) {
  const token = useToken();
  const userType = sessionStorage.getItem("userType");
  const userdealerid :string=sessionStorage.getItem("userId")as string;
  const [employeeDropDown, setEmployeeDropdown] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [dealerStatus, setDealerStatus] = useState<string>("");
  const [Dealerid, setDealerid] = useState<DealeriddropdownProps[]>([]);
  const [disableEmployeeDropdown, setDisableEmployeeDropdown] = useState<boolean>(true);

  useEffect(() => {
    if (token) {
      let formData = new FormData();
      formData.append("token", token);
      formData.append("isDealer", '1');

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
    if (token && userdealerid) {
      let formData = new FormData();
      formData.append("token", token);
      formData.append("dealerId", userdealerid);
      console.log(userdealerid)
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

  const handleStatusChange = (value: string) => {
    setSelectedStatus(value);
  };

  const handleDealerStatusChange = (value: string) => {
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
        list(currentPage, 5);
      })
      .catch((err) => {
        console.log("Error reassigning lead:", err);
      });
  };

  return (
    <Modal title="Reassign Lead" open={Reassign} onCancel={onclose} onOk={reassignLead}>
      <Form>
    
        {(userType === "1" || userType === "2") && (
          <Form.Item label="Dealer">
            <Select value={dealerStatus} onChange={handleDealerStatusChange}>
              {Dealerid?.map((value: DealeriddropdownProps) => {
                const nameOnly = value.userName.split("(")[0];
                return (
                  <Option key={value.userId} value={value.userId}>
                    {nameOnly.trim()}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        )}


        <Form.Item label="Employee">
          <Select value={selectedStatus} onChange={handleStatusChange}>
            {employeeDropDown?.map((value: EmployeedropdownProps) => {
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
  );
}

export default ReassignModal;
