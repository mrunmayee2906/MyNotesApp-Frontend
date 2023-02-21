import { useCallback, useState, useRef, useEffect } from "react";

export const useHttpClient = () => {
  // manage loading and error state
  // to check if page is loading
  const [isLoading, setIsLoading] = useState(false);
  // to update ui when error occurs
  const [error, setError] = useState();

  // to prevent the state to change if user goes to different page mid reuest
  const activeHttpRequests = useRef([]); // array
  // reference helps to not reinialise  data for multiple requests

  // function to send request to server
  // arguments would be the url where we want to send request, the method of the request (by default we'll keep it GET, the body or data from the request (default null) and headers (default empty object))
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      const httpAbortCtrl = new AbortController(); // functionality built in modern browsers
      activeHttpRequests.current.push(httpAbortCtrl);

      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortCtrl.signal,
        });

        const responseData = await response.json();
        // console.log(responseData);

        // once the requset is completed
        activeHttpRequests.current = activeHttpRequests.current.filter(
          (reqCtrl) => reqCtrl !== httpAbortCtrl
        );
        // we don't need any old request controllers which would cancel a request that's not on its way anymore

        if (!response.ok) {
          // if we get something other than 200 something error
          throw new Error(responseData.message);
          // this will ensure that the further code is not executed, instead the catch block is executed
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        // to avoid the user has aborted request error
        // console.log(err);
        if (err.name !== "AbortError") {
          // console.log(err.name);
          setError(err.message);
          // we throw error
          throw err;
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  // to run clean up
  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach((abortCtrl) => abortCtrl.abort());
    };
  }, []);

  return { isLoading, error, sendRequest, clearError };
};
