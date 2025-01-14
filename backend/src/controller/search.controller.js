import User from "../models/user.model.js";
import { fetchFromMovieDB } from "../services/tmdb.service.js";

export const searchPerson = async (req, res) => {
  try {
    const { query } = req.params;
    const data = await fetchFromMovieDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&language=en-US`
    );

    if (data.results.length === 0) {
      return res.status(404).json(null);
    }

    console.log(req.user);
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { $push: { searchHistory: query } }
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
      { $push: { searchHistory: query } }
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
      { $push: { searchHistory: query } }
    );

    res.status(200).json({
      success: true,
      content: data.results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
