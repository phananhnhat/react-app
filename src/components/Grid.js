import React from "react";

const BOARD_SIZE = 100;
const randomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const createBoard = (rows, columns) => {
  let array = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < columns; j++) {
      row.push(0);
    }
    array.push(row);
  }
  return array;
};

const drawBoard = () => {
  console.log('drawBoard');
  const board = createBoard(BOARD_SIZE, BOARD_SIZE);
  // console.log(new Date().getTime());
  const a = board.map((row, rowIndex) => {
    let cellsArrJSX = row.map((cell, cellIndex) => {
      let key = rowIndex + "-" + cellIndex;
      return (
        <div
          style={{ backgroundColor: randomColor() }}
          className="cell"
          key={"cell-" + key}
        />
      );
    });
    return (
      <div key={"row-" + rowIndex} className="board-row">
        {cellsArrJSX}
      </div>
    );
  });
  // console.log(new Date().getTime());
  return a;
};

export const Grid = ({ value }) => {
  // console.log('Grid');
  return (
    <div>
      <h2 style={{ minHeight: 28 }}>{value}</h2>
      <div className="board">{drawBoard()}</div>
    </div>
  );
};
