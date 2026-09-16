import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/pages/Home";
import Course from "./components/common/Course";
import Detail from "./components/pages/Detail";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import MyCourses from "./components/pages/account/MyCourses";
import MyLearning from "./components/pages/account/MyLearning";
import WatchCourse from "./components/pages/account/WatchCourse";
import ChangePassword from "./components/pages/account/ChangePassword";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/pages/account/Dashboard";
import RequireAuth from "./components/common/RequireAuth";
import CreateCourse from "./components/pages/account/courses/CreateCourse";
import EditCourse from "./components/pages/account/courses/EditCourse";
import EditLesson from "./components/pages/account/courses/EditLesson";




function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/detail" element={<Detail />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

       <Route path="/account/dashboard"  element ={
         <RequireAuth> <Dashboard/> </RequireAuth>
       } />
       <Route path="/account/courses/create"  element ={
         <RequireAuth> <CreateCourse/> </RequireAuth>
       } />
       <Route path="/account/courses/edit/:id"  element ={
         <RequireAuth> <EditCourse/> </RequireAuth>
       } />
        <Route path="/account/courses/edit-lesson/:id/:courseId"  element ={
         <RequireAuth> <EditLesson/> </RequireAuth>
       } />

      
          <Route path="/account/my-learning" element={<MyLearning />} />
          <Route path="/account/my-courses" element={<MyCourses />} />
          <Route path="/account/course-enrolled" element={<MyLearning/>} />
          <Route path="/account/watch-course" element={<WatchCourse />} />
          <Route path="/account/change-password" element={<ChangePassword />} />
          {/* <Route path="/account/my-courses/view" element={<View />} />
          <Route path="/account/my-courses/create" element={<CreateCourse />} /> */}
        </Routes>
      </BrowserRouter>
      <Toaster
      position="top-center"
      reverseOrder={false}  />
    </>
  );
}

export default App;
