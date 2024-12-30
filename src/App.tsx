import { createBrowserRouter } from "react-router-dom";
import CodeAnalyzer from "@/pages/CodeAnalyzer";
import Auth from "@/pages/Auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CodeAnalyzer />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
]);

export default router;