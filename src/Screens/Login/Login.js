import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Button } from 'antd';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { handletoken } from '../../redux/reducers/AuthReducers';
import { Loginpd } from '../../axios/Services';
import classes from '../Login/Login.module.css';
import { Image } from 'antd';
import verify from '../../assests/MAestro__2_-removebg-preview.png';

function Login() {
  const [pwd, setPwd] = useState('');
  const [input, setInput] = useState('');

  var sha1 = require('sha1');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("userName", input);
    formData.append("password", pwd);
    formData.append("device_type", "3");
    formData.append("authcode", sha1("lkjfjIHJL@fdj385!jhg" + input));

    Loginpd(formData)
      .then((response) => {
        localStorage.setItem("userdata", JSON.stringify(response.data.token));
        console.log(response.data);
        dispatch(handletoken(response.data.token));
        console.log("successful");
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  return (
    <>
    <Row className={`img-fluid ${classes.back}`} justify="center">
  <Col xs={24} sm={18} md={12} lg={8} className=" d-flex align-items-center">
    <div className={`card w-100 p-4 mx-auto ${classes.cardsssss}`}>
      <div style={{ textAlign: 'center' }}>
        <Image
          width={250}
          height={150}
          src={verify}
          className="mx-auto"
          style={{ color: 'white' }}
        />
      </div>
      <h3 className="text-center  mb-3">Login</h3>
      <Row justify="center" gutter={[16, 16]}>
        <Col span={24}>
          <TextField
            id="outlined-basic"
            label="Username"
            variant="outlined"
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            InputLabelProps={{
              style: { color: 'white' }, // Label color
            }}
            InputProps={{
              style: { color: 'white' }, // Input text color
              classes: {
                notchedOutline: classes.whiteBorder, // For white border if needed
              },
            }}
            placeholder="Username"
            FormHelperTextProps={{
              style: { color: 'white' }, // Optional helper text color
            }}
          />
        </Col>

        <Col span={24}>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            InputLabelProps={{
              style: { color: 'white' }, // Label color
            }}
            InputProps={{
              style: { color: 'white' }, // Input text color
            }}
            placeholder="Password"
          />
        </Col>
      </Row>
      <Button
        type="primary"
        danger
        className="mb-2 mt-3 mx-auto d-block"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <a onClick={() => navigate('/signup')} className="mb-2 mx-auto d-block">
        Forgot password?
      </a>
    </div>
  </Col>
</Row>
    </>
  );
}

export default Login;
