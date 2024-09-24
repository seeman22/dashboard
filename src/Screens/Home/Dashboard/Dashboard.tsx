import React, { useEffect, useState } from "react";
import { dashboard, pichart } from "../../../axios/Services";
import { useDispatch, useSelector } from "react-redux";
import { handledata } from "../../../redux/reducers/AuthReducers";
import { Card, Col, Row, Typography } from "antd";
import { selectorProps } from "../../../@types/dashboard";
import { Helmet } from "react-helmet";
import Chart from "react-apexcharts";
import classes from "../User_Management/Login.module.css"; // Make sure this CSS file has your custom styling
import mainclasses from '../../../index.css';

const { Title, Text } = Typography;

type DashboradDataProps = {
  displayName: string;
  key: string;
  value: number;
  colorCode: string;
  type: number;
  leads: {
    displayName: string;
    value: number;
  };
  over_due: {
    displayName: string;
    value: number;
  };
};

function Dashboard() {
  const selector = useSelector((state: selectorProps) => state.auth);
  const dispatch = useDispatch();
  const [data, SetData] = useState<DashboradDataProps[]>([]);
  const [chartdatas, setChartdatas] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      plotOptions: {
        bar: {
          colors: {
            ranges: [
              {
                from: 0,
                to: 100,
                color: "#FF7F50", // Coral color for bar range
              },
            ],
          },
        },
      },
      xaxis: {
        categories: [] as string[],
      },
    },
    series: [
      {
        name: "Leads data",
        data: [] as number[],
      },
    ],
  });

  useEffect(() => {
    if (selector.token) {
      handlegetData();
      handlepichart();
    }
  }, [selector.token]);

  const handlegetData = () => {
    let formdata = new FormData();
    formdata.append("token", selector.token);

    dashboard(formdata)
      .then((res) => {
        SetData(res?.data?.data || []);
      })
      .catch((err) => {
        console.log("API Error:", err);
      });
  };

  const handlepichart = (page = 1, size = 10) => {
    let formdata = new FormData();
    formdata.append("token", selector.token);

    pichart(formdata, page, size).then((res) => {
      const categories = res.data.data.items?.map((item: any) => item.Dealer);
      const seriesData = res.data.data.items?.map(
        (item: any) => item.totalLead
      );
      setChartdatas({
        options: {
          ...chartdatas.options,
          xaxis: {
            categories: categories || [],
          },
        },
        series: [
          {
            name: "Leads data",
            data: seriesData || [],
          },
        ],
      });
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

    
      <div className={classes.backgroundattarctive}>
        <Row gutter={[24, 24]} className={`mt-1 ms-5 me-5 ${classes.backgroundimage}`}>
          
       
          <Col span={24}>
            <Title level={3}>
              Leads Chart
            </Title>
            <Chart
              options={chartdatas.options}
              series={chartdatas.series}
                   type="bar"
              className={classes.chart}
              height={250}
         
             
            />
          </Col>

          {/* Cards section */}
          {data?.map((item, index) => (
            <Col lg={6} md={12} sm={24} key={index}>
              <Card
                title={<Title level={4}>{item.displayName}</Title>}
                bordered={false}
                hoverable
                className={classes.card}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                }}
              >
                <div className={classes.r} >
                  <Text>{item.leads.displayName}</Text>
                  <Text style={{ color: "#007BFF" }}>{item.leads.value}</Text>
                </div>
                <div className={classes.r} >
                  <Text>{item.over_due.displayName}</Text>
                  <Text style={{ color: "#FF4D4F" }}>{item.over_due.value}</Text>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
