import { useForm } from "react-hook-form";
import instance from "../utils/axios";
import { useEffect, useState } from "react";

const StudentRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let [teacher, setTeacher] = useState([]);
  let [group, setGroup] = useState([]);

  const onSubmit = async (data) => {
    try {
      await instance.post("/register", { ...data, role: "STUDENT" });
      alert("registered");
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    instance.get("/teachers").then((res) => {
      setTeacher(res.data);
    });
  }, []);

  useEffect(() => {
    instance.get("/groups").then((res) => {
      setGroup(res.data);
    });
  }, []);

  return (
    <div className="min-h-[580px] flex items-center justify-center bg-[#FFFCEF] p-2">
      <div className="bg-white rounded-2xl p-10 w-[360px] border border-[#5C899D]/15 shadow-[0_4px_32px_rgba(92,137,157,0.10)]">

        {/* Top dots */}
        <div className="flex gap-1.5 mb-8">
          <div className="w-2 h-2 rounded-full bg-[#5C899D]" />
          <div className="w-2 h-2 rounded-full bg-[#5C899D]/20" />
          <div className="w-2 h-2 rounded-full bg-[#5C899D]/20" />
        </div>

        <p className="text-[12px] font-medium tracking-widest uppercase text-[#5C899D] mb-1">New student</p>
        <h1 className="text-[30px] font-medium text-[#2e5a6e] tracking-tight mb-1">Register student</h1>
        <p className="text-[15px] text-[#5C899D]/70 mb-8">Fill in the student's details below</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">

          {/* Name */}
          <div className="mb-5">
            <label className="block text-[13px] font-medium text-[#5C899D] mb-1.5 tracking-wide">Name</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 pointer-events-none" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="5" r="3" stroke="#5C899D" strokeWidth="1.5"/>
                <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#5C899D" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Full name"
                className="w-full pl-9 pr-4 py-3 text-[15px] border-[1.5px] border-[#5C899D]/20 rounded-xl bg-[#FFFCEF] text-[#2e5a6e] placeholder:text-[#5C899D]/45 focus:outline-none focus:border-[#5C899D] focus:ring-2 focus:ring-[#5C899D]/12 focus:bg-white transition-all"
              />
            </div>
            {errors.name && <span className="text-[13px] text-red-500 mt-1 block">This field is required</span>}
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-[13px] font-medium text-[#5C899D] mb-1.5 tracking-wide">Email</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 pointer-events-none" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="3" width="14" height="10" rx="2" stroke="#5C899D" strokeWidth="1.5"/>
                <path d="M1 6l7 4 7-4" stroke="#5C899D" strokeWidth="1.5"/>
              </svg>
              <input
                {...register("email", { required: true })}
                type="text"
                placeholder="you@example.com"
                className="w-full pl-9 pr-4 py-3 text-[15px] border-[1.5px] border-[#5C899D]/20 rounded-xl bg-[#FFFCEF] text-[#2e5a6e] placeholder:text-[#5C899D]/45 focus:outline-none focus:border-[#5C899D] focus:ring-2 focus:ring-[#5C899D]/12 focus:bg-white transition-all"
              />
            </div>
            {errors.email && <span className="text-[13px] text-red-500 mt-1 block">This field is required</span>}
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-[13px] font-medium text-[#5C899D] mb-1.5 tracking-wide">Password</label>
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 pointer-events-none" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="#5C899D" strokeWidth="1.5"/>
                <path d="M5 7V5a3 3 0 016 0v2" stroke="#5C899D" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <input
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                placeholder="Min. 6 characters"
                className="w-full pl-9 pr-4 py-3 text-[15px] border-[1.5px] border-[#5C899D]/20 rounded-xl bg-[#FFFCEF] text-[#2e5a6e] placeholder:text-[#5C899D]/45 focus:outline-none focus:border-[#5C899D] focus:ring-2 focus:ring-[#5C899D]/12 focus:bg-white transition-all"
              />
            </div>
            {errors.password && <span className="text-[13px] text-red-500 mt-1 block">This field is required</span>}
          </div>

          {/* Group & Teacher */}
          <div className="grid grid-cols-2 gap-3 mb-6">

            {/* Group */}
            <div>
              <label className="block text-[13px] font-medium text-[#5C899D] mb-1.5 tracking-wide">Group</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 pointer-events-none" viewBox="0 0 16 16" fill="none">
                  <circle cx="5" cy="5" r="2.5" stroke="#5C899D" strokeWidth="1.5"/>
                  <circle cx="11" cy="5" r="2.5" stroke="#5C899D" strokeWidth="1.5"/>
                  <path d="M1 13c0-2.21 1.79-3.5 4-3.5s4 1.29 4 3.5" stroke="#5C899D" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M11 9.5c1.5 0 4 .79 4 3.5" stroke="#5C899D" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <select
                  {...register("group", { required: true })}
                  className="w-full pl-9 pr-8 py-3 text-[15px] border-[1.5px] border-[#5C899D]/20 rounded-xl bg-[#FFFCEF] text-[#2e5a6e] focus:outline-none focus:border-[#5C899D] focus:ring-2 focus:ring-[#5C899D]/12 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  {group?.map((g) => (
                    <option key={g._id} value={g._id}>{g.name}</option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 pointer-events-none" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="#5C899D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {errors.group && <span className="text-[12px] text-red-500 mt-1 block">Required</span>}
            </div>

            {/* Teacher */}
            <div>
              <label className="block text-[13px] font-medium text-[#5C899D] mb-1.5 tracking-wide">Teacher</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 pointer-events-none" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="5" r="3" stroke="#5C899D" strokeWidth="1.5"/>
                  <path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5" stroke="#5C899D" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M11 2l3 3-3 3" stroke="#5C899D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <select
                  {...register("teacher", { required: true })}
                  className="w-full pl-9 pr-8 py-3 text-[15px] border-[1.5px] border-[#5C899D]/20 rounded-xl bg-[#FFFCEF] text-[#2e5a6e] focus:outline-none focus:border-[#5C899D] focus:ring-2 focus:ring-[#5C899D]/12 focus:bg-white transition-all appearance-none cursor-pointer"
                >
                  {teacher?.map((t) => (
                    <option key={t._id} value={t._id}>{t.name}</option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 pointer-events-none" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="#5C899D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              {errors.teacher && <span className="text-[12px] text-red-500 mt-1 block">Required</span>}
            </div>

          </div>

          <button
            type="submit"
            className="w-full py-3 text-[16px] font-medium bg-[#5C899D] text-[#FFFCEF] rounded-xl hover:bg-[#4a7285] active:scale-[0.98] transition-all"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};

export default StudentRegister;