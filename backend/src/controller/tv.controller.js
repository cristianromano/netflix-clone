import { fetchFromMovieDB } from "../services/tmdb.service.js";

export const getPopularTvShows = async (req, res) => {
  try {
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/tv/popular?language=en-US`
    );

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Fetches a random trending TV show from The Movie Database (TMDb) and sends it in the response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 *
 * @throws {Error} - If there is an error fetching data from TMDb or sending the response.
 */

export const getTrendingTvShows = async (req, res) => {
  try {
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/trending/tv/day?language=en-US`
    );

    res.status(200).json({
      success: true,
      content: data.results[Math.floor(Math.random() * data.results.length)],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrailerTv = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );

    res.status(200).json({
      success: true,
      trailers: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTvShowsDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );

    res.status(200).json({
      success: true,
      content: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSimilarTvShows = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`
    );

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTvShowsFromCategorie = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US`
    );
    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
