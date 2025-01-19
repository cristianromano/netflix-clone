import { useState } from "react";
import { useParams } from "react-router-dom";
import { useContentStore } from "../store/content";

export const WatchPage = () => {
  const { id } = useParams();
  const [trailer, setTrailer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
  const [contentSearch, setContentSearch] = useState({});
  const { content } = useContentStore();

  return (
    <div>
      <h1>Watch Page</h1>
    </div>
  );
};
