import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
  }
};

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
