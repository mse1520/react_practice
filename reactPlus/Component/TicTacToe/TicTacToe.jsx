import React, { useReducer, useCallback, useEffect } from 'react';
import Table from './Table';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    clickIndex: [-1, -1]
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET = 'RESET';

const reducer = function (state, action) {
    switch (action.type) {
        case SET_WINNER:
            return {
                ...state,
                winner: action.winner
            };
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.col] = [...state.tableData[action.row][action.col]];
            tableData[action.row][action.col] = state.turn;
            return {
                ...state,
                tableData,
                clickIndex: [action.row, action.col]
            };
        }
        case CHANGE_TURN:
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O'
            };
        case RESET:
            return {
                ...state,
                turn: 'O',
                tableData: [
                    ['', '', ''],
                    ['', '', ''],
                    ['', '', '']
                ],
                clickIndex: [-1, -1]
            };
        default: return state;
    }
};

const TicTacToe = function () {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { tableData, winner, turn, clickIndex } = state;

    useEffect(function () {
        const [row, col] = clickIndex;
        if (row < 0) return;

        let win = false;
        let blankChk = true;

        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn)
            win = true;
        if (tableData[0][col] === turn && tableData[1][col] === turn && tableData[2][col] === turn)
            win = true;
        if (tableData[0][0] == turn && tableData[1][1] == turn && tableData[2][2] == turn)
            win = true;
        if (tableData[0][2] == turn && tableData[1][1] == turn && tableData[2][0] == turn)
            win = true;

        if (win) dispatch({ type: SET_WINNER, winner: turn });
        else {
            tableData.forEach(function (row) {
                row.forEach(function (cell) {
                    if (!cell) blankChk = false;
                });
            });
            dispatch({ type: CHANGE_TURN });
        }

        if (win || blankChk) dispatch({ type: RESET });
    }, [clickIndex]);

    return (
        <>
            <Table tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리</div>}
            {/* 빈문자열은 false로 반환됩니다. 
            논리연산자 왼쪽이 true이면 오른쪽의 값을 나타내고
            false이면 왼쪽의 값을 나타냅니다. */}
        </>
    );
};

export default TicTacToe;