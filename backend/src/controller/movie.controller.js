import { fetchFromMovieDB } from "../services/tmdb.service.js";

export const getPopularMovies = async (req, res) => {
  try {
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/movie/popular?language=en-US`
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
 * Fetches a trending movie from the Movie Database API and returns a random movie from the results.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves to void.
 * @throws {Error} - If there is an error fetching data from the Movie Database API.
 */

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/trending/movie/day?language=en-US`
    );

    res.status(200).json({
      success: true,
      content: data.results[Math.floor(Math.random() * data.results.length)],
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTrailerMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );

    res.status(200).json({
      success: true,
      trailers: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );

    res.status(200).json({
      success: true,
      content: data,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`
    );

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMovieFromCategorie = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US`
    );
    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
