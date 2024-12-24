import { createBrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";
import Privacy from "@/pages/Privacy";
import Auth from "@/pages/Auth";
import Dashboard from "@/pages/Dashboard";
import Account from "@/pages/Account";
import History from "@/pages/History";
import SummaryDetail from "@/pages/SummaryDetail";
import About from "@/pages/About";
import Terms from "@/pages/Terms";
import Contact from "@/pages/Contact";

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
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/terms",
    element: <Terms />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
]);

export default router;