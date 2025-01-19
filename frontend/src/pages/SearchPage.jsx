import { useState } from "react";
import axios from "axios";
import { useContentStore } from "../store/content";
import toast from "react-hot-toast";
import { Navbar } from "../components/Navbar";
import { Loader, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";

export const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("movies");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setContent } = useContentStore();

  const handleTabClick = (tab) => {
    tab === "movies" ? setContent("movies") : setContent("tv");
    setActiveTab(tab);
    setSearchResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    let tab = "";
    if (activeTab === "movies") {
      tab = "movie";
    } else if (activeTab === "tv") {
      tab = "tv";
    } else {
      tab = "person";
    }

    try {
      const response = await axios.get(`/api/v1/search/${tab}/${searchTerm}`);
      setSearchResults(response.data.content);
      setLoading(false);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "No se encontró nada, asegúrate de estar buscando en la categoría correcta"
        );
      } else {
        toast.error("Ocurrió un error, por favor intenta nuevamente más tarde");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "movies" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("movies")}
          >
            Peliculas
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "tv" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("tv")}
          >
            TV Shows
          </button>
          <button
            className={`py-2 px-4 rounded ${
              activeTab === "person" ? "bg-red-600" : "bg-gray-800"
            } hover:bg-red-700`}
            onClick={() => handleTabClick("person")}
          >
            Persona
          </button>
        </div>

        <form
          className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={"Ingrese lo que desea buscar"}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>

        {loading && (
          <div className="flex items-center justify-center bg-black h-full">
            <Loader className="animate-spin text-red-600 size-10" />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchResults.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;

            return (
              <div key={result.id} className="bg-gray-800 p-4 rounded">
                {activeTab === "person" ? (
                  <div className="flex flex-col items-center">
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.profile_path}
                      alt={result.name}
                      className="max-h-96 rounded mx-auto"
                    />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </div>
                ) : (
                  <Link
                    to={"/watch/" + result.id}
                    onClick={() => {
                      setContent(activeTab);
                    }}
                  >
                    <img
                      src={ORIGINAL_IMG_BASE_URL + result.poster_path}
                      alt={result.title || result.name}
                      className="w-full h-auto rounded"
                    />
                    <h2 className="mt-2 text-xl font-bold">
                      {result.title || result.name}
                    </h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
