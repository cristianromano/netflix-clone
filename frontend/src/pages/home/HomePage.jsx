import { useAuthStore } from "../../store/authStore";
import { HomeScreen } from "./HomeScreen";
import { AuthScreen } from "./authScreen";
export const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="hero-bg h-screen">
      {!user ? <AuthScreen /> : <HomeScreen />}
    </div>
  );
};
