import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

export const LeftSubContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin: 20px 1rem;
`;

export const InfoContainer = styled.div`
  text-align: left;
`;

export const P = styled.p`
  margin: 2px 0;
  line-height: 1.5;
  font-size: 20px;
`;

export const Textarea = styled.textarea`
  font-size: 20px;
  height: 100px;
  width: 280px;
  padding: 5px;
  margin-bottom: 10px;
  box-sizing: border-box;
`;

export const TrafficLightContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  flex: 1;
  margin: 0 10px;
  height: 100%;
  box-sizing: border-box;
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

export const GraphContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 10px; /* Ensure consistent margin */
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
  width: 100%;
  max-width: 1200px; /* Set a max-width to limit the container size */
  flex: 1;
`;
