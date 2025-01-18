import { LogOut, Menu, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const Navbar = () => {
  const { isMobileMenuOpen, setIsMobileMenuOpen } = useState(false);
  const { user, logout } = useAuthStore();
  const handleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to={"/"}>
          <img
            src="/src/assets/netflix-logo.png"
            alt="Netflix Logo"
            className="w-32 md:w-52"
          />
        </Link>

        <div className="hidden sm:flex gap-2 items-center">
          <Link to={"/"} className="text-white hover:underline">
            Peliculas
          </Link>
          <Link to={"/"} className=" text-white hover:underline">
            Series
          </Link>
          <Link to={"/history"} className="text-white hover:underline">
            Buscador
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2 z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer text-white" />
        </Link>
        <img
          src={"/src/assets/" + user.image}
          alt="user-img"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut className="size-6 cursor-pointer text-white" onClick={logout} />

        <div className="sm:hidden">
          <Menu
            className="size-6 cursor-pointer text-white"
            onClick={handleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to={"/"}
            className="text-white hover:underline"
            onClick={handleMobileMenu}
          >
            Peliculas
          </Link>
          <Link
            to={"/"}
            className="text-white hover:underline"
            onClick={handleMobileMenu}
          >
            Series
          </Link>
          <Link
            to={"/history"}
            className="text-white hover:underline"
            onClick={handleMobileMenu}
          >
            Buscador
          </Link>
        </div>
      )}
    </header>
  );
};
