import React, { useEffect, useState } from 'react'
import { Card,message } from 'antd'
import { useToken } from '../../../utillity/hooks';
import { dashboard } from '../../../axios/Services';

function TestDashboard() {
    const token=useToken();
    const [cardlist,setCardList]=useState([]);
    useEffect(()=>{
if(token){
    handleDashboard();
}
    },[token])
  const  handleDashboard=()=>{
    let formdata=new FormData();
    formdata.append("token",token)
    dashboard(formdata).then((res)=>{
        if(res?.data.data.status==1){
            setCardList(res?.data?.data ||[])
        }
       else if(res?.data.status==-1){
        setCardList([]);

       }
       else{
        message.error("not sucess")
        console.log("error");
       }
      
    }).catch(()=>{
        console.log("error");
    })

  }
  return (
    <div>

        {cardlist?.map((ele:any)=>
      <Card title={ele.displayName}>
         <p>{ele.value}</p>
         <p>{ele.over_due.displayName}</p>
         <p>{ele.over_due.value}</p>
      </Card>
        )
           
        }
        </div>
  )
}

export default TestDashboard