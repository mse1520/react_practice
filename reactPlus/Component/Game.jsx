import React from 'react';
import {BrowserRouter, HashRouter, Route, Link} from 'react-router-dom';
import MineSearch from './MineSearch/MineSearch';
import TicTacToe from './TicTacToe/TicTacToe';

const Game = function () {
    return (
        <BrowserRouter>
            <Link to='/ticTacToe'>틱택토</Link>
            <Link to='/mineSearch'>지뢰찾기</Link>
            <Route path="/ticTacToe" component={TicTacToe} />
            <Route path="/mineSearch" component={MineSearch} />
        </BrowserRouter>
    );
};

export default Game;