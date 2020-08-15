const React = require('react');
const { memo, PureComponent, Component, createRef } = React;

const InputBase = require('./InputBase.jsx');

class InputWrite extends Component {
    state = {
        message: ''
    }

    write = function (message) {
        this.setState({ message: message });
    }.bind(this);

    render() {
        return (
            <>
                <InputBase write={this.write} />
                <h3>{this.state.message}</h3>
            </>
        );
    }
}

module.exports = InputWrite;