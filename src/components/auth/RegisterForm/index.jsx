import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../../validations/RegistrationFormVal";
import { useDispatch } from "react-redux";
import { register as registerOperation } from "../../../redux/auth/operations";
import { Mail, Lock, User } from "lucide-react";
import { useNavigate } from "react-router";
import { usePasswordStrength } from "../../../hooks/usePasswordStrength";
import toast from "react-hot-toast";

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const password = watch("password", "");
  const passwordStrength = usePasswordStrength(password);

  const getStrengthColor = (strength) => {
    if (strength <= 2) return "bg-red-500";
    if (strength <= 4) return "bg-yellow-500";
    return "bg-green-500";
  };

  const onSubmit = async (registerData) => {

    const response = await dispatch(
      registerOperation({
        username: registerData.username,
        email: registerData.email,
        password: registerData.password,
      })
    );
    if(response.meta.requestStatus === "fulfilled"){
      toast.success("Registration successful, you are being redirected.");
      navigate("/login");
    }
    if(response.meta.requestStatus === "rejected"){
      toast.error("An error occurred. Please try again later.");
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
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              {...register("username")}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-500/30 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-white/50 transition-colors"
              placeholder="Username"
            />
          </div>
          {errors.username && (
            <p className="text-sm text-red-400">{errors.username.message}</p>
          )}
        </div>
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
        <div className="space-y-1">
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              {...register("retryPassword")}
              type="password"
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-gray-500/30 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:border-white/50 transition-colors"
              placeholder="Retry password"
            />
          </div>
          {errors.retryPassword && (
            <p className="text-sm text-red-400">
              {errors.retryPassword.message}
            </p>
          )}
          <div className="p-2">
            <div className="h-1 w-full bg-gray-300 rounded-full mt-2">
              <div
                className={`h-full rounded-full transition-all duration-300 ${getStrengthColor(
                  passwordStrength
                )}`}
                style={{ width: `${(passwordStrength / 6) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-orange-400 to-pink-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          REGISTER
        </button>

        <button
          type="button"
          className="w-full py-3 px-4 bg-white text-purple-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          onClick={(_) => navigate("/login")}
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}
