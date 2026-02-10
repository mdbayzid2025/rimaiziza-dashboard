import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Shared/ErrorPage";
import Dashboard from "../dashboard/Dashboard/Dashboard";
import Users from "../dashboard/Users/Users";
import AllCars from "../dashboard/Cars/AllCars";
import Hosts from "../dashboard/Hosts/Hosts";
import Bookings from "../dashboard/Booking/Bookings";
import Settings from "../dashboard/Setting/Setting";
import Login from "../auth/Login";
import ForgotPassword from "../auth/ForgotPassword";
import OTPVerifyPage from "../auth/OTPVerifyPage";
import NewPassword from "../auth/NewPassword";
import PrivateRoute from "./PrivateRouter";
import AdminManage from "../dashboard/Admin/Admins";

const router = createBrowserRouter([
    {
        path: "/",
        element: <PrivateRoute> <MainLayout /></PrivateRoute>,
        // element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Dashboard />
            },
          
            {
                path: "cars",
                element: <AllCars />
            },
            {
                path: "hosts",
                element: <Hosts />
            },
              {
                path: "users",
                element: <Users />
            },
            {
                path: "admins",
                element: <AdminManage />
            },
            {
                path: "bookings",
                element: <Bookings />
            },
            {
                path: "setting",
                element: <Settings />
            },
        ]
    },
    { path: "/login", element: <Login /> },
    { path: "/forgot-password", element: <ForgotPassword /> },
    { path: "/otp-verify", element: <OTPVerifyPage /> },
    { path: "/new-password", element: <NewPassword /> },
])

export default router;