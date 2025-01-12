export const fetchFromMovieDB = async (url) => {
  const response = await fetch(url);
  return response.json();
};
