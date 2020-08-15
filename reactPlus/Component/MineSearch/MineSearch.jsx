import React, { useReducer, createContext, useMemo, useEffect, useRef } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0
};

const plantMine = function (row, col, mine) {
    const dataTable = [];
    for (let i = 0; i < row; i++) {
        const rowData = [];
        for (let j = 0; j < col; j++) {
            rowData.push(CODE.NORMAL);
        }
        dataTable.push(rowData);
    }

    //map은 결과를 배열로 반환한다.
    //만들어진 배열의 경우 값이 비어있을경우 map으로 값을 채울수 없다.
    //그래서 fill로 값을 채운후 map을 실행한다.
    const candidate = Array(row * col).fill().map(function (value, index) {
        return index;
    });

    const shuffle = [];
    for (let i = 0; i < mine; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }

    for (let i = 0; i < shuffle.length; i++) {
        const ver = Math.floor(shuffle[i] / col);
        const hor = shuffle[i] % col;
        dataTable[ver][hor] = CODE.MINE;
    }

    return dataTable;
};

export const TableContext = createContext({
    dataTable: [],
    dispatch: function () { },
    halted: true
});

const initialState = {
    dataTable: [],
    data: { row: 0, col: 0, mine: 0 },
    timer: 0,
    result: '',
    halted: true,
    openedCount: 0
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

const reducer = function (state, action) {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                data: { row: action.row, col: action.col, mine: action.mine },
                openedCount: 0,
                dataTable: plantMine(action.row, action.col, action.mine),
                halted: false,
                timer: 0
            };
        case OPEN_CELL: {
            const dataTable = [...state.dataTable];
            dataTable.forEach(function (value, i) {
                dataTable[i] = [...state.dataTable[i]];
            });

            let openedCount = 0;
            const checked = [];
            const chkAround = function (row, col) {
                if (row < 0 || row >= dataTable.length || col < 0 || col >= dataTable[0].length)
                    return;
                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(dataTable[row][col]))
                    return;
                if (checked.includes(row + '/' + col)) return;
                else checked.push(row + '/' + col);

                if (dataTable[row][col] === CODE.NORMAL) openedCount += 1;
                let around = [];
                if (dataTable[row - 1]) {
                    around = around.concat(
                        dataTable[row - 1][col - 1],
                        dataTable[row - 1][col],
                        dataTable[row - 1][col + 1]
                    );
                }
                around = around.concat(
                    dataTable[row][col - 1],
                    dataTable[row][col + 1]
                );
                if (dataTable[row + 1]) {
                    around = around.concat(
                        dataTable[row + 1][col - 1],
                        dataTable[row + 1][col],
                        dataTable[row + 1][col + 1]
                    );
                }

                const count = around.filter(function (element) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(element);
                }).length;
                dataTable[row][col] = count;

                if (count === 0) {
                    const near = [];
                    if (row - 1 > -1) {
                        near.push([row - 1, col - 1]);
                        near.push([row - 1, col]);
                        near.push([row - 1, col + 1]);
                    }
                    near.push([row, col - 1]);
                    near.push([row, col + 1]);
                    if (row + 1 < dataTable.length) {
                        near.push([row + 1, col - 1]);
                        near.push([row + 1, col]);
                        near.push([row + 1, col + 1]);
                    }
                    near.forEach(function (value) {
                        if (dataTable[value[0]][value[1]] !== CODE.OPENED)
                            chkAround(value[0], value[1]);
                    });
                }
            };
            chkAround(action.row, action.col);

            let halted = false;
            let result = '';
            if (state.data.row * state.data.col - state.data.mine === state.openedCount + openedCount) { // 승리
                halted = true;
                result = `${state.timer}초만에 승리하셨습니다`;
            }

            return {
                ...state,
                dataTable,
                openedCount: state.openedCount + openedCount,
                halted,
                result
            };
        }
        case CLICK_MINE: {
            const dataTable = [...state.dataTable];
            dataTable[action.row] = [...state.dataTable[action.row]];
            dataTable[action.row][action.col] = CODE.CLICKED_MINE;
            return {
                ...state,
                dataTable,
                halted: true
            };
        }
        case FLAG_CELL: {
            const dataTable = [...state.dataTable];
            dataTable[action.row] = [...state.dataTable[action.row]];
            if (dataTable[action.row][action.col] === CODE.MINE)
                dataTable[action.row][action.col] = CODE.FLAG_MINE;
            else
                dataTable[action.row][action.col] = CODE.FLAG;
            return {
                ...state,
                dataTable
            };
        }
        case QUESTION_CELL: {
            const dataTable = [...state.dataTable];
            dataTable[action.row] = [...state.dataTable[action.row]];
            if (dataTable[action.row][action.col] === CODE.FLAG_MINE)
                dataTable[action.row][action.col] = CODE.QUESTION_MINE;
            else
                dataTable[action.row][action.col] = CODE.QUESTION;
            return {
                ...state,
                dataTable
            };
        }
        case NORMALIZE_CELL: {
            const dataTable = [...state.dataTable];
            dataTable[action.row] = [...state.dataTable[action.row]];
            if (dataTable[action.row][action.col] === CODE.QUESTION_MINE)
                dataTable[action.row][action.col] = CODE.MINE;
            else
                dataTable[action.row][action.col] = CODE.NORMAL;
            return {
                ...state,
                dataTable
            };
        }
        case INCREMENT_TIMER: {
            return {
                ...state,
                timer: state.timer + 1,
            }
        }
        default: return state;
    }
};

const MineSearch = function () {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { dataTable, timer, result, halted } = state;

    const value = useMemo(function () { return { dataTable, halted, dispatch }; }, [dataTable, halted]);

    useEffect(function () {
        let timer;
        if (halted === false) {
            timer = setInterval(function () {
                dispatch({ type: INCREMENT_TIMER });
            }, 1000);
        }
        return function () { clearInterval(timer); };
    }, [halted]);

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{timer}</div>
            <Table />
            <div>{result}</div>
        </TableContext.Provider>
    );
};

export default MineSearch;

