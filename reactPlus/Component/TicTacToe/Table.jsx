import React, { memo } from 'react';
import Tr from './Tr';

const Table = memo(function ({ onClick, tableData, dispatch }) {
    return (
        <>
            <table onClick={onClick}>
                <tbody>
                    {/* {(function () {
                        const arr = [];
                        for (let i = 0; i < tableData.length; i++) {
                            arr.push(<Tr />);
                        }
                        return arr;
                    })()} */}
                    {/* Array(숫자) 숫자길이 만큼 배열생성
                    fill()은 배열에 내용을 채울수 있다 인자는 확인해볼것  */}
                    {/* {Array(tableData.length).fill().map(function () {
                        return <Tr />;
                    })} */}
                    {tableData.map(function (value, index) {
                        return <Tr key={index} rowData={value} rowIndex={index} dispatch={dispatch} />;
                    })}
                </tbody>
            </table>
        </>
    );
});

export default Table;