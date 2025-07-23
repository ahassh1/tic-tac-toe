import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Board from "./Board";

const Game = () => {
  const initialBoard = [
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
      const isBoardFull = board.every((row) =>
        row.every((cell) => cell !== "")
      );
      if (isBoardFull) {
        Alert.alert("it is tie!!", " ", [{ text: "OK", onPress: resetBoard }]);
      }
    }
  }, [board]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <Board board={board} onPress={handlePress} />
      <TouchableOpacity style={styles.resetButton} onPress={resetBoard}>
        <Text style={styles.resetButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  resetButton: {
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
