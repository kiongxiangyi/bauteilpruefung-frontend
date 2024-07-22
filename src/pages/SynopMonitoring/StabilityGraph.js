import React, { useState, useEffect } from 'react';
import LineChart from '../../components/UI/LineChart';
import useSSE from './useSSE';

const StabilityGraph = ({
  onKommentarButtonActivation,
  setCommentID,
  setTotalPointsOnGraph,
  setLastValueTrafficLight,
  setCommentFromSynop,
  setFeature,
  setTool,
  setPredictedQuality,
  setQualityComment,
  setPrognoseQuality,
}) => {
  const [arrAicomEreignisse, setArrAicomEreignisse] = useState([]);

  // Function to fetch AicomEreignisse data from the server
  const fetchtblAicomEreignisse = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/AicomEreignisse`
      );
      const result = await response.json();

      if (result && result.length > 0) {
        // Get the last result dynamically
        const lastResult = result[result.length - 1];

        setArrAicomEreignisse(result);
        setLastValueTrafficLight(lastResult.Stability);
        setCommentFromSynop(lastResult.Comment);
        setFeature(lastResult.Feature);
        setTool(lastResult.Tool);
        setPredictedQuality(lastResult.PredictedQuality);
        setQualityComment(lastResult.QualityComment);
      } else {
        // Handle the case when there is no data
        console.log('No data available');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Function to handle SSE data updates
  const handleSSEData = (newSSEData) => {
    // Handle changes in SSE data
    console.log('SSE Data:', newSSEData);

    // Refetch AicomEreignisse data
    fetchtblAicomEreignisse();
  };

  // Use SSE hook to subscribe to SSE updates
  const sseData = useSSE(`${process.env.REACT_APP_API}/SynopProgram/sse`, {
    onData: handleSSEData,
    onError: (error) => {
      console.error('SSE Error:', error);
    },
  });

  // Effect hook to fetch AicomEreignisse data on component mount and SSE updates
  useEffect(() => {
    fetchtblAicomEreignisse();
  }, [sseData]);

  return (
    <LineChart
      arrAicomEreignisse={arrAicomEreignisse}
      onKommentarButtonActivation={onKommentarButtonActivation}
      setCommentID={setCommentID}
      setTotalPointsOnGraph={setTotalPointsOnGraph}
    />
  );
};

export default StabilityGraph;
