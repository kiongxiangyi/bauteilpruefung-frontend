import styled from 'styled-components';

// Giving width of 100% to  table will make it stretch the complete window
// We can adjust the side spacing with padding
export const Table = styled.table`
  border: 2px solid #999999;
  text-align: center;
  vertical-align: middle;
  width: 100%;
`;


export const Th = styled.th`
  border: 1px solid;
  padding: 5px 0;
`;

export const Td = styled.td`
  border: 1px solid;
  padding: 5px 0;
`;
