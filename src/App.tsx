import { createBrowserRouter } from "react-router-dom";
import CodeAnalyzer from "@/pages/CodeAnalyzer";
import Auth from "@/pages/Auth";
import Pricing from "@/pages/Pricing";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CodeAnalyzer />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
]);

export default router;