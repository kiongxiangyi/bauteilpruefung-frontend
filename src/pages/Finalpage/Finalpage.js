import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import TableAuftragPruefdaten from '../../components/Table/TableAuftragPruefdaten';
import { TableDiv } from '../../components/UI/Table';
import Button from '../../components/UI/Button';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 30px 0 0 0;
`;

export default function Finalpage({ auftragPruefdaten }) {
  const navigate = useNavigate(); //hook for navigation
  return (
    <>
      <TableDiv>
        <TableAuftragPruefdaten auftragPruefdaten={auftragPruefdaten} />
      </TableDiv>
      <Div>
        <Button onClick={() => navigate('/menu')}>Schließen</Button>
      </Div>
    </>
  );
}
