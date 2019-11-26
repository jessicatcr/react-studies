import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//   // Tirar o constructor do Quadrado, já que n manteremos + o state do jogo nele
//   // constructor (props) {
//   //   /*Em classes JavaScript, você sempre precisa chamar
//   //   super ao definir o construtor de uma subclasse.
//   //   Todas os componentes de classe React que possuem
//   //   um método constructor devem iniciá-lo
//   //   com uma chamada super (props).*/
//   //   super(props);
//   //   /*componentes React podem ter estado (state)
//   //   configurando this.state em seus construtores.*/
//   //   this.state = {
//   //     value: null,
//   //   };
//   // }
//
//   render() {
//     return (
//       /*Passar props é a forma
//       como os dados fluem em aplicações
//       React, de pais para filhos.*/
//
//       // <button className="square" onClick={function() {
//       //   alert('clique');
//       // }}>
//
//
//       /*onClick = {() => alert ('click')},
//       estamos passando uma função como prop onClick.
//       O React só chamará essa função depois de um clique.
//       Esquecendo () => e escrevendo somente onClick = {alert ('click')}
//       é um erro comum, e dispararia o alerta toda vez
//       que o componente fosse renderizado novamente.*/
//
//       // <button className="square" onClick={() =>
//       //   alert('clique')}>
//       //   {this.props.value}
//       // </button>
//
//
//       /*Quando se chama setState em um componente,
//       o React atualiza automaticamente os
//       componentes filhos dentro dele também.*/
//       // <button className="square"
//       //   onClick={() => this.setState({value: 'X'})}>
//       //   {this.state.value}
//       // </button>
//
//       /*Os Squares são agora componentes controlados
//       (controlled components) pelo Board*/
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//
//     );
//   }
// }

/*componentes de função (ou componente funcional) são os mais simples de serem escritos, contém apenas um
método render e não possuem seu próprio state. Ao invés de definir uma classe
que extende de React.Component, nós podemos escrever uma função que recebe props
como entrada e retorna o que deverá ser renderizado. */
function Square (props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

/*Para coletar dados de múltiplos filhos (children),
ou para fazer dois filhos se comunicarem entre si,
você precisa declarar um estado compartilhado em seu componente pai.
O componente pai pode passar o estado de volta para os filhos
através do uso de propriedades (props); isso mantém os componentes
filhos em sincronia com os seus irmãos e também com o pai.*/

class Board extends React.Component {
  // Agora será controlado pelo componente Game
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     squares: Array(9).fill(null),
  //     xIsNext: true,
  //   };
  // }

  renderSquare(i) {
    /*O state é considerado privado ao componente em que é definido,ou seja,
    nós não podemos atualizar o state do Tabuleiro diretamente do Quadrado*/
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
    /*Para manter a privacidade do state do Tabuleiro,
    a função responsável do Tabuleiro estará no Quadrado.
    Essa função irá ser chamada assim que o Quadrado for clicado. */
  }

  render() {
    // Repassado para o Game
    // const winner = calculateWinner(this.state.squares);
    // // const status = 'Next player: ' +  (this.state.xIsNext ? 'X' : 'O');
    // let status;
    // if (winner) {
    //   status = 'Winner: ' + winner;
    // } else {
    //   status = 'Next player: ' +  (this.state.xIsNext ? 'X' : 'O');
    // }

    return (
      <div>
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
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      // Qual passo estamos visualizando no momento
      stepNumber: 0,
      xIsNext: true,
    };
  }

  /*Manter o state de todos os quadrados no componente Board
   nos permitirá determinar o vencedor no futuro*/
  handleClick(i) {
    /*Usado o método .slice() para criar uma cópia do array de quadrados ao
    invés de modificar o existente. Evitar mutação nos permite manter o
    histórico das versões anteriores do jogo intacta e reutiliza-las + tarde*/
    // const squares = this.state.squares.slice();

    // const history = this.state.history
    /* Isso (o history) certifica que se nós “voltarmos no tempo”, e então
    fizermos uma nova jogada a partir daquele ponto, descartamos todo o
    histórico do “futuro” que agora se tornaria incorreto.*/
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    //Se alguém tiver vencido ou se o square já estiver ocupado
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // squares[i] = 'X'
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    /*Ao contrário do método de arrays push(), o método concat() não modifica o
    array original, por isso preferimos utilizá-lo.*/
    this.setState({
      // squares: squares,
      // xIsNext: !this.state.xIsNext,
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber:step,
      xIsNext: (step % 2) === 0,
    });
    // xIsNext para true caso o nº q estejamos atribuindo a stepNumber seja par.
  }

  render() {
    const history = this.state.history;
    // const current = history[history.length - 1];
    /*deixar de renderizar sempre a última jogada e passar a renderizar apenas
    a jogada selecionada atualmente, de acordo com stepNumber*/
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';

      /*key não pode ser referenciado utilizando this.props.keys.
      React automaticamente utiliza key para decidir quais componentes atualizar.
      Um componente não pode acessar sua key.
      Chaves não precisam ser globalmente únicas;
      elas precisam ser únicas apenas
      entre os componentes e seus irmãos (siblings).*/
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );

    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}

          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

/*irá verificar se há um vencedor e
retornará 'X', 'O' ou null conforme apropriado*/
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);


/*
Melhorias a serem feitas:

1. Mostrar a localização de cada jogada no formato (col,row), para cada jogada
  no histórico.
2. Estilizar com negrito o item da lista de jogadas que está selecionado
  no momento.
3. Reescrever o componente Board para utilizar 2 loops para fazer os quadrados,
  em vez de deixá-los hardcoded.
4. Adicionar um botão de toggle que lhe permita ordenar os jogadas em ordem
  ascendente ou descendente.
5. Quando alguém ganhar, destaque os 3 quadrados que causaram a vitória.
6. Quando ninguém ganhar, exiba uma mensagem informando que o resultado foi
  um empate.
*/
