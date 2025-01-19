import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url('/src/assets/404.png')` }}
    >
      <header className="absolute top-0 left-0 p-4 bg-black w-full">
        <Link to={"/"}>
          <img
            src="/src/assets/netflix-logo.png"
            alt="Netflix"
            className="h-8"
          />
        </Link>
      </header>
      <main className="h-screen flex flex-col bg-cover bg-center justify-center items-center text-white">
        <h1 className="text-7xl font-semibold mb-4">¿Te has perdido?</h1>
        <p className="mb-6 text-xl">
          Lo sentimos, no podemos encontrar esa página. Encontrarás mucho para
          explorar en la página de inicio.
        </p>
        <Link to={"/"} className="bg-white text-black py-2 px-4 rounded">
          Página principal de Netflix
        </Link>
      </main>
    </div>
  );
};
