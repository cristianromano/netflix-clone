import { useAuthStore } from "../../store/authStore";
import { AuthScreen } from "./authScreen";
import { HomeScreen } from "./HomeScreen.jsx";

export const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="hero-bg h-screen">
      {!user ? <AuthScreen /> : <HomeScreen />}
    </div>
  );
};
