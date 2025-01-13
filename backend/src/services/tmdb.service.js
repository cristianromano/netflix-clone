import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const fetchFromMovieDB = async (url) => {
  const options = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMB_API_TOKEN}`,
    },
  };

  const res = await axios.get(url, options);

  if (res.status >= 400) {
    throw new Error(
      res.data.errors
        ? res.data.errors.map((error) => error.message).join(", ")
        : "Something went wrong"
    );
  }

  return res.data;
};
