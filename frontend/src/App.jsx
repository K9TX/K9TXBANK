import { BrowserRouter as Router } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import AppRoutes from "./routes/routes";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { NotificationProvider } from "./context/NotificationContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <NotificationProvider>
        
        <AppRoutes />
        

        <Toaster />
        </NotificationProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
