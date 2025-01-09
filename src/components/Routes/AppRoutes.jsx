import { Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router";
import Layout from "../Layout/index";
import DefaultRoutes from "./DefaultRoutes";
import PrivateRoutes from "./PrivateRoutes";
import DashboardLayout from "../DashboardLayout";

const LoginPage = lazy(() => import("../../pages/LoginPage"));
const RegistirationPage = lazy(() => import("../../pages/RegistrationPage"));
const Home = lazy(() => import("../Home"));
const DashboardPage = lazy(() => import("../../pages/DashboardPage"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage"));
const StatisticsTab = lazy(()=>import('../../components/StaticDashboard/StaticTab/StatisticsTab'))
const CurrencyControl = lazy(() => import("../CurrencyControl"));
const CurrencyTab = lazy(() => import("../Sidebar/Currency"));
export default function AppRoutes() {
  return (
    <Suspense>
      <Routes>
        <Route element={<Layout />}>
          <Route element={<DefaultRoutes />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistirationPage />} />
          </Route>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route element={<PrivateRoutes />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />}>
                <Route index element={<Navigate to="home" />} />
                <Route path="home" element={<Home />} />
                <Route path="statics" element={<StatisticsTab />} />
                <Route element={<CurrencyControl/>} >
                  <Route path="currency" element={<CurrencyTab />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
