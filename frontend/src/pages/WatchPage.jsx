import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { Navbar } from "../components/Navbar";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

function formatReleaseDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const WatchPage = () => {
  const { id } = useParams();
  const [trailer, setTrailer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [contentSearch, setContentSearch] = useState({});
  const [similarContent, setSimilarContent] = useState([]);
  const { content } = useContentStore();

  //get trailers
  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(`/api/v1/${content}/${id}/trailers`);
        setTrailer(response.data.trailers);
      } catch (error) {
        setTrailer([]);
      }
    };

    fetchTrailer();
  }, [content, id]);

  const sliderRef = useRef(null);

  // get similar content
  useEffect(() => {
    const fetchSimilarContent = async () => {
      try {
        const response = await axios.get(`/api/v1/${content}/${id}/similar`);
        setSimilarContent(response.data.content);
      } catch (error) {
        setSimilarContent([]);
      }
    };

    fetchSimilarContent();
  }, [content, id]);

  // get content details
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`/api/v1/${content}/${id}/details`);
        setContentSearch(response.data.content);
        setLoading(false);
      } catch (error) {
        setContentSearch(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [content, id]);

  function handleNext() {
    if (currentTrailerIdx < trailer.length - 1) {
      setCurrentTrailerIdx((prev) => prev + 1);
    }
  }

  function handlePrev() {
    if (currentTrailerIdx > 0) {
      setCurrentTrailerIdx((prev) => prev - 1);
    }
  }

  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };
  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };

  if (loading) {
    return (
      <div className="h-screen">
        <div className="flex items-center justify-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <div className="mx-auto container px-4 py-8  h-full">
        <Navbar />
        {trailer.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 rounded ${
                currentTrailerIdx === 0
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              disabled={currentTrailerIdx === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 text-white px-4 py-2 rounded ${
                currentTrailerIdx === trailer.length - 1
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
              disabled={currentTrailerIdx === trailer.length - 1}
              onClick={handleNext}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
          {trailer.length > 0 && (
            <ReactPlayer
              controls={true}
              height={"70vh"}
              width={"100%"}
              className="mx-auto overflow-hidden rounded-lg"
              url={`https://www.youtube.com/watch?v=${trailer[currentTrailerIdx].key}`}
            />
          )}
          {trailer?.length === 0 && (
            <h2 className="text-xl text-center mt-5">
              No hay trailers para esta pelicula{" "}
              <span className="font-bold text-red-600">
                {content?.title || content?.name}
              </span>{" "}
              😥
            </h2>
          )}
        </div>
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-20 
				max-w-6xl mx-auto"
        >
          <div className="mb-4 md:mb-0">
            <h2 className="text-5xl font-bold text-balance">
              {contentSearch?.title || contentSearch?.name}
            </h2>

            <p className="mt-2 text-lg">
              {formatReleaseDate(
                contentSearch?.release_date || contentSearch?.first_air_date
              )}{" "}
              |{" "}
              {contentSearch?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-green-600">PG-13</span>
              )}{" "}
            </p>
            <p className="mt-4 text-lg">{contentSearch?.overview}</p>
          </div>
          <img
            src={ORIGINAL_IMG_BASE_URL + contentSearch?.poster_path}
            alt="Poster image"
            className="max-h-[600px] rounded-md"
          />
        </div>
        {similarContent.length > 0 && (
          <div className="mt-12 max-w-5xl mx-auto relative">
            <h3 className="text-3xl font-bold mb-4">
              Similares Peliculas/Tv Show
            </h3>

            <div
              className="flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group"
              ref={sliderRef}
            >
              {similarContent.map((content) => {
                if (content.poster_path === null) return null;
                return (
                  <Link
                    key={content.id}
                    to={`/watch/${content.id}`}
                    className="w-52 flex-none"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + content.poster_path}
                      alt="Poster path"
                      className="w-full h-auto rounded-md"
                    />
                    <h4 className="mt-2 text-lg font-semibold">
                      {content.title || content.name}
                    </h4>
                  </Link>
                );
              })}

              <ChevronRight
                className="absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-red-600 text-white rounded-full"
                onClick={scrollRight}
              />
              <ChevronLeft
                className="absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
								text-white rounded-full"
                onClick={scrollLeft}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
