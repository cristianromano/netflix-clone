import { useState, useEffect } from "react";
import axios from "axios";

import { useContentStore } from "../store/content";

export const useGetTrendingContent = () => {
  const [trendingContent, setTrendingContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { content } = useContentStore();

  useEffect(() => {
    const fetchTrendingContent = async () => {
      try {
        const response = await axios.get(`/api/v1/${content}/trending`);
        setTrendingContent(response.data.content);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchTrendingContent();
  }, [content]);

  return { trendingContent, loading, error };
};
