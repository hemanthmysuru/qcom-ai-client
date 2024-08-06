import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/Login/LoginPage";
import HomePage from "../pages/Home/HomePage";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "../pages/Admin/AdminPage";
import { useAuth } from "../context/AuthContext";
import PublicLayout from "../layouts/public/PublicLayout";
import ProtectedLayout from "../layouts/protected/ProtectedLayout";
import AlertsPage from "../pages/Alerts/AlertsPage";
import UiElementsPage from "../pages/UiElements/UiElementsPage";
import AnalyticsPage from "../pages/Analytics/AnalyticsPage";
import ConfigurationsPage from "../pages/Configurations/ConfigurationsPage";

const AppRoutes: React.FC = () => {
    // const isAuthenticated = true; // Replace with actual authentication logic
    const { isAuthenticated, user } = useAuth();
    const userPermissions: string[] = ['admin']; // Replace with actual user permissions

    return (
        // <BrowserRouter>

        <Routes>

            <Route element={<PublicLayout />}>
                <Route path="/" element={<PublicRoute isAuthenticated={isAuthenticated} />}>
                    <Route index element={<HomePage />} />
                    <Route path="login" element={<LoginPage />} />
                    <Route path="ui-elements" element={<UiElementsPage />} />
                </Route>
            </Route>

            <Route element={<ProtectedLayout />}>
                <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
                    {/* <Route index element={<DashboardPage />} /> */}
                    <Route index element={<AlertsPage />} />
                    <Route path="alerts" element={<AlertsPage />} />
                    <Route path="analytics" element={<AnalyticsPage />} />
                    <Route path="configurations" element={<ConfigurationsPage />} />
                </Route>

                <Route path="admin" element={<ProtectedRoute isAuthenticated={isAuthenticated} requiredPermission="admin" userPermissions={userPermissions} />}>
                    <Route index element={<AdminPage />} />
                    {/* <Route index element={<AlertsPage />} /> */}
                    {/* <Route path="alerts" element={<AlertsPage />} /> */}
                    {/* <Route index element={<AdminPage />} />
                    <Route path="overview" element={<Overview />} />
                    <Route path="settings" element={<Settings />} /> */}
                </Route>
            </Route>



        </Routes>

        // </BrowserRouter>
    );
}

export default AppRoutes;