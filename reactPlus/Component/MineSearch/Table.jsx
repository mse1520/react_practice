import React, { useContext } from 'react';
import Tr from './Tr';
import { TableContext } from './MineSearch';

const Table = function () {
    const { dataTable } = useContext(TableContext);

    return (
        <table>
            <tbody>
                {dataTable.map(function (value, index) {
                    return <Tr key={index} rowData={value} rowIndex={index} />;
                })}
            </tbody>
        </table>
    );
};

export default Table;
