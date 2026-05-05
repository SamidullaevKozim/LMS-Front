import React from "react";
import { useForm } from "react-hook-form";
import instance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login = ({ setToken, setDecode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let res = await instance.post("/login", data);
      const token = res.data.token;

      localStorage.setItem("token", token);

      setToken(token);
      setDecode(jwtDecode(token));

      alert("Log in successful");

      navigate("/layout");
    } catch (err) {
      alert(err?.response?.data?.message);
    }
  };

  return (
    <div className=" h-[100vh] flex items-center justify-center bg-[#FFFCEF] p-8">
      <div className="bg-white rounded-2xl p-10 w-[360px] border border-[#5C899D]/15 shadow-[0_4px_32px_rgba(92,137,157,0.10)]">
        <div className="flex gap-1.5 mb-8">
          <div className="w-2 h-2 rounded-full bg-[#5C899D]" />
          <div className="w-2 h-2 rounded-full bg-[#5C899D]/20" />
          <div className="w-2 h-2 rounded-full bg-[#5C899D]/20" />
        </div>

        <p className="text-[11px] font-medium tracking-widest uppercase text-[#5C899D] mb-1">
          Welcome back
        </p>
        <h1 className="text-[26px] font-medium text-[#2e5a6e] tracking-tight mb-1">
          Log in
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="mb-5">
            <label className="block text-xs font-medium text-[#5C899D] mb-1.5 tracking-wide">
              Email
            </label>
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40"
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
                <path d="M1 6l7 4 7-4" stroke="#5C899D" strokeWidth="1.5" />
              </svg>
              <input
                {...register("email", { required: true })}
                type="text"
                placeholder="you@example.com"
                className="w-full pl-9 pr-4 py-3 text-sm border-[1.5px] border-[#5C899D]/20 rounded-xl bg-[#FFFCEF] text-[#2e5a6e] placeholder:text-[#5C899D]/45 focus:outline-none focus:border-[#5C899D] focus:ring-2 focus:ring-[#5C899D]/12 focus:bg-white transition-all"
              />
            </div>
            {errors.email && (
              <span className="text-[11.5px] text-red-500 mt-1 block">
                This field is required
              </span>
            )}
          </div>

          <div className="mb-9">
            <label className="block text-xs font-medium text-[#5C899D] mb-1.5 tracking-wide">
              Password
            </label>
            <div className="relative">
              <svg
                className=" absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40"
                viewBox="0 0 16 16"
                fill="none"
              >
                <rect
                  x="3"
                  y="7"
                  width="10"
                  height="7"
                  rx="1.5"
                  stroke="#5C899D"
                  strokeWidth="1.5"
                />
                <path
                  d="M5 7V5a3 3 0 016 0v2"
                  stroke="#5C899D"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <input
                {...register("password", { required: true })}
                type="password"
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-3 text-sm border-[1.5px] border-[#5C899D]/20 rounded-xl bg-[#FFFCEF] text-[#2e5a6e] placeholder:text-[#5C899D]/45 focus:outline-none focus:border-[#5C899D] focus:ring-2 focus:ring-[#5C899D]/12 focus:bg-white transition-all"
              />
            </div>
            {errors.password && (
              <span className="text-[11.5px] text-red-500 mt-1 block">
                This field is required
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 text-[15px] font-medium bg-[#5C899D] text-[#FFFCEF] rounded-xl hover:bg-[#4a7285] active:scale-[0.98] transition-all"
          >
            Submit
          </button>
        </form>
        </div>
      </div>
  );
};

export default Login;
