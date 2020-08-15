const React = require('react');
const ReactDom = require('react-dom');

const Gugudan = require('./Component/Gugudan.jsx');
// const NumberBaseball = require('./Component/NumberBaseball.jsx');
import NumberBaseball from './Component/NumberBaseball.jsx';
const InputWrite = require('./Component/InputWrite');
const RSP = require('./Component/RSP.jsx');
import TicTacToe from './Component/TicTacToe/TicTacToe.jsx';
import MineSearch from './Component/MineSearch/MineSearch';
import Game from './Component/Game';

//const { hot } = require('react-hot-loader/root');
//const Hot = hot(Gugudan);

//ReactDom.render(<Hot />, document.querySelector('root'));
//ReactDom.render(<><Gugudan /><NumberBaseball /><InputWrite /><RSP /><TicTacToe /><MineSearch /></>, document.querySelector('#root'));
ReactDom.render(<Game />, document.querySelector('#root'));