import axios from "axios";
import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      setError(null);
      const fetchData = async () => {
        const response = await axios.get(url);
        setLoading(false);
        setData(response.data.results);
      };

      fetchData();
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
