import { useState, useEffect, useCallback, SetStateAction } from "react";
import api from "@/utils/api";

const useFetchData = (url: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get(url);
      setData(response.data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  // Automatically fetch data on component mount or URL change
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Method to update data manually
  const updateData = (newData: unknown) => {
    setData(newData as SetStateAction<null>);
  };

  // Expose `fetchData` to manually refresh the data
  return { data, loading, error, refresh: fetchData, updateData };
};

export default useFetchData;