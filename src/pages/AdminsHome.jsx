import React, { useEffect, useState } from "react";
import instance from "../utils/axios";
import { toast } from "react-toastify";

const AdminsHome = () => {
  const [teachers, setTeachers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [infoModal, setInfoModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [editForm, setEditForm] = useState({});

  const [studentSearch, setStudentSearch] = useState("");
  const [teacherSearch, setTeacherSearch] = useState("");
  const [groupSearch, setGroupSearch] = useState("");


  
  useEffect(() => {
    Promise.all([
      instance.get("/teachers"),
      instance.get("/groups"),
      instance.get("/students"),
    ]).then(([teachersRes, groupsRes, studentsRes]) => {
      setTeachers(teachersRes.data);
      setGroups(groupsRes.data);
      setStudents(studentsRes.data);
      setLoading(false);
    });
  }, []);

  async function deleteStudent(id) {
    try {
      await instance.delete(`/students/${id}`);
      setStudents((prev) => prev.filter((s) => s._id !== id));
      toast.error("Student deleted");
      
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete student");
    }
  }

  async function deleteTeacher(id) {
    try {
      await instance.delete(`/teachers/${id}`);
      setTeachers((prev) => prev.filter((t) => t._id !== id));
      toast.error("Teacher deleted");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete teacher");
    }
  }

  async function deleteGroup(id) {
    try {
      await instance.delete(`/groups/${id}`);
      setGroups((prev) => prev.filter((g) => g._id !== id));
      toast.error("Group deleted");
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to delete group");
    }
  }

  function openEdit(type, data) {
    setEditModal({ type, data });
    if (type === "student") setEditForm({ name: data.name, email: data.email });
    if (type === "teacher") setEditForm({ name: data.name, email: data.email });
    if (type === "group") setEditForm({ name: data.name, time: data.time });
  }

  async function submitEdit() {
    const { type, data } = editModal;
    setSaving(true);
    try {
      if (type === "student") {
        await instance.put(`/students/${data._id}`, editForm);
        setStudents((prev) => prev.map((s) => s._id === data._id ? { ...s, ...editForm } : s));
      }
      if (type === "teacher") {
        await instance.put(`/teachers/${data._id}`, editForm);
        setTeachers((prev) => prev.map((t) => t._id === data._id ? { ...t, ...editForm } : t));
      }
      if (type === "group") {
        await instance.put(`/groups/${data._id}`, editForm);
        setGroups((prev) => prev.map((g) => g._id === data._id ? { ...g, ...editForm } : g));
      }
      toast.success("Updated successfully");
      setEditModal(null);
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  }

  const filteredStudents = students.filter((s) =>
    s.name?.toLowerCase().includes(studentSearch.toLowerCase())
  );
  const filteredTeachers = teachers.filter((t) =>
    t.name?.toLowerCase().includes(teacherSearch.toLowerCase())
  );
  const filteredGroups = groups.filter((g) =>
    g.name?.toLowerCase().includes(groupSearch.toLowerCase())
  );

  const InfoIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
  const EditIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
      <path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
  const DeleteIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
      <path d="M2 4h12M5 4V2h6v2M6 7v5M10 7v5M3 4l1 9a1 1 0 001 1h6a1 1 0 001-1l1-9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const CloseIcon = () => (
    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
      <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
  const SearchIcon = () => (
    <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
      <circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 10l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  const inputClass = "w-full px-4 py-3 text-[15px] border-[1.5px] border-[#5C899D]/20 rounded-xl bg-[#FFFCEF] text-[#2e5a6e] placeholder:text-[#5C899D]/45 focus:outline-none focus:border-[#5C899D] focus:ring-2 focus:ring-[#5C899D]/12 focus:bg-white transition-all";
  const labelClass = "block text-[13px] font-medium text-[#5C899D] mb-1.5 tracking-wide";

  const backdropStyle = { animation: "modalBackdrop 0.2s ease-out forwards" };
  const cardStyle = { animation: "modalSlideUp 0.25s ease-out forwards" };
  const keyframes = `
    @keyframes modalBackdrop {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes modalSlideUp {
      from { opacity: 0; transform: translateY(16px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `;

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFFCEF]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-[#5C899D] border-t-transparent animate-spin" />
        <p className="text-[13px] text-[#5C899D]/60 font-medium">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="flex gap-4 p-4 bg-[#FFFCEF] h-screen overflow-hidden">
      <style>{keyframes}</style>

      {/* Students Table */}
      <div className="flex-1 bg-white rounded-2xl border border-[#5C899D]/15 shadow-[0_4px_32px_rgba(92,137,157,0.10)] overflow-hidden min-w-0 flex flex-col">
        <div className="px-4 py-3 border-b border-[#5C899D]/15 shrink-0">
          <h2 className="text-[17px] font-medium text-[#2e5a6e] mb-2.5">Students</h2>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C899D]/40 pointer-events-none">
              <SearchIcon />
            </span>
            <input
              className="w-full pl-8 pr-3 py-2 text-[13px] border border-[#5C899D]/20 rounded-lg bg-[#FFFCEF] text-[#2e5a6e] placeholder:text-[#5C899D]/40 focus:outline-none focus:border-[#5C899D]/50 focus:bg-white transition-all"
              placeholder="Search students..."
              value={studentSearch}
              onChange={(e) => setStudentSearch(e.target.value)}
            />
          </div>
        </div>
        <table className="w-full table-fixed">
          <thead className="block w-full">
            <tr className="border-b border-[#5C899D]/10 flex w-full">
              <th className="text-left px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 flex-1">Name</th>
              <th className="text-right px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 w-28">Actions</th>
            </tr>
          </thead>
          <tbody className="block overflow-y-auto max-h-[calc(100vh-230px)]">
            {filteredStudents.map((student) => (
              <tr key={student._id} className="border-b border-[#5C899D]/08 hover:bg-[#5C899D]/04 transition-all flex w-full items-center">
                <td className="px-4 py-3 text-[14px] text-[#2e5a6e] font-medium flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#5C899D] flex items-center justify-center text-[#FFFCEF] text-[11px] font-medium shrink-0">
                      {student.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="truncate">{student.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 w-28 shrink-0">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setInfoModal({ type: "student", data: {...student} })} title="Info" className="p-1.5 rounded-lg text-[#5C899D] hover:bg-[#5C899D]/10 transition-all"><InfoIcon /></button>
                    <button onClick={() => openEdit("student", student)} title="Edit" className="p-1.5 rounded-lg text-[#5C899D] hover:bg-[#5C899D]/10 transition-all"><EditIcon /></button>
                    <button onClick={() => deleteStudent(student._id)} title="Delete" className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-all"><DeleteIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredStudents.length === 0 && (
              <tr className="flex w-full">
                <td className="px-4 py-6 text-[13px] text-[#5C899D]/40 text-center w-full">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Teachers Table */}
      <div className="flex-1 bg-white rounded-2xl border border-[#5C899D]/15 shadow-[0_4px_32px_rgba(92,137,157,0.10)] overflow-hidden min-w-0 flex flex-col">
        <div className="px-4 py-3 border-b border-[#5C899D]/15 shrink-0">
          <h2 className="text-[17px] font-medium text-[#2e5a6e] mb-2.5">Teachers</h2>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C899D]/40 pointer-events-none">
              <SearchIcon />
            </span>
            <input
              className="w-full pl-8 pr-3 py-2 text-[13px] border border-[#5C899D]/20 rounded-lg bg-[#FFFCEF] text-[#2e5a6e] placeholder:text-[#5C899D]/40 focus:outline-none focus:border-[#5C899D]/50 focus:bg-white transition-all"
              placeholder="Search teachers..."
              value={teacherSearch}
              onChange={(e) => setTeacherSearch(e.target.value)}
            />
          </div>
        </div>
        <table className="w-full table-fixed">
          <thead className="block w-full">
            <tr className="border-b border-[#5C899D]/10 flex w-full">
              <th className="text-left px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 flex-1">Name</th>
              <th className="text-right px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 w-28">Actions</th>
            </tr>
          </thead>
          <tbody className="block overflow-y-auto max-h-[calc(100vh-230px)]">
            {filteredTeachers.map((teacher) => (
              <tr key={teacher._id} className="border-b border-[#5C899D]/08 hover:bg-[#5C899D]/04 transition-all flex w-full items-center">
                <td className="px-4 py-3 text-[14px] text-[#2e5a6e] font-medium flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#5C899D]/20 flex items-center justify-center text-[#5C899D] text-[11px] font-medium shrink-0">
                      {teacher.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="truncate">{teacher.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 w-28 shrink-0">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setInfoModal({ type: "teacher", data: teacher })} title="Info" className="p-1.5 rounded-lg text-[#5C899D] hover:bg-[#5C899D]/10 transition-all"><InfoIcon /></button>
                    <button onClick={() => openEdit("teacher", teacher)} title="Edit" className="p-1.5 rounded-lg text-[#5C899D] hover:bg-[#5C899D]/10 transition-all"><EditIcon /></button>
                    <button onClick={() => deleteTeacher(teacher._id)} title="Delete" className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-all"><DeleteIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredTeachers.length === 0 && (
              <tr className="flex w-full">
                <td className="px-4 py-6 text-[13px] text-[#5C899D]/40 text-center w-full">No teachers found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Groups Table */}
      <div className="flex-1 bg-white rounded-2xl border border-[#5C899D]/15 shadow-[0_4px_32px_rgba(92,137,157,0.10)] overflow-hidden min-w-0 flex flex-col">
        <div className="px-4 py-3 border-b border-[#5C899D]/15 shrink-0">
          <h2 className="text-[17px] font-medium text-[#2e5a6e] mb-2.5">Groups</h2>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5C899D]/40 pointer-events-none">
              <SearchIcon />
            </span>
            <input
              className="w-full pl-8 pr-3 py-2 text-[13px] border border-[#5C899D]/20 rounded-lg bg-[#FFFCEF] text-[#2e5a6e] placeholder:text-[#5C899D]/40 focus:outline-none focus:border-[#5C899D]/50 focus:bg-white transition-all"
              placeholder="Search groups..."
              value={groupSearch}
              onChange={(e) => setGroupSearch(e.target.value)}
            />
          </div>
        </div>
        <table className="w-full table-fixed">
          <thead className="block w-full">
            <tr className="border-b border-[#5C899D]/10 flex w-full">
              <th className="text-left px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 flex-1">Name</th>
              <th className="text-right px-4 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 w-28">Actions</th>
            </tr>
          </thead>
          <tbody className="block overflow-y-auto max-h-[calc(100vh-230px)]">
            {filteredGroups.map((group) => (
              <tr key={group._id} className="border-b border-[#5C899D]/08 hover:bg-[#5C899D]/04 transition-all flex w-full items-center">
                <td className="px-4 py-3 text-[14px] text-[#2e5a6e] font-medium flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#5C899D]/10 flex items-center justify-center text-[#5C899D] shrink-0">
                      <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none">
                        <circle cx="5" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                        <circle cx="11" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M1 13c0-2.21 1.79-3.5 4-3.5s4 1.29 4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M11 9.5c1.5 0 4 .79 4 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="truncate">{group.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 w-28 shrink-0">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => setInfoModal({ type: "group", data: group })} title="Info" className="p-1.5 rounded-lg text-[#5C899D] hover:bg-[#5C899D]/10 transition-all"><InfoIcon /></button>
                    <button onClick={() => openEdit("group", group)} title="Edit" className="p-1.5 rounded-lg text-[#5C899D] hover:bg-[#5C899D]/10 transition-all"><EditIcon /></button>
                    <button onClick={() => deleteGroup(group._id)} title="Delete" className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-all"><DeleteIcon /></button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredGroups.length === 0 && (
              <tr className="flex w-full">
                <td className="px-4 py-6 text-[13px] text-[#5C899D]/40 text-center w-full">No groups found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Info Modal */}
      {infoModal && (
        <div style={backdropStyle} className="fixed inset-0 bg-[#2e5a6e]/30 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setInfoModal(null)}>
          <div style={cardStyle} className="bg-white rounded-2xl w-full max-w-sm border border-[#5C899D]/15 shadow-[0_8px_48px_rgba(92,137,157,0.2)] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-[#5C899D]/15 flex items-start justify-between">
              <div>
                <p className="text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-0.5">
                  {infoModal.type === "student" ? "Student Info" : infoModal.type === "teacher" ? "Teacher Info" : "Group Info"}
                </p>
                <h3 className="text-[22px] font-medium text-[#2e5a6e]">{infoModal.data.name}</h3>
              </div>
              <button onClick={() => setInfoModal(null)} className="p-1.5 rounded-lg text-[#5C899D]/50 hover:bg-[#5C899D]/10 hover:text-[#5C899D] transition-all"><CloseIcon /></button>
            </div>
            <div className="p-6 flex flex-col gap-3">
              {infoModal.type === "student" && (
                <>
                  <div className="bg-[#FFFCEF] rounded-xl px-4 py-3 border border-[#5C899D]/10">
                    <p className="text-[10px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-1">Email</p>
                    <p className="text-[15px] font-medium text-[#2e5a6e]">{infoModal.data.email}</p>
                  </div>
                  <div className="bg-[#FFFCEF] rounded-xl px-4 py-3 border border-[#5C899D]/10">
                    <p className="text-[10px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-1">Group</p>
                    <p className="text-[15px] font-medium text-[#2e5a6e]">{infoModal.data.group?.name || "—"}</p>
                  </div>
                  <div className="bg-[#FFFCEF] rounded-xl px-4 py-3 border border-[#5C899D]/10">
                    <p className="text-[10px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-1">Teacher</p>
                    <p className="text-[15px] font-medium text-[#2e5a6e]">{infoModal.data.group?.teacher?.name || "—"}</p>
                  </div>
                </>
              )}
              {infoModal.type === "teacher" && (
                <>
                  <div className="bg-[#FFFCEF] rounded-xl px-4 py-3 border border-[#5C899D]/10">
                    <p className="text-[10px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-1">Email</p>
                    <p className="text-[15px] font-medium text-[#2e5a6e]">{infoModal.data.email}</p>
                  </div>
                  <div className="bg-[#FFFCEF] rounded-xl px-4 py-3 border border-[#5C899D]/10">
                    <p className="text-[10px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-1">Students</p>
                    <p className="text-[15px] font-medium text-[#2e5a6e]">{students.filter((s) => s.group?.teacher?._id === infoModal.data._id).length} students</p>
                  </div>
                  <div className="bg-[#FFFCEF] rounded-xl px-4 py-3 border border-[#5C899D]/10">
                    <p className="text-[10px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-1">Groups</p>
                    <p className="text-[15px] font-medium text-[#2e5a6e]">{groups.filter((g) => g.teacher?._id === infoModal.data._id).length} groups</p>
                  </div>
                </>
              )}
              {infoModal.type === "group" && (
                <>
                  <div className="bg-[#FFFCEF] rounded-xl px-4 py-3 border border-[#5C899D]/10">
                    <p className="text-[10px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-1">Time</p>
                    <p className="text-[15px] font-medium text-[#2e5a6e]">{infoModal.data.time}</p>
                  </div>
                  <div className="bg-[#FFFCEF] rounded-xl px-4 py-3 border border-[#5C899D]/10">
                    <p className="text-[10px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-1">Teacher</p>
                    <p className="text-[15px] font-medium text-[#2e5a6e]">{infoModal.data.teacher?.name || "—"}</p>
                  </div>
                  <div className="bg-[#FFFCEF] rounded-xl px-4 py-3 border border-[#5C899D]/10">
                    <p className="text-[10px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-1">Students</p>
                    <p className="text-[15px] font-medium text-[#2e5a6e]">{students.filter((s) => s.group?._id === infoModal.data._id).length} students</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div style={backdropStyle} className="fixed inset-0 bg-[#2e5a6e]/30 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setEditModal(null)}>
          <div style={cardStyle} className="bg-white rounded-2xl w-full max-w-sm border border-[#5C899D]/15 shadow-[0_8px_48px_rgba(92,137,157,0.2)] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-5 border-b border-[#5C899D]/15 flex items-start justify-between">
              <div>
                <p className="text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-0.5">Editing</p>
                <h3 className="text-[22px] font-medium text-[#2e5a6e]">{editModal.data.name}</h3>
              </div>
              <button onClick={() => setEditModal(null)} className="p-1.5 rounded-lg text-[#5C899D]/50 hover:bg-[#5C899D]/10 hover:text-[#5C899D] transition-all"><CloseIcon /></button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div>
                <label className={labelClass}>Name</label>
                <input className={inputClass} value={editForm.name || ""} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} placeholder="Name" />
              </div>
              {(editModal.type === "student" || editModal.type === "teacher") && (
                <div>
                  <label className={labelClass}>Email</label>
                  <input className={inputClass} value={editForm.email || ""} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} placeholder="Email" />
                </div>
              )}
              {editModal.type === "group" && (
                <div>
                  <label className={labelClass}>Time</label>
                  <input className={inputClass} value={editForm.time || ""} onChange={(e) => setEditForm({ ...editForm, time: e.target.value })} placeholder="e.g. Mon 10:00" />
                </div>
              )}
              <button
                onClick={submitEdit}
                disabled={saving}
                className="w-full py-3 text-[15px] font-medium bg-[#5C899D] text-[#FFFCEF] rounded-xl hover:bg-[#4a7285] active:scale-[0.98] transition-all mt-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="30" strokeDashoffset="10" />
                    </svg>
                    Saving...
                  </span>
                ) : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminsHome;