import * as React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

/* 
const [pruefplan, setPruefplan] = useState([]);
useEffect(() => {
  // let interval; // interval tutorial - https://www.codingdeft.com/posts/react-useeffect-hook/
  const fetchPruefplan = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API}/AuftragPruefplan`
      );
      const results = await response.json();
       setPruefplan(results); //fetch artikel from tblArtikel
    } catch (err) {
      console.log(err);
    }
  };
  fetchPruefplan();
  //fetch Artikel every X second
    interval = setInterval(() => {
      fetchPruefplan();
    }, 1 * 1000);

    return () => {
      clearInterval(interval);
    }; 
}, []);

console.log('pruefplan: ', pruefplan); 
*/

export default function SelectMenu() {
  return (
    
     <Div>
      <Select options={options} />
    </Div>
  );
}
