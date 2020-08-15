import React, { memo } from 'react';
// const React = require('react');
//const { memo, PureComponent, Component, createRef } = React;

const BaseballTry = memo(function ({ value }) {
    // tryList = function () {
    //     return (
    //         value.map(function (value, index) {
    //             return (
    //                 <li key={index + 1}>
    //                     <div>{value.try}</div>
    //                     <div>{value.result}</div>
    //                 </li>
    //             );
    //         })
    //     );

    //     let arr = [];
    //     for (let i = 0; i < value.length; i++) {
    //         arr.push(
    //             <li key={i + 1}>
    //                 <div>{value[i].try}</div>
    //                 <div>{value[i].result}</div>
    //             </li>
    //         );
    //     }
    //     return arr;
    // }

    // return <>{this.tryList()}</>;

    return (
        <>
            {value.map(function (value, index) {
                return (
                    <li key={index + 1}>
                        <div>{value.try}</div>
                        <div>{value.result}</div>
                    </li>
                );
            })}
        </>
    );

    // return (
    //     <>
    //         {/* 즉시실행함수 사용법입니다. */}
    //         {(function () {
    //             let arr = [];
    //             for (let i = 0; i < value.length; i++) {
    //                 arr.push(
    //                     <li key={i + 1}>
    //                         <div>{value[i].try}</div>
    //                         <div>{value[i].result}</div>
    //                     </li>
    //                 );
    //             }
    //             return arr;
    //         })()}
    //     </>
    // );
});

// class BaseballTry extends PureComponent {
//     render() {
//         return (
//             <>
//                 {this.props.value.map(function (value, index) {
//                     return (
//                         <li key={index + 1}>
//                             <div>{value.try}</div>
//                             <div>{value.result}</div>
//                         </li>
//                     );
//                 })}
//             </>
//         );
//     }
// }

// module.exports = BaseballTry;
export default BaseballTry; // import BaseballTry
// export const hello = 'hello'; // import { hello }
// exports.hello = 'hello';