import React, { useState } from 'react';
import TableRow from '../Table/TableRow';
import TableHeader from '../Table/TableHeader';
import GrandTotalRow from '../Table/GrandTotalRow';
import { initialData } from '../../data/initialData';
import { calculateVariance, getOriginalValues , updateRowValue} from '../../utils/calculations';

const HierarchicalTable = () => {
  const processedData = {
    rows: initialData.rows.map(row => {
      if (row.children) {
        return {
          ...row,
          value: row.children.reduce((sum, child) => sum + child.value, 0)
        };
      }
      return row;
    })
  };

  const [data, setData] = useState(processedData);
  const [inputValues, setInputValues] = useState({});
  const [originalValues] = useState(getOriginalValues(processedData.rows));

  function distributeToChildren(rows, rowId, newTotal) {
    return rows.map(row => {
      if (row.id === rowId && row.children) {
        const currentTotal = row.children.reduce((sum, child) => sum + child.value, 0);
        const children = row.children.map(child => ({
          ...child,
          value: Number((child.value / currentTotal * newTotal).toFixed(4))
        }));
        return { ...row, value: newTotal, children };
      }
      if (row.children) {
        return {
          ...row,
          children: distributeToChildren(row.children, rowId, newTotal)
        };
      }
      return row;
    });
  }

  function handleAllocationPercentage(rowId) {
    const percentage = parseFloat(inputValues[rowId]) || 0;
    const findRow = (rows, id) => {
      for (const row of rows) {
        if (row.id === id) return row;
        if (row.children) {
          const found = findRow(row.children, id);
          if (found) return found;
        }
      }
    };

    const row = findRow(data.rows, rowId);
    if (!row) return;

    const newValue = row.value * (1 + percentage / 100);
    const newRows = updateRowValue(data.rows, rowId, newValue);
    setData({ ...data, rows: newRows });
  }

  function handleAllocationValue(rowId) {
    const newValue = parseFloat(inputValues[rowId]) || 0;
    let newRows = updateRowValue(data.rows, rowId, newValue);
    newRows = distributeToChildren(newRows, rowId, newValue);
    setData({ ...data, rows: newRows });
  }

  function renderRows(rows, level = 0) {
    return rows.map(row => (
      <React.Fragment key={row.id}>
        <TableRow
          row={row}
          level={level}
          inputValue={inputValues[row.id]}
          onInputChange={(id, value) => setInputValues({ ...inputValues, [id]: value })}
          onAllocationPercentage={handleAllocationPercentage}
          onAllocationValue={handleAllocationValue}
          variance={calculateVariance(row.value, originalValues[row.id])}
        />
        {row.children && renderRows(row.children, level + 1)}
      </React.Fragment>
    ));
  }

  const [originalGrandTotal] = useState(
    processedData.rows.reduce((sum, row) => sum + row.value, 0)
  );

  function calculateGrandTotal(rows) {
    return rows.reduce((sum, row) => sum + row.value, 0);
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <TableHeader />
            <tbody>
              {renderRows(data.rows)}
              <GrandTotalRow 
                total={calculateGrandTotal(data.rows)}
                variance={calculateVariance(calculateGrandTotal(data.rows), originalGrandTotal)}
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HierarchicalTable;