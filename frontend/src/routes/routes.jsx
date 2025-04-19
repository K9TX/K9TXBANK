import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthContext as useAuth } from "../context/AuthContext.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import Deposit from "../pages/AccountManagementPages/DepositMoney.jsx";
import Transfer from "../pages/AccountManagementPages/TransferMoney.jsx";
import Transactions from "../pages/AccountManagementPages/Transaction.jsx";
import AdminUsers from "../pages/AdminUserManagement.jsx";
import Home from "../pages/Home.jsx";
import CheckBalance from "../pages/CheckBalance.jsx";
import Layout from "../layouts/Layout.jsx";
import ScrollToTop from "../utils/ScrollToTop.jsx";
import Contact from "../pages/Contact.jsx";
import Blog from "../pages/Blog.jsx";
import Users from "../pages/Users.jsx";
import UserProfile from "../pages/UserProfile.jsx";
import WithdrawMoney from "../pages/AccountManagementPages/WithdrawMoney.jsx";
import AboutUs from "../components/AboutUs.jsx";
import Loan from "../pages/Loan.jsx";
import LoanOptions from "../pages/LoanOptions.jsx";
import LoanStatus from "../pages/LoanStatus.jsx";
import ForgetPassword from "../pages/ForgetPassword.jsx";
import QRScanner from "../components/QRCode/QRScanner.jsx";
import Branding from "../pages/footer/Branding.jsx";
import Design from "../pages/footer/Design.jsx";
import Marketing from "../pages/footer/Marketing.jsx";
import Jobs from "../pages/footer/Jobs.jsx";
import PressKit from "../pages/footer/PressKit.jsx";
import TermsOfUse from "../pages/footer/TermsOfUse.jsx";
import AdminLoanManagement from "../pages/AdminLoanManagement.jsx";
import Error from "../pages/Error.jsx";

// Protected route component
const PrivateRoute = ({ element, allowedRoles }) => {
  const { authUser: user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return element;
};

const AppRoutes = () => {
  const { authUser: user, loading } = useAuth();

  if (loading) {
    <loading />;
  }
  
  return (
    <Router>
      <ScrollToTop />
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          {/* Footer Routes */}
          <Route path="/branding" element={<Branding />} />
          <Route path="/design" element={<Design />} />
          <Route path="/marketing" element={<Marketing />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/presskit" element={<PressKit />} />
          <Route path="/terms" element={<TermsOfUse />} />

          {/* User Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute
                element={user ? <Dashboard /> : <Navigate to="/login" />}
                allowedRoles={["user", "admin"]}
              />
            }
          />
          <Route
            path="/deposit"
            element={
              <PrivateRoute
                element={user ? <Deposit /> : <Navigate to="/login" />}
                allowedRoles={["user"]}
              />
            }
          />
          <Route
            path="/withdraw"
            element={
              <PrivateRoute
                element={user ? <WithdrawMoney /> : <Navigate to="/login" />}
                allowedRoles={["user"]}
              />
            }
          />
          <Route
            path="/transfer"
            element={
              <PrivateRoute
                element={user ? <Transfer /> : <Navigate to="/login" />}
                allowedRoles={["user"]}
              />
            }
          />
          <Route
            path="/loanoptions"
            element={
              <PrivateRoute
                element={user ? <LoanOptions /> : <Navigate to="/login" />}
                allowedRoles={["user", "admin"]}
              />
            }
          />
          <Route
            path="/loan"
            element={
              <PrivateRoute
                element={user ? <Loan /> : <Navigate to="/login" />}
                allowedRoles={["user", "admin"]}
              />
            }
          />
          <Route
            path="/loanstatus"
            element={
              <PrivateRoute
                element={user ? <LoanStatus /> : <Navigate to="/login" />}
                allowedRoles={["user", "admin"]}
              />
            }
          />
          <Route
            path="/transactions"
            element={
              <PrivateRoute
                element={user ? <Transactions /> : <Navigate to="/login" />}
                allowedRoles={["user"]}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute
                element={user ? <UserProfile /> : <Navigate to="/login" />}
                allowedRoles={["user", "admin"]}
              />
            }
          />
          <Route
            path="/checkBalance"
            element={
              <PrivateRoute
                element={user ? <CheckBalance /> : <Navigate to="/login" />}
                allowedRoles={["user", "admin"]}
              />
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute
                element={user ? <Transactions /> : <Navigate to="/login" />}
                allowedRoles={["user", "admin"]}
              />
            }
          />
          <Route
            path="/scan-QR"
            element={
              <PrivateRoute
                element={user ? <QRScanner /> : <Navigate to="/login" />}
                allowedRoles={["user", "admin"]}
              />
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <PrivateRoute
                element={user ? <AdminDashboard /> : <Navigate to="/login" />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/users"
            element={
              <PrivateRoute
                element={user ? <AdminUsers /> : <Navigate to="/login" />}
                allowedRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/loans"
            element={
              <PrivateRoute
                element={user ? <AdminLoanManagement /> : <Navigate to="/login" />}
                allowedRoles={["admin"]}
              />
            }
          />

          {/* 404 Page */}
          <Route path="*" element={<Error />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default AppRoutes;
