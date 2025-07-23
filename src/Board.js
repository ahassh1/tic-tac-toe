import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const [board, setBoard] = useState(initialBoard);
const [player, setPlayer] = useState("X");
const [winner, setWinner] = useState("");

useEffect(() => {
  checkWinner();
}, [board]);

const handlePress = (rowIndex, cellIndex) => {
  if (board[rowIndex][cellIndex] === "" && !winner) {
    const newBoard = [...board];
    newBoard[rowIndex][cellIndex] = player;
    setBoard(newBoard);
    setPlayer(player === "X" ? "0" : "X");
  }
};

const checkWinner = () => {
  //check row
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== "" &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      setWinner(board[i][0]);
      break;
    }

    //check columns
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] !== "" &&
        board[0][i] === board[1][i] &&
        board[0][i] === board[2][i]
      ) {
        setWinner(board[0][i]);
        break;
      }
    }
  }

  // check diagonals

  if (
    board[0][0] !== "" &&
    board[0][0] === board[1][2] &&
    board[0][0] === board[2][2]
  ) {
    setWinner(board[0][0]);
  } else if (
    board[0][2] !== "" &&
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0]
  ) {
    setWinner(board[0][2]);
  }
};

//reset board
const resetBoard = () => {
  setBoard(initialBoard);
  setPlayer("x");
  setWinner("");
};

useEffect(() => {
  if (winner) {
    Alert.alert(`player ${winner} won!!`, " ", [
      { text: "OK", onPress: resetBoard },
    ]);
  }
}, [winner]);

useEffect(() => {
  if (!winner) {
    const isBoardFull = board.every((row) => row.every((cell) => cell !== ""));
    if (isBoardFull) {
      Alert.alert("it is tie!!", " ", [{ text: "OK", onPress: resetBoard }]);
    }
  }
}, [board]);
const Board = () => {
  return (
    <View style={styles.board}>
      {board.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, cellIndex) => (
            <TouchableOpacity
              key={cellIndex}
              style={styles.cell}
              onPress={() => onPress(rowIndex, cellIndex)}
            >
              <Text style={styles.cellText}>{cell}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default Board;

const styles = StyleSheet.create({
  board: {},
});
