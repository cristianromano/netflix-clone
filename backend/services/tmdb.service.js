import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const fetchFromMovieDB = async (url) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
  };

  const res = await axios.get(url, options);

  return res.data;
};
