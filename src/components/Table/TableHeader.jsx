import React from 'react';

const TableHeader = () => (
  <thead>
    <tr className="bg-gray-100">
      <th className="p-2 text-left">Label</th>
      <th className="p-2 text-right">Value</th>
      <th className="p-2">Input</th>
      <th className="p-2">Actions</th>
      <th className="p-2 text-right">Variance %</th>
    </tr>
  </thead>
);

export default TableHeader;