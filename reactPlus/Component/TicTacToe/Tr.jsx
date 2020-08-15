import React, { memo } from 'react';
import Td from './Td';

const Tr = memo(function ({ rowData, rowIndex, dispatch }) {
    return (
        <tr>
            {rowData.map(function (value, index) {
                return <Td key={index} rowIndex={rowIndex} colIndex={index} cellData={value} dispatch={dispatch} />;
            })}
        </tr>
    );
});

export default Tr;