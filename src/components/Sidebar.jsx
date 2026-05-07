import { Link } from "react-router-dom";
import StudentsHome from "../pages/StudentsHome";
import TeachersHome from "../pages/TeachersHome";
import AdminsHome from "../pages/AdminsHome";
import TeacherRegister from "../pages/TeacherRegister";
import StudentRegister from "../pages/StudentRegister";

const Sidebar = ({ decode }) => {
  if (!decode) return null;

  function logout() {
    localStorage.removeItem("token");
    alert("you log out");
    window.location.reload();
  }

  return (
    <div className="flex flex-col h-full">
      <ul className="flex flex-col gap-1">
        {decode.role === "STUDENT" && (
          <li>
            <Link
              to="/layout/studentsHome"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[15px] font-medium text-[#5C899D] hover:bg-[#5C899D]/10 transition-all"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="6"
                  height="6"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="9"
                  y="1"
                  width="6"
                  height="6"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="1"
                  y="9"
                  width="6"
                  height="6"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="9"
                  y="9"
                  width="6"
                  height="6"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              Home
            </Link>
          </li>
        )}

        {decode.role === "TEACHER" && (
          <li>
            <Link
              to="/layout/teachersHome"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[15px] font-medium text-[#5C899D] hover:bg-[#5C899D]/10 transition-all"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
                <rect
                  x="1"
                  y="1"
                  width="6"
                  height="6"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="9"
                  y="1"
                  width="6"
                  height="6"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="1"
                  y="9"
                  width="6"
                  height="6"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="9"
                  y="9"
                  width="6"
                  height="6"
                  rx="1.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              </svg>
              Home
            </Link>
          </li>
        )}

        {decode.role === "ADMIN" && (
          <>
            <li>
              <Link
                to="/layout/adminsHome"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[15px] font-medium text-[#5C899D] hover:bg-[#5C899D]/10 transition-all"
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <rect
                    x="1"
                    y="1"
                    width="6"
                    height="6"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="9"
                    y="1"
                    width="6"
                    height="6"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="1"
                    y="9"
                    width="6"
                    height="6"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="9"
                    y="9"
                    width="6"
                    height="6"
                    rx="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/layout/teacherReg"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[15px] font-medium text-[#5C899D] hover:bg-[#5C899D]/10 transition-all"
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle
                    cx="8"
                    cy="5"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 2l3 3-3 3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Create Teacher
              </Link>
            </li>
            <li>
              <Link
                to="/layout/groupreg"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[15px] font-medium text-[#5C899D] hover:bg-[#5C899D]/10 transition-all"
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle
                    cx="5"
                    cy="5"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="11"
                    cy="5"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M1 13c0-2.21 1.79-3.5 4-3.5s4 1.29 4 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M11 9.5c1.5 0 4 .79 4 3.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Create Group
              </Link>
            </li>
            <li>
              <Link
                to="/layout/studentReg"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-[15px] font-medium text-[#5C899D] hover:bg-[#5C899D]/10 transition-all"
              >
                <svg
                  className="w-4 h-4 shrink-0"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <circle
                    cx="8"
                    cy="5"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Create Student
              </Link>
            </li>
          </>
        )}
      </ul>

      {/* Bottom section */}
      <div className="mt-auto pt-6 border-t border-[#5C899D]/15 flex flex-col gap-3">
        {/* User info */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-[#5C899D] flex items-center justify-center text-[#FFFCEF] text-[13px] font-medium shrink-0">
            {decode?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-[13px] font-medium text-[#2e5a6e] leading-tight">
              {decode?.name}
            </p>
            <p className="text-[15px] text-[#5C899D]/60 capitalize">
              {decode?.role?.toLowerCase()}
            </p>
          </div>
        </div>

        {/* Logout button */}
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-[15px] font-medium text-red-400 hover:bg-red-50 transition-all"
        >
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M11 11l3-3-3-3"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 8H6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
