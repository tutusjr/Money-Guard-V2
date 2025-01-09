import React from "react";
import RegistrationForm from "../../components/auth/RegisterForm";

const RegistrationPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900">
      <div className="min-h-screen flex items-center justify-center px-4">
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;
