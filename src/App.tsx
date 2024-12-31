import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RootLayout from "@/components/RootLayout";
import About from "@/pages/About";
import Auth from "@/pages/Auth";
import CodeAnalyzer from "@/pages/CodeAnalyzer";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import ResetPassword from "@/pages/ResetPassword";
import UpdatePassword from "@/pages/UpdatePassword";
import Pricing from "@/pages/Pricing";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<CodeAnalyzer />} />
          <Route path="/about" element={<About />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/subscription/success" element={<Navigate to="/" replace />} />
          <Route path="/subscription/cancel" element={<Navigate to="/pricing" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
