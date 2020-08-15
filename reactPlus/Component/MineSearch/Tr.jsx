import React from 'react';
import Td from './Td';

const Tr = function ({ rowData, rowIndex }) {
    return (
        <tr>
            {rowData.map(function (value, index) {
                return <Td key={index} row={rowIndex} col={index} />
            })}
        </tr>
    );
};

export default Tr;
