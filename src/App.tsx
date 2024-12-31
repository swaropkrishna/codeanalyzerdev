import { createBrowserRouter } from "react-router-dom";
import CodeAnalyzer from "@/pages/CodeAnalyzer";
import Auth from "@/pages/Auth";
import ResetPassword from "@/pages/ResetPassword";
import Pricing from "@/pages/Pricing";
import About from "@/pages/About";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Contact from "@/pages/Contact";
import RootLayout from "@/components/RootLayout";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <CodeAnalyzer />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/auth/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
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
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },
]);

export default router;