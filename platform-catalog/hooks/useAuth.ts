import { useCallback, useState } from "react";
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { useAuthContext } from "./AuthProvider";

axios.defaults.baseURL =
  "http://20.226.77.29/platform-catalog-desktop-client/api";

type EndpointConfig = {
  method: "get" | "post";
  route: string;
};

export const useAuth = (config: EndpointConfig) => {
  const { route, method } = config;
  const { session } = useAuthContext();
  const [response, setResponse] = useState<AxiosResponse<any, any>>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const fetchRoute = useCallback(
    (params?: AxiosRequestConfig["params"]) => {
      setLoading(true);
      axios[method](`/${route}`, {
        headers: { Authorization: `bearer ${session}` },
        params,
      })
        .then(setResponse)
        .catch(setError)
        .finally(() => setLoading(false));
    },
    [route, method, session]
  );

  return {
    fetchRoute,
    response,
    loading,
    error,
  };
};
