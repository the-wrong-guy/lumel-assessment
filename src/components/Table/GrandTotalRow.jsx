import React from 'react';

const GrandTotalRow = ({ total, variance }) => (
  <tr className="font-bold bg-gray-50">
    <td className="p-2 border">Grand Total</td>
    <td className="p-2 border text-right">{total.toFixed(2)}</td>
    <td className="p-2 border"></td>
    <td className="p-2 border"></td>
    <td className="p-2 border text-right">{variance}%</td>
  </tr>
);

export default GrandTotalRow