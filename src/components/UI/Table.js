import styled from 'styled-components';

// Giving width of 100% to  table will make it stretch the complete window
// We can adjust the side spacing with padding
export const Table = styled.table`
  border: solid;
  text-align: center;
  vertical-align: middle;
  width: 100%;
`;

export const Tr = styled.tr``;

export const Th = styled.th`
  padding: 3px;
`;

export const Td = styled.td`
  padding: 2px 2px;
  background-color: ${(props) =>
    props.bewertung === 'i.O' || props.bewertung === ''
      ? 'white'
      : '#FF3333'}; //change color depending on prop bewertung
`;

export const TableDiv = styled.div`
  //display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0.1rem;
  font-size: 30px;
  overflow: scroll;
  //max-height: 30rem; //for vertical scroll
`;

export const Thead = styled.thead`
  color: black;
  background: ${(props) => `rgb(${props.red}, ${props.green}, ${props.blue})`};
  vertical-align: middle;
`;
