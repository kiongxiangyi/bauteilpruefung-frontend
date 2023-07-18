import React from 'react';
import Select from 'react-select';

export default function SelectRow({ ...props }) {
  const options = [
    { value: 'Wert IO', label: 'Wert IO' },
    { value: 'Wert nicht IO', label: 'Wert nicht IO' },
  ];

  return <Select options={options} {...props} />;
}
