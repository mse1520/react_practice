const React = require('react');
const { PureComponent, Component, createRef, useRef, 
    useState, useEffect, useMemo, useCallback } = React;

// const BaseballTry = require('./BaseballTry.jsx');
import BaseballTry from './BaseballTry.jsx';

function getNumbers() {
    const candidate = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const arr = [];
    for (let i = 0; i < 4; i++) {
        const chosen = candidate.splice(Math.floor(Math.random() * (10 - i)), 1)[0];
        arr.push(chosen);
    }
    console.log(arr);
    return arr;
}

class NumberBaseball extends PureComponent {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: []
    }

    inputRef = createRef();

    // componentDidMount() { //컴포넌트가 첫 렌더링 된 후

    // }

    // componentDidUpdate() { //리렌더링 후

    // }

    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if(this.state.value !== nextState.value){
    //         return true;
    //     }
    //     return false;
    // }

    // componentWillUnmount() { //컴포넌트가 제거되기 직전

    // } 

    onSubmit = function (e) {
        e.preventDefault();
        if (this.state.value === this.state.answer.join('')) {
            this.setState(function (prevState) {
                return {
                    result: '홈런!',
                    tries: [...prevState.tries, { try: prevState.value, result: `홈런!` }]
                };
            });
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: []
            });
        } else {
            const answerArray = this.state.value.split('').map(function (value) { return parseInt(value); });
            let strike = 0;
            let ball = 0;
            if (this.state.tries.length > 9) {
                this.setState(function (prevState) {
                    return {
                        result: `10번 넘게 틀려서 실패! 답은 ${prevState.answer.join(',')}`
                    };
                });
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: []
                });
            } else {
                for (let i = 0; i < 4; i++) {
                    if (answerArray[i] === this.state.answer[i]) {
                        strike++;
                    } else if (this.state.answer.includes(answerArray[i])) {
                        ball++;
                    }
                }
                this.setState(function (prevState) {
                    return {
                        tries: [...prevState.tries, { try: prevState.value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }]
                    };
                });
            }
        }
        this.inputRef.current.focus();
    }.bind(this);

    onChange = function (e) {
        this.setState({ value: e.target.value });
    }.bind(this);

    render() {
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.onSubmit}>
                    <input ref={this.inputRef} type="text" maxLength={4} value={this.state.value} onChange={this.onChange} />
                    <button>입력!</button>
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    <BaseballTry value={this.state.tries} />
                </ul>
            </>
        );
    }
}

// module.exports = NumberBaseball;
export default NumberBaseball;