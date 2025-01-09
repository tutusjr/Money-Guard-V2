import LoginForm from "../../components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
      <div className="min-h-screen flex items-center justify-center px-4">
        <LoginForm />
      </div>
    </div>
  );
}
