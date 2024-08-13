"use client";

const { useState, useEffect, useMemo } = require("react");

const useFetch = (url, method = "GET", body = null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const requestOptions = useMemo(() => {
    return {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : null,
    };
  }, [method, body]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      setData(data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, requestOptions]);

  return { data, loading, error };
};
export default useFetch;
