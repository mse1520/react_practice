const React = require('react');
const { memo, PureComponent, Component, createRef } = React;

class InputBase extends Component {
    state = {
        value: ''
    }

    onChange = function (e) {
        this.setState({ value: e.target.value });
    }.bind(this);

    onSubmit = function (e) {
        e.preventDefault();
        this.props.write(this.state.value);
    }.bind(this);

    render() {
        return (
            <form action="" onSubmit={this.onSubmit}>
                <input type="text" value={this.state.value} onChange={this.onChange} />
                <button>입력!</button>
            </form>
        );
    }
}

module.exports = InputBase;