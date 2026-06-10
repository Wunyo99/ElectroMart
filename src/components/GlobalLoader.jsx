import { useState, useEffect } from "react";
import Spinner from "./Spinner";
const GlobalLoader = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Spinner />;
  return children;
};

export default GlobalLoader;
