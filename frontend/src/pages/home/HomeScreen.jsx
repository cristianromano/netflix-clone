import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Info, Play } from "lucide-react";
import { useGetTrendingContent } from "../../hooks/useGetTrendingContent";
import {
  MOVIE_CATEGORIES,
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
} from "../../utils/constants";
import { useContentStore } from "../../store/content";
import { MovieSlider } from "../../components/MovieSlider";
import { useState } from "react";

export const HomeScreen = () => {
  const { trendingContent } = useGetTrendingContent();
  const { content } = useContentStore();

  const { imageLoad, setImageLoad } = useState(true);

  if (!trendingContent) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center shimmer" />
      </div>
    );
  }

  return (
    <>
      <div className="relative h-screen text-white">
        <Navbar />
        {imageLoad && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center shimmer" />
        )}
        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent.backdrop_path}
          className="absolute top-0 left-0 w-full h-full object-cover "
          onLoad={() => setImageLoad(false)}
        />
        <div
          className="absolute top-0 left-0 w-full h-full bg-black/50"
          aria-hidden="true"
        />
        {/* content overlay */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px16 lg:px-32 ">
          <div className="bg-gradient-to-b from-black via-transparent to-transparent absolute w-full h-full top-0 left-0 -z-10" />

          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold">
              {trendingContent.title || trendingContent.name}
            </h1>
            <p className="mt-2 text-lg">
              {trendingContent.release_date || trendingContent.first_air_date} •{" "}
              {trendingContent.vote_average} ★ {trendingContent.vote_count}{" "}
              votos • {trendingContent.adult ? "18+" : "PG-13"}
            </p>
            <p className="text-lg md:text-xl mt-4">
              {trendingContent.overview}
            </p>
          </div>

          <div className="flex mt-8">
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-white hover:bg-white/80 text-black px-6 py-2 font-bold rounded-md mr-4 flex items-center"
            >
              <Play className="size-6 mr-2 fill-black" />
              Reproducir
            </Link>
            <Link
              to={`/watch/${trendingContent?.id}`}
              className="bg-gray-500/70 hover:bg-gray-500 text-white px-6 py-2  rounded-md mr-4 flex items-center"
            >
              <Info className="size-6 mr-2 " />
              Mas informacion
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-10 bg-black py-10">
        {content === "movies"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};
