import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
const ChooseScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("MainScreen");
        }}
      >
        <Text>Webview</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("SecondScreen");
        }}
      >
        <Text>RNMaps</Text>
      </TouchableOpacity>
      <Text>SHEESH</Text>
    </SafeAreaView>
  );
};

export default ChooseScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    borderWidth: 1,
    borderColor: "black",
    padding: "2%",
    margin: "auto",
  },
});
