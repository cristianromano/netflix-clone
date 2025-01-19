
import { useAuthStore } from "../../store/authStore";
import { HomeScreen } from "./HomeScreen.jsx";
import { AuthScreen } from "./authScreen.jsx";
export const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="hero-bg h-screen">

      {!user ? <AuthScreen /> : <HomeScreen />}
    </div>
  );
};
