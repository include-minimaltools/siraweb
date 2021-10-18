// React lib
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

// Styles
import './css/vertical-layout-light/style.css'
import './vendors/mdi/css/materialdesignicons.min.css'
import './vendors/flag-icon-css/css/flag-icon.min.css'
import './vendors/font-awesome/css/font-awesome.min.css'
import './vendors/css/vendor.bundle.base.css'
import './vendors/ti-icons/css/themify-icons.css'
import './vendors/feather/feather.css'
import 'antd/dist/antd.css';

// Components
import CampusList from './views/campus/campuslist';
import CareerList from './views/career/careerlist';
import CourseList from './views/course/courselist';
import StudentList from './views/student/studentlist';
import FacultyList from './views/faculty/facultylist';
import RoleList from './views/role/rolelist';
import UserList from './views/user/userlist';
import Error404 from './views/errors/404';

export default function App() {
  return (
    <Router>
      <Route path="/Error" ><Error404 /></Route>
        <Route exact path="/"><CampusList /></Route>
        <Route path="/Campus" ><CampusList /></Route>
        <Route path="/Career" ><CareerList /></Route>
        <Route path="/Course" ><CourseList /></Route>
        <Route path="/Students" ><StudentList /></Route>
        <Route path="/Faculty" ><FacultyList /></Route>
        <Route path="/Role" ><RoleList /></Route>
        <Route path="/User" ><UserList /></Route>
      <Redirect to="/Error" />
    </Router >
  );
}