import React from 'react';
import Select from 'react-select';

export default function SelectRow({ ...props }) {
  const options = [
    { value: 'i.O', label: 'i.O', name: 'select' },
    { value: 'n.i.O', label: 'n.i.O', name: 'select' },
  ];

  return <Select options={options} {...props} />;
}
