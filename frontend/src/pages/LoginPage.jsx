import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoadingLogin } = useAuthStore();
  const handleSubmit = async (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"}>
          <img src="/src/assets/netflix-logo.png" alt="logo" className="w-52" />
        </Link>
      </header>
      <div className="flex items-center justify-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60  rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            Ingreso
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                id="email"
                type="email"
                placeholder="Ingrese email"
                className="w-full px-3 py-2 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                id="password"
                type="password"
                placeholder="Ingrese contraseña"
                className="w-full px-3 py-2 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-red-600"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button
                type="submit"
                className="w-full p-3 bg-red-600 text-white font-bold rounded"
              >
                {isLoadingLogin ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-white border-solid"></div>
                  </div>
                ) : (
                  "Ingresar"
                )}
              </button>
            </div>
            <div>
              <p className="text-white text-center py-4">
                ¿No tienes una cuenta?{" "}
                <Link to={"/register"} className="text-red-600">
                  Registrate
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
