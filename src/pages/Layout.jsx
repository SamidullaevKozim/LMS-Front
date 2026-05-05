import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

import StudentsHome from "./StudentsHome";
import TeachersHome from "./TeachersHome";
import AdminsHome from "./AdminsHome";
import TeacherRegister from "./TeacherRegister";
import StudentRegister from "./StudentRegister";
import CreateGroup from "./CreateGroup";

const Layout = ({ decode }) => {
  if (!decode) return null;

  const getDefaultRoute = () => {
    if (decode.role === "STUDENT") return "studentsHome";
    if (decode.role === "TEACHER") return "teachersHome";
    if (decode.role === "ADMIN") return "adminsHome";
    return "/";
  };

  return (
    <div className="flex min-h-[100vh]  overflow-auto">
      <div
        style={{
          width: "250px",
          borderRight: "2px solid wheat",
          padding: "20px",
        }}
      >
        <Sidebar decode={decode} />
      </div>

      <div className="flex-1 w-full items-center justify-between">
        <Routes>
          <Route index element={<Navigate to={getDefaultRoute()} replace />} />

          <Route path="studentsHome" element={<StudentsHome />} />
          <Route path="teachersHome" element={<TeachersHome />} />
          <Route path="adminsHome" element={<AdminsHome />} />
          <Route path="teacherReg" element={<TeacherRegister />} />
          <Route path="studentReg" element={<StudentRegister />} />
          <Route path="groupreg" element={<CreateGroup />} />
        </Routes>
      </div>
    </div>
  );
};

export default Layout;
