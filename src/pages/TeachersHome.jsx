import React, { useEffect, useState } from "react";
import instance from "../utils/axios";
import { jwtDecode } from "jwt-decode";

const TeachersHome = () => {
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);

  const token = localStorage.getItem("token");
  const decoded = jwtDecode(token);
  const teacherId = decoded.id;

  useEffect(() => {
    instance.get("/groups").then((res) => setGroups(res.data));
    instance.get("/students").then((res) => setStudents(res.data));
  }, []);

  const teacherGroups = groups.filter(
    (group) => group.teacher?._id === teacherId,
  );

  const teacherStudents = students.filter(
    (student) => student.group?.teacher?._id === teacherId,
  );
  const [selectedGroup, setSelectedGroup] = useState(null);

  return (
    <div className="p-8 bg-[#FFFCEF] min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <p className="text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-1">
          Welcome back
        </p>
        <h1 className="text-[30px] font-medium text-[#2e5a6e] tracking-tight">
          Teacher Dashboard
        </h1>
      </div>

      <div className="flex gap-6">
        {/* Groups Table */}
        <div className="flex-1 bg-white rounded-2xl border border-[#5C899D]/15 shadow-[0_4px_32px_rgba(92,137,157,0.08)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#5C899D]/15">
            <p className="text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-0.5">
              Overview
            </p>
            <h2 className="text-[20px] font-medium text-[#2e5a6e]">
              My Groups
            </h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#5C899D]/10">
                <th className="text-left px-6 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50">
                  Name
                </th>
                <th className="text-left px-6 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50">
                  Time
                </th>
                <th className="px-6 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {teacherGroups.map((group) => (
                <tr
                  key={group._id}
                  className="border-b border-[#5C899D]/08 hover:bg-[#5C899D]/04 transition-all"
                >
                  <td className="px-6 py-3 text-[15px] text-[#2e5a6e] font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#5C899D]/10 flex items-center justify-center text-[#5C899D] shrink-0">
                        <svg
                          className="w-3 h-3"
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
                      </div>
                      {group.name}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-[14px] text-[#5C899D]/70">
                    {group.time}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      onClick={() => setSelectedGroup(group)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium text-[#5C899D] hover:bg-[#5C899D]/10 transition-all ml-auto"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="8"
                          cy="8"
                          r="6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      Info
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Students Table */}
        <div className="flex-1 bg-white rounded-2xl border border-[#5C899D]/15 shadow-[0_4px_32px_rgba(92,137,157,0.08)] overflow-hidden">
          <div className="px-6 py-4 border-b border-[#5C899D]/15">
            <p className="text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-0.5">
              Overview
            </p>
            <h2 className="text-[20px] font-medium text-[#2e5a6e]">
              My Students
            </h2>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#5C899D]/10">
                <th className="text-left px-6 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50">
                  Name
                </th>
                <th className="text-left px-6 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {teacherStudents.map((student) => (
                <tr
                  key={student._id}
                  className="border-b border-[#5C899D]/08 hover:bg-[#5C899D]/04 transition-all"
                >
                  <td className="px-6 py-3 text-[15px] text-[#2e5a6e] font-medium">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#5C899D] flex items-center justify-center text-[#FFFCEF] text-[11px] font-medium shrink-0">
                        {student.name?.charAt(0).toUpperCase()}
                      </div>
                      {student.name}
                    </div>
                  </td>
                  <td className="px-6 py-3 text-[14px] text-[#5C899D]/70">
                    {student.email}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedGroup && (
        <div
          className="fixed inset-0 bg-[#2e5a6e]/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedGroup(null)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md border border-[#5C899D]/15 shadow-[0_8px_48px_rgba(92,137,157,0.2)] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="px-6 py-5 border-b border-[#5C899D]/15 flex items-start justify-between">
              <div>
                <p className="text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-0.5">
                  Group Info
                </p>
                <h3 className="text-[22px] font-medium text-[#2e5a6e]">
                  {selectedGroup.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedGroup(null)}
                className="p-1.5 rounded-lg text-[#5C899D]/50 hover:bg-[#5C899D]/10 hover:text-[#5C899D] transition-all"
              >
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 3l10 10M13 3L3 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Info cards */}
            <div className="flex gap-3 p-6 pb-4">
              <div className="flex-1 bg-[#FFFCEF] rounded-xl px-4 py-3 border border-[#5C899D]/10">
                <p className="text-[10px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-1">
                  Time
                </p>
                <p className="text-[15px] font-medium text-[#2e5a6e]">
                  {selectedGroup.time}
                </p>
              </div>
              <div className="flex-1 bg-[#FFFCEF] rounded-xl px-4 py-3 border border-[#5C899D]/10">
                <p className="text-[10px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-1">
                  Students
                </p>
                <p className="text-[15px] font-medium text-[#2e5a6e]">
                  {
                    teacherStudents.filter(
                      (s) => s.group?._id === selectedGroup._id,
                    ).length
                  }
                </p>
              </div>
            </div>

            {/* Students in group */}
            <div className="px-6 pb-6">
              <p className="text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-3">
                Members
              </p>
              <div className="flex flex-col gap-2">
                {teacherStudents
                  .filter((s) => s.group?._id === selectedGroup._id)
                  .map((student) => (
                    <div
                      key={student._id}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#FFFCEF] border border-[#5C899D]/10"
                    >
                      <div className="w-7 h-7 rounded-full bg-[#5C899D] flex items-center justify-center text-[#FFFCEF] text-[12px] font-medium shrink-0">
                        {student.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-[#2e5a6e]">
                          {student.name}
                        </p>
                        <p className="text-[12px] text-[#5C899D]/60">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersHome;
