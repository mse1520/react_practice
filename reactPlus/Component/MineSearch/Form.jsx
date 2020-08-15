import React, { useState, useCallback, useContext } from 'react';
import { TableContext, START_GAME } from './MineSearch';

const Form = function () {
    const [row, setRow] = useState(10);
    const [col, setCol] = useState(10);
    const [mine, setMine] = useState(20);
    const { dispatch } = useContext(TableContext);

    const onChangeRow = useCallback(function (e) {
        setRow(e.target.value);
    }, []);

    const onChangeCol = useCallback(function (e) {
        setCol(e.target.value);
    }, []);

    const onChangeMine = useCallback(function (e) {
        setMine(e.target.value);
    }, []);

    const onClickBtn = useCallback(function () {
        dispatch({ type: START_GAME, row, col, mine });
    }, [row, col, mine]);

    return (
        <>
            <input type="number" value={row} onChange={onChangeRow} />
            <input type="number" value={col} onChange={onChangeCol} />
            <input type="number" value={mine} onChange={onChangeMine} />
            <button onClick={onClickBtn}>시작</button>
        </>
    );
};

export default Form;