import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import Login from '../Screens/Login/Login';
import Nav from '../Screens/Home/Navbar/Nav';
import Dashboard from '../Screens/Home/Dashboard/Dashboard';
import { NotAllow, UserCheck } from './AuthenticationRouter';
import Admin from '../Screens/Home/User_Management/Admin';
import Employee from '../Screens/Home/User_Management/Employee';
import Dealer from '../Screens/Home/User_Management/Dealer';
import Signup from '../Screens/Login/Signup';
import VerifyOtp from '../Screens/Login/VerifyOtp';
import ResetPassword from '../Screens/Login/ResetPassword';
import Leads from '../Screens/Home/leads/Leads';

function Routerpath() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserCheck />,
      children: [
        {
          path: 'login',
          element: <Login/>,
        },
        {
          path:'signup',
          element:<Signup/>
        },
        {
          path:'verifyotp',
          element:<VerifyOtp/>
        },{
          path:'resetpassword',
          element:<ResetPassword/>
        }
       
      ],
    },
    {
      path: '/',
      element: <NotAllow />,
      children: [
        {
          path: '/',
          element: <Nav />,
          children: [
            {
              path: 'dashboard',
              element: <Dashboard />,
            },
            {
              path:'Admin',
              element:<Admin/>
            },
            {
              path:'employee',
              element:<Employee/>
            },
            {
              path:'dealer',
              element:<Dealer/>
            },{
              path:'leads',
              element:<Leads/>
            }
          ],
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default Routerpath;
