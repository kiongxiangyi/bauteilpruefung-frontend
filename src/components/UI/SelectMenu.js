/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function SelectMenu({ ...props }) {
  /* const handleClick = () => {
    console.log("Button was clicked!");
  }; */

  return (
    <Div>
      <Select
        styles={{
          container: (base) => ({
            ...base,
            width: '500px',
          }),
        }}
        isSearchable
        {...props}
      />
    </Div>
  );
}
