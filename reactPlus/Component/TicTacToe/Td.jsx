import React, { useCallback, memo } from 'react';
import { CLICK_CELL } from './TicTacToe';

const Td = function ({ dispatch, rowIndex, colIndex, cellData }) {
    const onClickTd = useCallback(function () {
        if (cellData) return;
        dispatch({ type: CLICK_CELL, row: rowIndex, col: colIndex });
    }, [cellData]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
};

export default memo(Td);