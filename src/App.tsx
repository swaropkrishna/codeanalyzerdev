import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";
import SummaryDetail from "./pages/SummaryDetail";
import Account from "./pages/Account";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/summary/:id" element={<SummaryDetail />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;