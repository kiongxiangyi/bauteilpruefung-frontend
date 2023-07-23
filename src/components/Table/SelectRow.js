import React from 'react';
import Select from 'react-select';

export default function SelectRow({ ...props }) {
  const options = [
    { value: 'Wert IO', label: 'Wert IO', name: 'select' },
    { value: 'Wert nicht IO', label: 'Wert nicht IO', name: 'select' },
  ];

  return <Select options={options} {...props} />;
}
