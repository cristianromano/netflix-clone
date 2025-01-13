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
