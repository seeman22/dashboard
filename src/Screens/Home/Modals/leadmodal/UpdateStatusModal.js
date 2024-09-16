import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Input, Select, DatePicker, message } from "antd";
import { useSelector } from "react-redux";
import {
  changestatus,
  compettior,
  leaddropdown,
  enquriy,
} from "../../../../axios/Services";
import { useFormik } from "formik";
import * as Yup from "yup";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

function UpdateStatusModal({ updateStatus, onclose, updatstatuserid }) {
  const [storingvalue, setStoringvalue] = useState([]);
  const [enquirydrop, setEnquiry] = useState([]);
  const [dropdownCompetitor, setDropdownCompetitor] = useState([]);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (updateStatus && token) {
      const formData = new FormData();
      formData.append("token", token);

      leaddropdown(formData)
        .then((res) => setStoringvalue(res.data.data))
        .catch(() => console.log("Error fetching lead dropdown data"));

      enquriy(formData)
        .then((res) => setEnquiry(res.data.data))
        .catch(() => console.log("Error fetching enquiry dropdown data"));

      compettior(formData)
        .then((res) => setDropdownCompetitor(res.data.data))
        .catch(() => console.log("Error fetching competitor dropdown data"));
    }
  }, [updateStatus, token]);

  const validationSchema = Yup.object({
    leadStatus: Yup.string().required("Status is required"),
    notes: Yup.string().when("leadStatus", {
      is: (val) => [2, 3, 5, 6, 7, 17, 24].includes(val),
      then: Yup.string().required("Notes are required"),
    }),
    competitor: Yup.string(),
    enquiry_type: Yup.string(),
    poc_date: Yup.string(),
    missedDays: Yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      leadStatus: "",
      competitor: "",
      competitor_id: "",
      comment: "",
      competitorName: "",
      enquiry_type: "",
      demo_date: "",
      poc_date: "",
      follow_up_date: "",
      // missedDays: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("token", token);
      formData.append("leadId", updatstatuserid);
      formData.append("leadStatus", values.leadStatus);
      if (values.leadStatus === 7) {
        formData.append("competitor", values.competitor);
        formData.append("competitorName", values.competitorName);
      }

      if (values.leadStatus === 5) {
        formData.append("enquiry_type", values.enquiry_type);
      }

      if (values.leadStatus === 3) {
        formData.append("demo_date", values.demo_date);
      }

      if (values.leadStatus === 24) {
        formData.append("poc_date", values.poc_date);
      }

      if (values.leadStatus === 5) {
        formData.append("follow_up_date", values.follow_up_date);
      }

      if ([17, 6, 2, 3, 24, 7].includes(values.leadStatus)) {
        formData.append("comment", values.comment);
      }

      changestatus(formData)
        .then(() => {
          message.success("Successfully changed status");
          console.log("Successfully changed status");
          onclose();
        })
        .catch(() => console.log("Failed to change status"));
    },
  });

  return (
    <Modal
      title="Update Status"
      open={updateStatus}
      onCancel={onclose}
      onOk={formik.handleSubmit}
    >
      <Form layout="vertical">
        <Form.Item label="Status">
          <Select
            name="leadStatus"
            value={formik.values.leadStatus}
            onChange={(value) => formik.setFieldValue("leadStatus", value)}
          >
            {storingvalue.map((value) => (
              <Option key={value.leadStatusId} value={value.leadStatusId}>
                {value.leadStatusName}
              </Option>
            ))}
          </Select>
          {formik.touched.leadStatus && formik.errors.leadStatus ? (
            <div>{formik.errors.leadStatus}</div>
          ) : null}
        </Form.Item>

        {formik.values.leadStatus === 7 && (
          <>
            <Form.Item label="Competitor">
              <Select
                name="competitor"
                value={formik.values.competitor}
                onChange={(value) => formik.setFieldValue("competitor", value)}
              >
                {dropdownCompetitor.map((value) => (
                  <Option
                    key={value.competitorId}
                    value={value.competitorId}
                    values={value.competitorName}
                  >
                    {value.competitorName}
                  </Option>
                ))}
              </Select>
              {formik.touched.competitor && formik.errors.competitor ? (
                <div>{formik.errors.competitor}</div>
              ) : null}
            </Form.Item>
            <Form.Item label="comment">
              <TextArea
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
              />
              {formik.touched.comment && formik.errors.comment ? (
                <div>{formik.errors.comment}</div>
              ) : null}
            </Form.Item>

            {/* <Form.Item label="Missed Days">
              <DatePicker onChange={(date) => formik.setFieldValue('missedDays', date)} />
              {formik.touched.missedDays && formik.errors.missedDays ? <div>{formik.errors.missedDays}</div> : null}
            </Form.Item> */}
          </>
        )}

        {formik.values.leadStatus === 3 && (
          <>
            <Form.Item label="demo_date">
              <DatePicker
                name="demo_date"
                showTime
                onChange={(date, datestring) =>
                  formik.setFieldValue("demo_date", datestring)
                }
              />
              {formik.touched.date && formik.errors.date ? (
                <div>{formik.errors.date}</div>
              ) : null}
            </Form.Item>
            <Form.Item label="comment">
              <TextArea
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
              />
              {formik.touched.comment && formik.error.comment ? (
                <div>{formik.errors.comment}</div>
              ) : null}
            </Form.Item>
          </>
        )}

        {formik.values.leadStatus === 24 && (
          <>
            <Form.Item label="poc_date">
              <DatePicker
                name="poc_date"
                showTime
                onChange={(date, datestring) =>
                  formik.setFieldValue("poc_date", datestring)
                }
              />
              {formik.touched.poc_date && formik.errors.poc_date ? (
                <div>{formik.errors.poc_date}</div>
              ) : null}
            </Form.Item>
            <Form.Item label="comment">
              <TextArea
                name="comment"
                value={formik.values.comment}
                onChange={formik.handleChange}
              />
              {formik.touched.comment && formik.errors.comment ? (
                <div>{formik.errors.comment}</div>
              ) : null}
            </Form.Item>
          </>
        )}

        {formik.values.leadStatus === 5 && (
          <>
            <Form.Item label="follow_up_date">
              <DatePicker
                onChange={(date, datestring) =>
                  formik.setFieldValue("follow_up_date", datestring)
                }
              />
              {formik.follow_up_date && formik.follow_up_date ? (
                <div>{formik.follow_up_date}</div>
              ) : null}
            </Form.Item>
            <Form.Item label="enquiry_type">
              <Select
                name="enquiry_type"
                value={formik.values.enquiry_type}
                onChange={(value) =>
                  formik.setFieldValue("enquiry_type", value)
                }
              >
                {enquirydrop.map((ele) => (
                  <Option key={ele.enquiryId} value={ele.enquiryId}>
                    {ele.enquiryName}
                  </Option>
                ))}
              </Select>
              {formik.touched.enquiry && formik.errors.enquiry ? (
                <div>{formik.errors.enquiry}</div>
              ) : null}
            </Form.Item>
          </>
        )}

        {(formik.values.leadStatus === 17 ||
          formik.values.leadStatus === 6 ||
          formik.values.leadStatus === 2) && (
          <Form.Item label="comment">
            <TextArea
              name="comment"
              value={formik.values.comment}
              onChange={formik.handleChange}
            />
            {formik.touched.comment && formik.errors.comment ? (
              <div>{formik.errors.comment}</div>
            ) : null}
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
}

export default UpdateStatusModal;
