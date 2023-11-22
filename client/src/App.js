import logo from './logo.svg';
import './App.css';



import React from 'react';
import {BrowserRouter as Router ,Route,Switch} from "react-router-dom";
import ProtectedRoute from './Components/protectedRoutes';
import Login from './Components/login';

import SystemHome from './Components/systemHome';
import SystemAddFacility from './Components/systemAddFacility';

import FacilityHome from './facilityComponents/facilityHome';
import FacilityChildrenEnrollments from './facilityComponents/facilityChildren/facilityChildrenEnrollments';
import FacilityAddChild from './facilityComponents/facilityChildren/facilityAddChild';
import FacilityPendingPayments from './facilityComponents/facilityPendingPayments';
import FacilityDailyAttendance from './facilityComponents/facilityDailyAttendance';
import FacilityDailyAbsence from './facilityComponents/facilityDailyAbsence';
import FacilityMoneyEarned from './facilityComponents/facilityMoneyEarned';
import FacilityMoneyBilled from './facilityComponents/facilityMoneyBilled';

import FacilityHireStaff from './facilityComponents/facilityStaff/facilityHireStaff';
import FacilityAddStaff from './facilityComponents/facilityStaff/facilityAddStaff';

import FacilityAssign from './facilityComponents/facilityAssign';
import FacilityManageAttendance from './facilityComponents/facilityManageAttendance';
import FacilityAddParent from './facilityComponents/facilityAddParent';



import TeacherHome from './teacherComponents/teacherHome';
import TeacherAttendance from './teacherComponents/teacherAttendance';
import TeacherMarkChildrenAttendance from './teacherComponents/teacherMarkChildrenAttendance';

import ParentHome from './parentComponents/parentHome';
import ParentChildHome from './parentComponents/parentChildHome';
import ParentChildWeekAttendance from './parentComponents/parentChildWeekAttendance';
import ParentChildPendingPayments from './parentComponents/parentChildPendingPayments';

// import Navbar from './navbar';
// import Home from './home';
// import Create from './Create';
// import BlogDetails from './BlogDetails';

// import NotFound from './NotFound';

function App() {
  
  document.title="Childcare Management System"

  return (
    
     <Router>

      <div>  
      <Switch>
   

      <Route exact path="/">
        <Login />
      </Route>
      
      <Route exact path="/login">
        <Login />
      </Route>

      <ProtectedRoute>
         
         <Route exact path="/systemHome/sysId/:sysId">
            <SystemHome />
         </Route>

         <Route exact path="/systemHome/sysId/:sysId/addFacility">
            <SystemAddFacility />
         </Route>
         
         <Route exact path="/facilityHome/facId/:facId">
            <FacilityHome />
         </Route>
         
         <Route exact path="/facilityHome/facId/:facId/:licNo/:facName/facilityChildrenEnrollments">
            <FacilityChildrenEnrollments />
         </Route>
         

         <Route exact path="/facilityHome/facId/:facId/:licNo/:facName/addChildren">
            <FacilityAddChild />
         </Route>

         <Route exact path="/facilityHome/facId/:facId/:licNo/:facName/facilityHireStaff">
            <FacilityHireStaff />
         </Route>

         <Route exact path="/facilityHome/facId/:facId/:licNo/:facName/addStaff">
            <FacilityAddStaff />
         </Route> 

         <Route exact path="/facilityHome/facId/:facId/:licNo/:facName/facilityAssign">
            <FacilityAssign />
         </Route>

         <Route exact path="/facilityHome/facId/:facId/:licNo/:facName/facilityPendingPayments/:week/:year">
            <FacilityPendingPayments />
         </Route>

         <Route exact path="/facilityHome/facId/:facId/:licNo/:facName/DailyAttendance/:day/:week/:year/:classtype">
            <FacilityDailyAttendance />
         </Route>

         <Route exact path="/facilityHome/facId/:facId/:licNo/:facName/DailyAbsence/:day/:week/:year/:classtype">
            <FacilityDailyAbsence />
         </Route>

         <Route exact path="/facilityHome/facId/:facId/:licNo/:facName/MoneyEarned/:week/:year/">
            <FacilityMoneyEarned />
         </Route>

         <Route exact path="/facilityHome/facId/:facId/:licNo/:facName/MoneyBilled/:week/:year/">
            <FacilityMoneyBilled />
         </Route>         

         <Route exact path="/facilityHome/facId/:facId/:licNo/:facName/facilityManageAttendance">
            <FacilityManageAttendance />
         </Route>

         <Route exact path="/facilityHome/facId/:facId/:licNo/:facName/facilityAddParent">
            <FacilityAddParent />
         </Route>



         <Route exact path="/teacherHome/teacherId/:teacherId">
            <TeacherHome />
         </Route>

         <Route exact path="/teacherHome/teacherId/:teacherId/teacherAttendance/:weekNo/:yearNo">
            <TeacherAttendance />
         </Route>

         <Route exact path="/teacherHome/teacherId/:teacherId/teacherMarkChildrenAttendance">
            <TeacherMarkChildrenAttendance />
         </Route>

         <Route exact path="/parentHome/parentId/:parentId">
            <ParentHome />
         </Route>

         <Route exact path="/parentHome/parentId/:parentId/viewChild/:childId/:firstName/:lastName">
            <ParentChildHome />
         </Route>

         <Route exact path="/parentHome/parentId/:parentId/viewChild/:childId/:firstName/:lastName/weekAttendance/:attainweek/:attainyear">
            <ParentChildWeekAttendance />
         </Route>

         <Route exact path="/parentHome/parentId/:parentId/viewChild/:childId/:firstName/:lastName/pendingPayments">
            <ParentChildPendingPayments />
         </Route>
      
         </ProtectedRoute>

      </Switch>
      </div>
     </Router>

  );
}

export default App;
