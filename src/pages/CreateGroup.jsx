import { useForm } from "react-hook-form";
import instance from "../utils/axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const [teachers, setTeachers] = useState([]);
  let nav = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await instance.post("/groups", data);
      toast.success("Group created");
      nav("/")
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  useEffect(() => {
    instance.get("/teachers").then((res) => {
      setTeachers(res.data);
    });
  }, []);

  return (
    <div className="h-[100vh] flex items-center justify-center bg-[#FFFCEF] p-8">
      <div className="bg-white rounded-2xl p-10 w-[360px] border border-[#5C899D]/15 shadow-[0_4px_32px_rgba(92,137,157,0.10)]">
        {/* Top dots */}
        <div className="flex gap-1.5 mb-8">
          <div className="w-2 h-2 rounded-full bg-[#5C899D]" />
          <div className="w-2 h-2 rounded-full bg-[#5C899D]/20" />
          <div className="w-2 h-2 rounded-full bg-[#5C899D]/20" />
        </div>

        <p className="text-[12px] font-medium tracking-widest uppercase text-[#5C899D] mb-1">
          New
        </p>
        <h1 className="text-[30px] font-medium text-[#2e5a6e] tracking-tight mb-1">
          Create group
        </h1>
        <p className="text-[15px] text-[#5C899D]/70 mb-8">
          Fill in the details below
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Name */}
          <div className="mb-5">
            <label className="block text-[13px] font-medium text-[#5C899D] mb-1.5 tracking-wide">
              Name
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40"
                viewBox="0 0 16 16"
                fill="none"
              >
                <circle
                  cx="8"
                  cy="5"
                  r="3"
                  stroke="#5C899D"
                  strokeWidth="1.5"
                />
                <path
                  d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5"
                  stroke="#5C899D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="Group name"
                className="w-full pl-9 pr-4 py-3 text-[15px] border-[1.5px] border-[#5C899D]/20 rounded-xl bg-[#FFFCEF] text-[#2e5a6e] placeholder:text-[#5C899D]/45 focus:outline-none focus:border-[#5C899D] focus:ring-2 focus:ring-[#5C899D]/12 focus:bg-white transition-all"
              />
            </div>
            {errors.name && (
              <span className="text-[13px] text-red-500 mt-1 block">
                This field is required
              </span>
            )}
          </div>

          {/* Time */}
          <div className="mb-5">
            <label className="block text-[13px] font-medium text-[#5C899D] mb-1.5 tracking-wide">
              Time
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40"
                viewBox="0 0 16 16"
                fill="none"
              >
                <circle
                  cx="8"
                  cy="8"
                  r="6"
                  stroke="#5C899D"
                  strokeWidth="1.5"
                />
                <path
                  d="M8 5v3.5l2.5 1.5"
                  stroke="#5C899D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                {...register("time", { required: true })}
                type="text"
                placeholder="e.g. Mon 10:00"
                className="w-full pl-9 pr-4 py-3 text-[15px] border-[1.5px] border-[#5C899D]/20 rounded-xl bg-[#FFFCEF] text-[#2e5a6e] placeholder:text-[#5C899D]/45 focus:outline-none focus:border-[#5C899D] focus:ring-2 focus:ring-[#5C899D]/12 focus:bg-white transition-all"
              />
            </div>
            {errors.time && (
              <span className="text-[13px] text-red-500 mt-1 block">
                This field is required
              </span>
            )}
          </div>

          {/* Teacher */}
          <div className="mb-6">
            <label className="block text-[13px] font-medium text-[#5C899D] mb-1.5 tracking-wide">
              Teacher
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 pointer-events-none"
                viewBox="0 0 16 16"
                fill="none"
              >
                <rect
                  x="1"
                  y="3"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="#5C899D"
                  strokeWidth="1.5"
                />
                <path
                  d="M4 7h8M4 10h5"
                  stroke="#5C899D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <select
                {...register("teacher")}
                className="w-full pl-9 pr-8 py-3 text-[15px] border-[1.5px] border-[#5C899D]/20 rounded-xl bg-[#FFFCEF] text-[#2e5a6e] focus:outline-none focus:border-[#5C899D] focus:ring-2 focus:ring-[#5C899D]/12 focus:bg-white transition-all appearance-none cursor-pointer"
              >
                {teachers?.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.name}
                  </option>
                ))}
              </select>
              <svg
                className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40 pointer-events-none"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M4 6l4 4 4-4"
                  stroke="#5C899D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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

export default CreateGroup;
