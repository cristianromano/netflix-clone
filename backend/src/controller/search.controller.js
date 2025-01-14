import User from "../models/user.model.js";
import { fetchFromMovieDB } from "../services/tmdb.service.js";

/**
 * Searches for a person in the movie database and updates the user's search history.
 *
 * @param {Object} req - The request object.
 * @param {Object} req.params - The request parameters.
 * @param {string} req.params.query - The search query for the person.
 * @param {Object} req.user - The authenticated user object.
 * @param {string} req.user._id - The ID of the authenticated user.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the search is complete.
 */

export const searchPerson = async (req, res) => {
  try {
    const { query } = req.params;
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&language=en-US`
    );

    if (data.results.length === 0) {
      return res.status(404).json(null);
    }

    await User.findByIdAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          searchHistory: {
            id: data.results[0].id,
            title: data.results[0].name,
            image: data.results[0].profile_path,
            searchType: "person",
            createdAt: new Date().toISOString(),
          },
        },
      }
    );
    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchMovie = async (req, res) => {
  try {
    const { query } = req.params;
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US`
    );

    if (data.results.length === 0) {
      return res.status(404).json(null);
    }

    await User.updateOne(
      { _id: req.user._id },
      {
        $push: {
          searchHistory: {
            id: data.results[0].id,
            title: data.results[0].title,
            image: data.results[0].profile_path,
            searchType: "movie",
            createdAt: new Date().toISOString(),
          },
        },
      }
    );

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const searchTv = async (req, res) => {
  try {
    const { query } = req.params;
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US`
    );

    if (data.results.length === 0) {
      return res.status(404).json(null);
    }

    await User.updateOne(
      { _id: req.user._id },
      {
        $push: {
          searchHistory: {
            id: data.results[0].id,
            title: data.results[0].name,
            image: data.results[0].profile_path,
            searchType: "tv",
            createdAt: new Date().toISOString,
          },
        },
      }
    );

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      content: user.searchHistory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearSearchHistory = async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $set: { searchHistory: [] } }
    );

    res.status(200).json({
      success: true,
      message: "Search history cleared",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const clearItemFromSearchHistory = async (req, res) => {
  try {
    let { id } = req.params;

    id = parseInt(id);

    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $pull: { searchHistory: { id } } }
    );

    res.status(200).json({
      success: true,
      message: "Item removed from search history",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
