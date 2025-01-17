import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { HomeScreen } from "./HomeScreen";
import { AuthScreen } from "./authScreen";
export const HomePage = () => {
  const { user, isCheckingAuth, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white border-solid"></div>
      </div>
    );
  }

  return (
    <div className="hero-bg h-screen">
      {!user ? <AuthScreen /> : <HomeScreen />}
    </div>
  );
};
