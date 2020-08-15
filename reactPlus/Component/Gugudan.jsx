const React = require('react');
//구조분해 문법이라고 합니다. 객체를 분해하는 방법입니다.
//const Component = React.Component;
const { Component, createRef } = React;

class Gugudan extends Component {
    state = {
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
        value: '',
        result: ''
    }

    inputRef = createRef();

    onSubmit = function (e) {
        e.preventDefault();
        if (parseInt(this.state.value) === this.state.first * this.state.second) {
            this.setState(function (prevState) {
                return {
                    result: '정답: ' + prevState.value,
                    first: Math.ceil(Math.random() * 9),
                    second: Math.ceil(Math.random() * 9),
                    value: ''
                }
            });
        } else {
            this.setState({
                result: '땡',
                value: ''
            });
        }
        this.inputRef.current.focus();
    }.bind(this);

    onChange = function (e) {
        this.setState({ value: e.target.value });
    }.bind(this);

    render() {
        return (
            <>
                <div>{this.state.first} 곱하기 {this.state.second}는?</div>
                <form onSubmit={this.onSubmit}>
                    <input ref={this.inputRef} type="number" value={this.state.value} onChange={this.onChange} />
                    <button>입력!</button>
                </form>
                <div>{this.state.result}</div>

                <label htmlFor="label-test">라벨테스트</label>
                <input id="label-test" className="class-test" type="text" />
            </>
        );
    }
}

module.exports = Gugudan;