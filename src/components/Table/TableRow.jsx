import React from 'react';

const TableRow = ({ row, level, inputValue, onInputChange, onAllocationPercentage, onAllocationValue, variance }) => (
  <tr className="border-b">
    <td className="p-2 text-left">
      {"\u2014".repeat(level)}{level > 0 ? " " : ""}{row.label}
    </td>
    <td className="p-2 text-right">
      {row.value.toFixed(2)}
    </td>
    <td className="p-2">
      <input
        type="number"
        value={inputValue || ""}
        onChange={e => onInputChange(row.id, e.target.value)}
        className="w-24 p-1 border rounded"
      />
    </td>
    <td className="p-2">
      <button 
        onClick={() => onAllocationPercentage(row.id)}
        className="mr-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Allocation %
      </button>
      <button 
        onClick={() => onAllocationValue(row.id)}
        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Allocation Val
      </button>
    </td>
    <td className="p-2 text-right">
      {variance}%
    </td>
  </tr>
);

export default TableRow;
