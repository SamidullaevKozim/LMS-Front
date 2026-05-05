import React, { useEffect, useState } from "react";
import instance from "../utils/axios";

const AdminsHome = () => {
  let [teachers, setTeachers] = useState([]);
  let [groups, setGroups] = useState([]);
  let [students, setStudents] = useState([]);

  useEffect(() => {
    instance.get("/teachers").then((res) => {
      setTeachers(res.data);
    });
  }, []);

  useEffect(() => {
    instance.get("/groups").then((res) => {
      setGroups(res.data);
    });
  }, []);

  useEffect(() => {
    instance.get("/students").then((res) => {
      setStudents(res.data);
    });
  }, []);

  return (
    <div className="flex gap-4 p-4 bg-[#FFFCEF] min-h-screen">

  {/* Students Table */}
  <div className="flex-1 bg-white rounded-2xl border border-[#5C899D]/15 shadow-[0_4px_32px_rgba(92,137,157,0.10)] overflow-hidden min-w-0">
    <div className="px-4 py-3 border-b border-[#5C899D]/15">
      <h2 className="text-[17px] font-medium text-[#2e5a6e]">Students</h2>
    </div>
    <table className="w-full">
      <thead>
        <tr className="border-b border-[#5C899D]/10">
          <th className="text-left px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50">Name</th>
          <th className="text-right px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50">Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student._id} className="border-b border-[#5C899D]/08 hover:bg-[#5C899D]/04 transition-all">
            <td className="px-4 py-3 text-[14px] text-[#2e5a6e] font-medium">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#5C899D] flex items-center justify-center text-[#FFFCEF] text-[11px] font-medium shrink-0">
                  {student.name?.charAt(0).toUpperCase()}
                </div>
                {student.name}
              </div>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <button title="Info" className="p-1.5 rounded-lg text-[#5C899D] hover:bg-[#5C899D]/10 transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/></svg>
                </button>
                <button title="Edit" className="p-1.5 rounded-lg text-[#5C899D] hover:bg-[#5C899D]/10 transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"><path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                </button>
                <button title="Delete" className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Teachers Table */}
  <div className="flex-1 bg-white rounded-2xl border border-[#5C899D]/15 shadow-[0_4px_32px_rgba(92,137,157,0.10)] overflow-hidden min-w-0">
    <div className="px-4 py-3 border-b border-[#5C899D]/15">
      <h2 className="text-[17px] font-medium text-[#2e5a6e]">Teachers</h2>
    </div>
    <table className="w-full">
      <thead>
        <tr className="border-b border-[#5C899D]/10">
          <th className="text-left px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50">Name</th>
          <th className="text-right px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50">Actions</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((teacher) => (
          <tr key={teacher._id} className="border-b border-[#5C899D]/08 hover:bg-[#5C899D]/04 transition-all">
            <td className="px-4 py-3 text-[14px] text-[#2e5a6e] font-medium">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#5C899D]/20 flex items-center justify-center text-[#5C899D] text-[11px] font-medium shrink-0">
                  {teacher.name?.charAt(0).toUpperCase()}
                </div>
                {teacher.name}
              </div>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <button title="Info" className="p-1.5 rounded-lg text-[#5C899D] hover:bg-[#5C899D]/10 transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/></svg>
                </button>
                <button title="Edit" className="p-1.5 rounded-lg text-[#5C899D] hover:bg-[#5C899D]/10 transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"><path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                </button>
                <button title="Delete" className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Groups Table */}
  <div className="flex-1 bg-white rounded-2xl border border-[#5C899D]/15 shadow-[0_4px_32px_rgba(92,137,157,0.10)] overflow-hidden min-w-0">
    <div className="px-4 py-3 border-b border-[#5C899D]/15">
      <h2 className="text-[17px] font-medium text-[#2e5a6e]">Groups</h2>
    </div>
    <table className="w-full">
      <thead>
        <tr className="border-b border-[#5C899D]/10">
          <th className="text-left px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50">Name</th>
          <th className="text-right px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50">Actions</th>
        </tr>
      </thead>
      <tbody>
        {groups.map((group) => (
          <tr key={group._id} className="border-b border-[#5C899D]/08 hover:bg-[#5C899D]/04 transition-all">
            <td className="px-4 py-3 text-[14px] text-[#2e5a6e] font-medium">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#5C899D]/10 flex items-center justify-center text-[#5C899D] shrink-0">
                  <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none"><circle cx="5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/><circle cx="11" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M1 13c0-2.21 1.79-3.5 4-3.5s4 1.29 4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 9.5c1.5 0 4 .79 4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </div>
                {group.name}
              </div>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center justify-end gap-1">
                <button title="Info" className="p-1.5 rounded-lg text-[#5C899D] hover:bg-[#5C899D]/10 transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5"/></svg>
                </button>
                <button title="Edit" className="p-1.5 rounded-lg text-[#5C899D] hover:bg-[#5C899D]/10 transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"><path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                </button>
                <button title="Delete" className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-all">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

</div>
  );
};

export default AdminsHome;
