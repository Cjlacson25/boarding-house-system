import LoginPage from "@/modules/public/pages/login/LoginPage";
import Dashboard from "@/modules/private/pages/dashboard/Dashboard";
import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Dashboard /> },
  { path: "login", element: <LoginPage /> },
]);

const RoutesIndex = () => {
  return (
    <Suspense
      fallback={<div className="flex min-h-screen flex-col">Loading...</div>}
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default RoutesIndex;
