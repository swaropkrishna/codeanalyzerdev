import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Privacy from "@/pages/Privacy";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Account from "@/pages/Account";
import History from "@/pages/History";
import SummaryDetail from "@/pages/SummaryDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/summary/:id",
    element: <SummaryDetail />,
  },
]);

export default router;