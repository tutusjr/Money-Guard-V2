import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../../validations/LoginFormVal";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/auth/operations";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (loginData) => {
    const response = await dispatch(login(loginData));

    if (response.meta.requestStatus === "fulfilled"){
        toast.success("Login successful, you are being redirected.");
    }
    if (response.meta.requestStatus === "rejected"){
        toast.error("Username or password is incorrect.");
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-2">Money Guard</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              {...register("email")}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-500/30 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-white/50 transition-colors"
              placeholder="E-mail"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              {...register("password")}
              type="password"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-500/30 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-white/50 transition-colors"
              placeholder="Password"
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-400">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-orange-400 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          LOG IN
        </button>

        <button
          type="button"
          className="w-full py-3 px-4 bg-white text-purple-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          onClick={(_) => navigate("/registration")}
        >
          REGISTER
        </button>
      </form>
    </div>
  );
}
