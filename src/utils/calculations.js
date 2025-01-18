export const calculateVariance = (current, original) => {
  return (((current - original) / original) * 100).toFixed(2);
};

export const getOriginalValues = (rows) => {
  const values = {};
  rows.forEach((row) => {
    values[row.id] = row.value;
    if (row.children) {
      // Store original sum of children for parent nodes
      values[row.id] = row.children.reduce(
        (sum, child) => sum + child.value,
        0
      );
      Object.assign(values, getOriginalValues(row.children));
    }
  });
  return values;
};

export const updateRowValue = (rows, rowId, newValue) => {
  return rows.map((row) => {
    if (row.id === rowId) {
      return { ...row, value: newValue };
    }
    if (row.children) {
      const updatedChildren = updateRowValue(row.children, rowId, newValue);
      return {
        ...row,
        children: updatedChildren,
        value: updatedChildren.reduce((sum, child) => sum + child.value, 0),
      };
    }
    return row;
  });
};
