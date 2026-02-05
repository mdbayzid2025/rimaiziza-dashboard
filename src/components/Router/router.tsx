import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Shared/ErrorPage";
import Dashboard from "../dashboard/Dashboard/Dashboard";
import Users from "../dashboard/Users/Users";
import AllVehicles from "../dashboard/Vehicles/Vehicles";
import Hosts from "../dashboard/Hosts/Hosts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Dashboard />
            },
            {
                path: "users",
                element: <Users />
            },
            {
                path: "vehicles",
                element: <AllVehicles />
            },
            {
                path: "hosts",
                element: <Hosts />
            },
        ]
    }
])

export default router;