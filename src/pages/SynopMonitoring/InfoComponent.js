import React from 'react';
import { InfoContainer, P } from './StyledComponents';

// Function to translate feature code into its corresponding meaning
const getFeatureMeaning = (featureCode) => {
  // Define mappings of feature codes to their meanings
  const featureMappings = {
    1: 'Ebene',
    2: 'Bohrung',
    3: 'Gewinde',
    4: 'Nut',
    5: 'Tasche',
  };

  // Extract the first part of the feature code (e.g., '1' from '1_1_1')
  const featureCategory = featureCode.split('_')[0];

  // Return the corresponding meaning from the mappings
  return featureMappings[featureCategory] || 'Unknown';
};

const InfoComponent = ({ commentFromSynop, feature, tool }) => {
  // Translate the feature code into its corresponding meaning
  const featureMeaning =
    feature && `${feature} - ${getFeatureMeaning(feature)}`;

  return (
    <InfoContainer>
      {/* Display comment from the database */}
      {commentFromSynop && <P>Auffälligkeit: {commentFromSynop}</P>}
      {featureMeaning && <P>Formelement: {featureMeaning}</P>}
      {tool && <P>Werkzeug: {tool}</P>}
    </InfoContainer>
  );
};

export default InfoComponent;
