import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  // Tirar o constructor do Quadrado, já que n manteremos + o state do jogo nele
  // constructor (props) {
  //   /*Em classes JavaScript, você sempre precisa chamar
  //   super ao definir o construtor de uma subclasse.
  //   Todas os componentes de classe React que possuem
  //   um método constructor devem iniciá-lo
  //   com uma chamada super (props).*/
  //   super(props);
  //   /*componentes React podem ter estado (state)
  //   configurando this.state em seus construtores.*/
  //   this.state = {
  //     value: null,
  //   };
  // }

  render() {
    return (
      /*Passar props é a forma
      como os dados fluem em aplicações
      React, de pais para filhos.*/

      // <button className="square" onClick={function() {
      //   alert('clique');
      // }}>


      /*onClick = {() => alert ('click')},
      estamos passando uma função como prop onClick.
      O React só chamará essa função depois de um clique.
      Esquecendo () => e escrevendo somente onClick = {alert ('click')}
      é um erro comum, e dispararia o alerta toda vez
      que o componente fosse renderizado novamente.*/

      // <button className="square" onClick={() =>
      //   alert('clique')}>
      //   {this.props.value}
      // </button>


      /*Quando se chama setState em um componente,
      o React atualiza automaticamente os
      componentes filhos dentro dele também.*/
      // <button className="square"
      //   onClick={() => this.setState({value: 'X'})}>
      //   {this.state.value}
      // </button>

      <button
        className="square"
        onClick={() => this.props.onClick()}
      >
        {this.props.value}
      </button>

    );
  }
}

/*Para coletar dados de múltiplos filhos (children),
ou para fazer dois filhos se comunicarem entre si,
você precisa declarar um estado compartilhado em seu componente pai.
O componente pai pode passar o estado de volta para os filhos
através do uso de propriedades (props); isso mantém os componentes
filhos em sincronia com os seus irmãos e também com o pai.*/

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    squares[i] = 'X'
    this.setState({squares: squares});
  }


  renderSquare(i) {
    /*O state é considerado privado ao componente em que é definido,ou seja,
    nós não podemos atualizar o state do Tabuleiro diretamente do Quadrado*/
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
    /*Para manter a privacidade do state do Tabuleiro,
    a função responsável do Tabuleiro estará no Quadrado.
    Essa função irá ser chamada assim que o Quadrado for clicado. */
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
