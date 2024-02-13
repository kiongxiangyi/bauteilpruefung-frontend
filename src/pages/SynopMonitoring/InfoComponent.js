import React, { useState } from 'react';
import { InfoContainer, P } from './StyledComponents';

const InfoComponent = ({ commentFromSynop, feature, tool }) => {
  return (
    <InfoContainer>
      {/* Display comment from the database */}
      {commentFromSynop && <P>Auffälligkeit: {commentFromSynop}</P>}
      {feature && <P>Formelement: {feature}</P>}
      {tool && <P>Werkzeug: {tool}</P>}
    </InfoContainer>
  );
};

export default InfoComponent;
