import React, { useEffect, useState } from "react";
import instance from "../utils/axios";

const StudentsHome = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    instance.get("/students").then((res) => {
      setData(res.data);
    });
  }, []);

  const groupId = data[0]?.group?._id;

  const studentsInGroup = data.filter(
    (student) => student.group?._id === groupId,
  );

  return (
    <div className="p-8 bg-[#FFFCEF] h-screen flex flex-col">
      {/* Info cards on top */}
      <div className="flex gap-4 mb-8 shrink-0">
        <div className="flex-1 bg-white rounded-2xl px-6 py-4 border border-[#5C899D]/15 shadow-[0_4px_32px_rgba(92,137,157,0.08)]">
          <p className="text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-1">
            Group
          </p>
          <p className="text-[18px] font-medium text-[#2e5a6e]">
            {data[0]?.group?.name}
          </p>
        </div>

        <div className="flex-1 bg-white rounded-2xl px-6 py-4 border border-[#5C899D]/15 shadow-[0_4px_32px_rgba(92,137,157,0.08)]">
          <p className="text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-1">
            Teacher
          </p>
          <p className="text-[18px] font-medium text-[#2e5a6e]">
            {data[0]?.group?.teacher?.name}
          </p>
        </div>

        <div className="flex-1 bg-white rounded-2xl px-6 py-4 border border-[#5C899D]/15 shadow-[0_4px_32px_rgba(92,137,157,0.08)]">
          <p className="text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-1">
            Lesson Time
          </p>
          <p className="text-[18px] font-medium text-[#2e5a6e]">
            {data[0]?.group?.time}
          </p>
        </div>
      </div>

      {/* Students table */}
      <div className="bg-white rounded-2xl border border-[#5C899D]/15 shadow-[0_4px_32px_rgba(92,137,157,0.08)] overflow-hidden flex flex-col min-h-0">
        <div className="px-6 py-4 border-b border-[#5C899D]/15 shrink-0">
          <p className="text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50 mb-0.5">
            Members
          </p>
          <h2 className="text-[20px] font-medium text-[#2e5a6e]">
            Students in group
          </h2>
        </div>
        <div className="overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b border-[#5C899D]/10">
                <th className="text-left px-6 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50">
                  #
                </th>
                <th className="text-left px-6 py-2.5 text-[11px] font-medium tracking-widest uppercase text-[#5C899D]/50">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {studentsInGroup.map((student, index) => (
                <tr
                  key={student._id}
                  className="border-b border-[#5C899D]/08 hover:bg-[#5C899D]/04 transition-all"
                >
                  <td className="px-6 py-3 text-[13px] text-[#5C899D]/40 w-10">
                    {index + 1}
                  </td>
                  <td className="px-6 py-3 text-[15px] text-[#2e5a6e] font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-[#5C899D] flex items-center justify-center text-[#FFFCEF] text-[12px] font-medium shrink-0">
                        {student.name?.charAt(0).toUpperCase()}
                      </div>
                      {student.name}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentsHome;