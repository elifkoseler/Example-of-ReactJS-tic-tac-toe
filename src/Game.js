import React from 'react';
//import logo from './logo.svg';
import './Game.css';
function Square(props){
  return (
    <button className = "square" onClick= {props.onClick}>
    {props.value}
    </button>
  );
}
/*class Square extends React.Component {
/*  constructor(props) {
    super(props); //alt sınıfın constructorını oluştururken mutlaka çağırılması gerekiyor.
    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <button className="square"
      onClick = {
        () => this.props.onClick()({
            value: "X"
          })
        // () => alert('click')
        /*  function(){
            alert('click'); //tarayıcıda yukarıdan gelen "click" adlı uyarı
          }
      }>
        {this.props.value}
      </button>

    );
  }
}*/

class Board extends React.Component {
  /*constructor(props)  {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }*/
  handleClick(i){
    const squares = this.state.squares.slice();
    if(calculateWinner(squares) || squares[i]){ //tekrar işaretleme yapmayı engellemeliyiz
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState(
      {
        squares: squares,
        xIsNext: !this.state.xIsNext,
      }
    );
  }
  renderSquare(i) {
    return (
      <Square
      value={this.props.squares[i]} //ilk prop
      onClick={() => this.props.onClick(i)} //ikinci prop
      />
    );
  }

  render() {
  /*  let status;
    const winner = calculateWinner(this.state.squares);
    if(winner){
      status = "Winner: " + winner;
    } else{
      status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");
    }*/
    return (
      <div>
      <div className="status">{/**/}</div>
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
  constructor(props)  {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
    };
  }
  handleClick(i){
      const history = this.state.history;
      const current = history[history.length - 1];
      const squares = current.squares.slice();

      if(calculateWinner(squares) || squares[i]){ //tekrar işaretleme yapmayı engellemeliyiz
        return;
      }
      squares[i] = this.state.xIsNext ? "X" : "O";
      this.setState(
        {
          history: history.concat([{
            squares: squares,
          }]),
          xIsNext: !this.state.xIsNext,
        }
      );
    }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);

    let status;
    if(winner){
      status = "Winner: " + winner;
      if(winner == null)
      status = "There is no winner";
    }else{
      status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">

          <Board
            squares = {current.squares}
            onClick={(i) => this.handleClick(i)}
          />

        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares){
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
  for(let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if(squares[a] //null mı değil mi kontrolü
      && squares[a] === squares[b]  //2.var ile 1.var aynı mı?
      && squares[a] === squares[c]){  //3.var ile 1.var aynı mı?
        return squares[a];
    }
  }
  return null;  //şartlar sağlanmazsa null dön kazanan yok.
}


export default Game;
