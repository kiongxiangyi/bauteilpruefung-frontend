import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
`;

export const LeftSubContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 300px;
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
`;

export const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;
