import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";
import Game from "./src/Game";

const App = () => {
  return (
    <LinearGradient colors={["#3498db", "#ffffff"]} style={styles.container}>
      <View style={styles.overlay}>
        <Game />
      </View>
    </LinearGradient>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    alignItem: "center",
    justifyContent: "center",
  },
});
