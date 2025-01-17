import { Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/home/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import "./App.css";
import { Footer } from "./components/Footer";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

function App() {
  const { isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  // if (isCheckingAuth) {
  //   return (
  //     <div className="flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white border-solid"></div>
  //     </div>
  //   );
  // }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<SignUpPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
