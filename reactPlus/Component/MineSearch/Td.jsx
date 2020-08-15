import React, { useCallback, useContext } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL } from './MineSearch';

const getTdStyle = function (code) {
    switch (code) {
        case CODE.NORMAL:
        case CODE.MINE:
            return {
                background: '#444'
            };
        case CODE.OPENED:
        case CODE.CLICKED_MINE:
            return {
                background: 'white'
            }
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'yellow'
            }
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'red'
            }
        default:
            return {
                background: 'white'
            }
    }
};

const getTdText = function (code) {
    switch (code) {
        case CODE.NORMAL: return '';
        case CODE.MINE: return 'X';
        case CODE.CLICKED_MINE: return '펑!';
        case CODE.FLAG:
        case CODE.FLAG_MINE: return '!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE: return '?';
        default: return code || '';

    }
};

const Td = function ({ row, col }) {
    const { dataTable, halted, dispatch } = useContext(TableContext);

    const onClickTd = useCallback(function () {
        if (halted) return;
        switch (dataTable[row][col]) {
            case CODE.NORMAL:
                dispatch({ type: OPEN_CELL, row: row, col: col });
                return;
            case CODE.MINE:
                dispatch({ type: CLICK_MINE, row: row, col: col });
                return;
            case CODE.CLICKED_MINE:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
            case CODE.OPENED: return;
            default: return;
        }
    }, [dataTable[row][col], halted]);

    const onRightClickTd = useCallback(function (e) {
        e.preventDefault();
        if (halted) return;
        switch (dataTable[row][col]) {
            case CODE.NORMAL:
            case CODE.MINE:
                return dispatch({ type: FLAG_CELL, row: row, col: col });
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                return dispatch({ type: QUESTION_CELL, row: row, col: col });
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return dispatch({ type: NORMALIZE_CELL, row: row, col: col });
            default: return;
        }
    }, [dataTable[row][col], halted]);

    return (
        <td onClick={onClickTd} onContextMenu={onRightClickTd} style={getTdStyle(dataTable[row][col])}>
            {getTdText(dataTable[row][col])}
        </td>
    );
};

export default Td;
