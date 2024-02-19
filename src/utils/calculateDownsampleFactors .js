// Function to calculate downsampling factor for each serial number
const calculateDownsampleFactors = (datasets, targetPoints) => {
  const downsamplingFactors = new Map();

  for (const dataset of datasets) {
    const totalPoints = dataset.data.length;
    const factor = Math.ceil(totalPoints / targetPoints);
    downsamplingFactors.set(dataset.label, factor);
  }

  return downsamplingFactors;
};

export default calculateDownsampleFactors;
