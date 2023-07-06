/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Orders from "views/Orders.js";
import History from "views/History.js";
import Account_security from "views/account_security.js" ;
import Contact_input from "views/contact_input.js" ;

import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";

const dashboardRoutes = [
  {
    upgrade: true,
    path: "/upgrade",
    name: "subscription",
    icon: "nc-icon nc-alien-33",
    component: Upgrade,
    layout: "/admin"
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/Products",
    name: "Products",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin"
  },
  {
    path: "/Orders",
    name: "Orders",
    icon: "nc-icon nc-notes",
    component: Orders,
    layout: "/admin"
  },
  {
    path: "/History",
    name: "History",
    icon: "nc-icon nc-notes",
    component: History,
    layout: "/admin"
  } ,
  {
    path: "/Account_security",
    name: "Account_security",
    icon: "nc-icon nc-notes",
    component: Account_security,
    layout: "/admin"
  },
  {
    path: "/Contact_input",
    name: "Contact_input",
    icon: "nc-icon nc-notes",
    component: Contact_input,
    layout: "/admin"
  }


  
];

export default dashboardRoutes;
