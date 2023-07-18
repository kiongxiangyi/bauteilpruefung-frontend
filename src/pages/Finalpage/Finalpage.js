/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import styled from 'styled-components';

import TableAuftragPruefdaten from '../../components/Table/TableAuftragPruefdaten';
import { TableDiv } from '../../components/UI/Table';

export default function Finalpage({ auftragPruefdaten }) {
  return (
    <TableDiv>
      <TableAuftragPruefdaten auftragPruefdaten={auftragPruefdaten} />
    </TableDiv>
  );
}
