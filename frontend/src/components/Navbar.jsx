import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
      <img
        src="/src/assets/netflix-logo.png"
        alt="Netflix Logo"
        className="w-32 md:w-52"
      />
      <Link to={"/login"} className="text-white bg-red-600 py-1 px-2 rounded">
        Logueate
      </Link>
    </header>
  );
};
