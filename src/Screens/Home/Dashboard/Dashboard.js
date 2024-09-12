import React, { useEffect, useState } from 'react';
import { dashboard } from '../../../axios/Services';
import { useDispatch, useSelector } from 'react-redux';
import { handledata } from '../../../redux/reducers/AuthReducers';
import { Card } from 'antd';
import classes from '../User_Management/Login.module.css';
import { Flex, Radio } from 'antd';
import { Col, Divider, Row } from 'antd';




function Dashboard() {
    const selector = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [inputs, setInput] = useState('');
    const [data, SetData] = useState([]);

    const handlegetData = () => {
        let formdata = new FormData();
        formdata.append("token", selector.token);
        setInput(selector.token);

        dashboard(formdata)
            .then((res) => {
                    SetData(res.data.data);
            })
            .catch((err) => {
                console.log('API Error:', err);
            });
    };

    useEffect(() => {
        console.log(selector , "=====>dashborad");
        
        if (selector.token) {
            handlegetData();
        }
    }, [selector.token]); 

    useEffect(() => {
        console.log('Current Data:', data);
    }, [data]);

    return (
        <>
    
            <Row gutter={[8, 16]} className="mt-5 ms-5 me-5" >
                {
                    data.map((item, index) => (
                 <Col lg={8} md={12} sm={24}>
                         
                     <Card title={item.displayName} className={classes.card} bordered={false} style={{ width: 300 }}>
                             
                              <div className={classes.r}>
                                <p>{item.leads.displayName}: </p>
                                <p>{item.leads.value}</p>
                                </div>
                                <div className={classes.r}>
                                <p>{item.over_due.displayName}: </p>
                                <p>{item.over_due.value}</p>
                                </div>
                              


                             </Card>
                        </Col>
                    ))
        }
            </Row>
        </>
    );
}

export default Dashboard;
