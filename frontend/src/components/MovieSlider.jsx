import { useEffect, useState, useRef } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const MovieSlider = ({ category }) => {
  const { content } = useContentStore();
  const [contentSearch, setcontentSearch] = useState([]);
  const [showArrowes, setShowArrowes] = useState(false);

  useEffect(() => {
    const res = async () => {
      try {
        const response = await axios.get(`/api/v1/${content}/${category}`);
        setcontentSearch(response.data.content);
      } catch (error) {
        console.error(error);
      }
    };

    res();
  }, [content, category]);

  const sliderRef = useRef(null);
  const formattedContentTitle = content === "movies" ? "Peliculas" : "Series";

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };
  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const spanishCategories = {
    now_playing: "Ahora mismo",
    popular: "Populares",
    top_rated: "Mejor valoradas",
    upcoming: "Proximamente",
    airing_today: "En emisión",
    on_the_air: "En el aire",
  };

  return (
    <>
      <div
        className="bg-black text-white relative px-5 md:px-20"
        onMouseEnter={() => setShowArrowes(true)}
        onMouseLeave={() => setShowArrowes(false)}
      >
        <h2 className="mb-4 font-bold text-2xl">
          {spanishCategories[category]} {formattedContentTitle}
        </h2>
        <div
          className="flex space-x-4 overflow-x-scroll scrollbar-hide"
          ref={sliderRef}
        >
          {contentSearch.map((movie) => (
            <Link
              to={`/watch/${movie.id}`}
              key={movie.id}
              className="min-w-[200px] relative group"
            >
              <div className="rounded-lg overflow-hidden" key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                />
                <p className="mt-2 text-center">{movie.title || movie.name}</p>
              </div>
            </Link>
          ))}
        </div>
        {showArrowes && (
          <>
            <button
              className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
 size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
 "
              onClick={scrollLeft}
            >
              <ChevronLeft size={24} />
            </button>

            <button
              className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
 size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
 "
              onClick={scrollRight}
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </>
  );
};
