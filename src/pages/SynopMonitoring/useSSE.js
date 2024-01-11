// useSSE.js

import { useEffect, useState } from 'react';

const useSSE = (url, { onData, onError }) => {
  const [sseData, setSSEData] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setSSEData(parsedData);

        // Execute the provided callback when new SSE data is received
        if (onData) {
          onData(parsedData);
        }
      } catch (error) {
        if (onError) {
          onError(error);
        }
      }
    };

    eventSource.onerror = (error) => {
      if (onError) {
        onError(error);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [url, onData, onError]);

  return sseData;
};

export default useSSE;
