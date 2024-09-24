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
import Category from '../Screens/Home/master/Category';
import Enquiry from '../Screens/Home/master/Enquiry';
import Requirement from '../Screens/Home/master/Requirement';
import AddleadModal from '../Screens/Home/Modals/leadmodal/AddleadModal';
import TestDashboard from '../Screens/Home/Dashboard/TestDashboard';

function Routerpath() {
  const userType=sessionStorage.getItem("userType");
  const routespath=[
    {
      path: 'dashboard',
      element: <TestDashboard/>,
    },
    {
      path:'employee',
      element:<Employee/>
    },
  {
      path:'leads',
      element:<Leads/>
    },
    {
      path:'leadAdd',
      element:<AddleadModal/>
    },
  ]
  if(userType ==='2'|| userType ==='1'){
    routespath.push(
      
        {
          path:'Admin',
          element:<Admin/>
        },
        {
          path:'dealer',
          element:<Dealer/>
        },
        {
          path:'category',
          element:<Category/>
        },{
          path:'enquiry',
          element:<Enquiry/>
        },
        {
            path:'requirement',
            element:<Requirement/>
        },
       
      
    );
  }
  const router = createBrowserRouter([
    {
      // path: '/',
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
      // path: '/',
      element: <NotAllow />,
      children: [
        {
          path: '/',
          element: <Nav />,
          children: [
            // {
            //   path: 'dashboard',
            //   element: <Dashboard />,
            // },
            // {
            //   path:'Admin',
            //   element:<Admin/>
            // },
            // {
            //   path:'employee',
            //   element:<Employee/>
            // },
            // {
            //   path:'dealer',
            //   element:<Dealer/>
            // },{
            //   path:'leads',
            //   element:<Leads/>
            // },{
            //   path:'category',
            //   element:<Category/>
            // },{
            //   path:'enquiry',
            //   element:<Enquiry/>
            // },
            // {
            //     path:'requirement',
            //     element:<Requirement/>
            // },
            // {
            //   path:'leadAdd',
            //   element:<AddleadModal/>
            // },
            ...routespath,
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
