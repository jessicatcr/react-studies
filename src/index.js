import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor (props) {
    /*Em classes JavaScript, você sempre precisa chamar
    super ao definir o construtor de uma subclasse.
    Todas os componentes de classe React que possuem
    um método constructor devem iniciá-lo
    com uma chamada super (props).*/
    super(props);
    /*componentes React podem ter estado (state)
    configurando this.state em seus construtores.*/
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      /*Passar props é a forma
      como os dados fluem em aplicações
      React, de pais para filhos.*/

      // <button className="square" onClick={function() {
      //   alert('clique');
      // }}>

      <button className="square" onClick={() =>
        alert('clique')}>
        {this.props.value}
      </button>
      /*onClick = {() => alert ('click')},
      estamos passando uma função como prop onClick.
      O React só chamará essa função depois de um clique.
      Esquecendo () => e escrevendo somente onClick = {alert ('click')}
      é um erro comum, e dispararia o alerta toda vez
      que o componente fosse renderizado novamente.*/
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
